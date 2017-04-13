const express = require('express');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const sockets = require('../services/Sockets');
const { createFile, getFile, updateFile, multiFileCommit } = require('./github');
const { getHTMLFor, getDateNow, pad } = require('./helpers');
const showdown = require('showdown');
const converter = new showdown.Converter();

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

app.post('/add-image', function(req, res) {
    const { name, content, token, owner } = req.body;

    createFile(owner, 'fuusio', `media/${name}`, `add ${name}`, content, token)
        .then(response => {
            res.end();
        });
});

// save post to GitHub
app.post('/save-post', function(req, res) {
    // when saving post we'll first need to get
    // the config file which will be updated
    const { cover, user, deets, token } = req.body;

    let promises = [];

    Promise.all([
        getFile(user.login, 'fuusio', 'config.json'),
        getFile(user.login, 'fuusio', 'index.html')
    ])
    .then(([configFile, indexFile]) => {
        try {
            // decode the config file from base 64
            const config = JSON.parse(new Buffer(configFile.content, 'base64').toString());
            
            // create the slug that will be the identifier
            const slug = `${getDateNow()}-${deets.title.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ').join('-')}`;

            // update config for the new slug with deets
            config.posts[slug] = { title: deets.title, slug: slug, cover };

            // get list of slugs, and for each one construct title/route
            const postKeys = Object.keys(config.posts).sort().reverse();
            const postsForIndex = postKeys.map(slug => ({ 
                title: config.posts[slug].title,
                route: `posts/${slug}/index.html`
            }));

            // construct post html file
            const postHTML = getHTMLFor(
                path.join( __dirname, '_post.html'),
                {
                    author: user.name,
                    title: deets.title,
                    body: converter.makeHtml(deets.content)
                }
            );

            // construct post html file
            const indexHTML = getHTMLFor(
                path.join( __dirname, '_index.html'),
                {
                    author: user.name,
                    title: config.title,
                    posts: postsForIndex
                }
            );

            const api = multiFileCommit({
                username: user.login,
                token,
                reponame: 'fuusio'
            });

            api.commit(
                [
                    {
                        path: `drafts/${slug}/index.md`,
                        content: JSON.stringify(deets.content)
                    }, {
                        path: `posts/${slug}/index.html`,
                        content: postHTML
                    },
                    {
                        path: 'index.html',
                        content: indexHTML
                    }, {
                        path: 'config.json',
                        content: JSON.stringify(config,  null, "\t")
                    },
                ], 
                'test commit via api'
            )
            .then(_ => res.end())
            .catch(e => console.log('Failed to save new post', e));
        } catch (e) {
            console.error('Failed to save new post', e);
        }
    });
});

// saves post into mLab
app.post('/update-post', function(req, res) {
    const { user, deets, token, post } = req.body;

    let promises = [];

    Promise.all([
        getFile(user.login, 'fuusio', 'config.json'),
        getFile(user.login, 'fuusio', 'index.html')
    ])
    .then(([configFile, indexFile]) => {
        try {
            // decode the config file from base 64
            const config = JSON.parse(new Buffer(configFile.content, 'base64').toString());
            
            // create the slug that will be the identifier
            const slug = post.slug;

            // update config for the new slug with deets
            config.posts[slug] = { title: deets.title, slug: slug };

            // get list of slugs, and for each one construct title/route
            const postKeys = Object.keys(config.posts).sort().reverse();
            const postsForIndex = postKeys.map(slug => ({ 
                title: config.posts[slug].title,
                route: `_posts/${slug}/index.html`
            }));

            // construct post html file
            const postHTML = getHTMLFor(
                path.join( __dirname, '_post.html'),
                {
                    author: user.name,
                    title: deets.title,
                    body: converter.makeHtml(deets.content)
                }
            );

            // construct post html file
            const indexHTML = getHTMLFor(
                path.join( __dirname, '_index.html'),
                {
                    author: user.name,
                    title: config.title,
                    posts: postsForIndex
                }
            );

            const api = multiFileCommit({
                username: user.login,
                token,
                reponame: 'fuusio'
            });

            api.commit(
                [
                    {
                        path: `drafts/${slug}/index.md`,
                        content: JSON.stringify(deets.content)
                    }, {
                        path: `posts/${slug}/index.html`,
                        content: postHTML
                    },
                    {
                        path: 'index.html',
                        content: indexHTML
                    }, {
                        path: 'config.json',
                        content: JSON.stringify(config,  null, "\t")
                    },
                ], 
                `update ${slug}`
            )
            .then(_ => res.end())
            .catch(e => console.log('Failed to update the post', e));
        } catch (e) {
            console.error('Failed to update the post', e);
        }
    });
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