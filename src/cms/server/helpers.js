const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const showdown = require('showdown');
const converter = new showdown.Converter();

// returns HTML markup for given Markdown content
// and injects it into an html file shell
function getHTMLForPost(deets, user) {
    const base = fs.readFileSync(path.join( __dirname, '_post.html'), 'utf8');

    const context = {
        author: user.name,
        body: converter.makeHtml(deets.content),
        title: deets.title
    };

    const template = handlebars.compile(base);
    const html = template(context);

    return html;
}

// pad a number with a zero if < 10
function pad(n) {
    return n < 10 ? `0${n}` : n;
}

// get the current date formatted YYYY-MM-DD
function getDateNow() {
    const date = new Date();

    return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}`;
}

module.exports = {
  getHTMLForPost,
  pad,
  getDateNow
};