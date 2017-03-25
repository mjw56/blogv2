const WebSocket = require('ws');
const showdown = require('showdown');
const converter = new showdown.Converter();

function handleMessage(ws, message) {
    let parsedMessage;
    try {
        parsedMessage = JSON.parse(message);
    } catch (e) {
        console.error(e);
    }

    const html = converter.makeHtml(parsedMessage.content);

    ws.send(html);
}

function connection(ws) {
    ws.on('message', handleMessage.bind(null, ws));

    ws.on('close', function close() { });
}

function init(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', connection);
}

module.exports = {
    init: init
}
