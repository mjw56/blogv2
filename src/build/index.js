const fs = require('fs');
const handlebars = require('handlebars');
const helpers = require('./helpers');

// wipe out old public
helpers.clearDirSync('public');

// start fresh public
helpers.mkdirSync('public');

// get all post directories
const dirs = helpers.getDirectories('./src/posts');

// for each directory, go in and read the files
dirs.forEach((dir) => {
  // we should probably have a config.json for each post this just makes it easier
  // wthout having an automated backend right now, i dunno, need to come back to this
  // sometime later though and figure it out
  helpers.handlePostDir(dir, (err) => { console.log(err) });
});

// read in base index and populate
const indexBase = fs.readFileSync('./src/_index.html', 'utf8');
const context = {
  posts: helpers.getIndex()
};
const template = handlebars.compile(indexBase);
const html = template(context);

// write the result to public
fs.writeFile(`public/index.html`, html, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log(`index.html was saved!`);
});

// copy over styles and highlighting stuff
helpers.copyFileSync('./src/style.css', 'public/style.css');
helpers.copyFileSync('./src/sw.js', 'public/sw.js');
helpers.copyFileSync('./src/highlight.pack.js', 'public/highlight.pack.js');
helpers.copyFileSync('./src/tomorrow-night-eighties.css', 'public/tomorrow-night-eighties.css');