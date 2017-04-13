const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const showdown = require("showdown");
const converter = new showdown.Converter();

// Return an HTML template for the
// given file path and context provided
function getHTMLFor(path, context) {
  const base = fs.readFileSync(path, "utf8");

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
  getHTMLFor,
  pad,
  getDateNow
};
