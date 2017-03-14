const express = require('express');
const http = require('http');
const path = require('path');
const watch = require('node-watch');
const openBrowser = require('./src/build/openBrowser.js');
var exec = require('child_process').exec;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`==> Server is listening on port 3000`);
    console.log(`==> 🌎  Go to localhost:3000`);

    openBrowser('http://localhost:3000');
});

watch('./src', { recursive: true }, function(evt, name) {
  exec('yarn run build', function callback(error, stdout, stderr){
    if (error) {
        console.log(error);
        return;
    }
    
    console.log(stdout);
    openBrowser('http://localhost:3000');
  });
});
