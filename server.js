const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`==> Server is listening on port 3000`);
    console.log(`==> 🌎  Go to localhost:3000`);
});
