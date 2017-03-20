const express = require('express');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const database = require('../database');
const http = require('http');
const path = require('path');

const port = 9000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'public')));

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

// saves post into mLab
app.post('/save-post', function(req, res) {
    database.savePost(
        req.body, 
        Date.now(), 
        function(posts) {
            console.log('save success!', posts);
            res.json(true);
        },
        function(err) {
            console.log(`Error saving to Mongo ${err}`);
        }
    );
});

// fetches all posts saved in mLab
app.get('/get-posts', function(req, res) {
    database.getPosts(function(posts) {
        res.json(posts);
    });
})

app.listen(port, () => {
    console.log(`==> Server is listening on port ${port}`);
	console.log(`==> 🌎  Go to localhost:${port}`);
});
