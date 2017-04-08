const express = require('express');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const database = require('../../database');
const path = require('path');
const sockets = require('../services/Sockets');
const { createFile, getFile, updateFile } = require('./github');
const { getHTMLForPost, getDateNow, pad } = require('./helpers');

const port = 3000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static(path.join( __dirname, '../', 'public')));

// this will get the signature for the aws file upload
app.get('/sign-s3', function(req, res) {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const bucket = process.env.AWS_BUCKET;

    const s3Params = {
        Bucket: bucket,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            console.log(err);
            return res.end();
        }

        const returnData = {
            signedRequest: data,
            url: `https://${bucket}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
});

// save post to GitHub
app.post('/save-post', function(req, res) {
    // when saving post we'll first need to get
    // the config file which will be updated
    const { user, deets } = req.body;

    getFile(req.body.user.login, 'fuusio', '_config.json')
        .then((resp) => {
            try {
                // create all the files!
                // req.body.media.forEach(m => {
                //     createFile(req.body.user.login, 'fuusio', `media/${m.name}`, 'test image', m.content, req.body.token)
                //         .then(res => console.log('success!'));
                // });

                const content = JSON.parse(new Buffer(resp.content, 'base64').toString());
                const slug = `${getDateNow()}-${deets.title.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ').join('-')}`;

                content.posts[slug] = { title: deets.title, slug: slug };

                // get new html file
                const file = getHTMLForPost(deets, user);

                // TODO: this should write the following files:
                // 1) the new post file
                // 2) the post .md file
                // 3) the updated config file with new post
                // 4) the main index page with new post link

                res.end();

                // update config file with new deets if any
                // updateFile(req.body.user.login, 'fuusio', '_config.json', 'update', new Buffer(JSON.stringify(content)).toString('base64'), resp.sha, req.body.token)
                //     .then(function() {
                //         console.log('config updated successfully!');
                //         res.send();
                //     });
            } catch (e) {
                console.error('Failed to parse file contents', e);
            }
        });
});

// saves post into mLab
app.post('/update-post', function(req, res) {
    database.updatePost(
        req.body, 
        Date.now(), 
        function(posts) {
            console.log('update success!', posts);
            res.json(true);
        },
        function(err) {
            console.log(`Error updating to Mongo ${err}`);
        }
    );
});

// delete post from mLab
app.post('/delete-post', function(req, res) {
    database.deletePost(
        req.body,
        function(posts) {
            console.log('delete success!', posts);
            res.json(true);
        },
        function(err) {
            console.log(`Error deleting from Mongo ${err}`);
        }
    );
});

// fetches all posts saved in mLab
app.get('/get-posts', function(req, res) {
    database.getPosts(function(posts) {
        res.json(posts);
    });
});

app.get('/callback', function(req, res) {
    const data = JSON.stringify({
        client_id: process.env.REDACTED_GITHUB_CLIENT_ID,
        client_secret: process.env.REDACTED_GITHUB_CLIENT_SECRET,
        code: req.query.code 
    });

    const options = {
        host: 'github.com',
        port: '443',
        path: '/login/oauth/access_token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const post_req = https.request(options, function(resp) {
      resp.setEncoding('utf8');
      resp.on('data', function (chunk) {
          console.log('GitHub API Response: ' + chunk);
          res.send(`<html><body><script>window.opener.postMessage("${chunk}", '*')</script></body></html>`);
      });
    }, function(err) {
        console.log('error', err);
    });

    post_req.write(data);
    post_req.end();
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`==> Server is listening on port ${port}`);
	console.log(`==> 🌎  Go to localhost:${port}`);
});

sockets.init(server);