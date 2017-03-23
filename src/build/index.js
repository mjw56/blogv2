const fs = require('fs');
const handlebars = require('handlebars');
const database = require('../database');
const helpers = require('./helpers');

function copyFiles(cb) {
  return new Promise(function(resolve, reject) {
    let promises = [];
    // read all the files in from src dir and only copy what we need
    const srcFiles = helpers.readFiles('./src', function(files) {
      files.filter(function(file) {
        return file.substr(-3) === '.js' || file.substr(-4) === '.css'
      })
      .forEach(function(file) {
        promises.push(helpers.copyFile(`./src/${file}`, `public/${file}`));
      });

      Promise.all(promises).then(cb);
    });
  });
}

// wipe out old public
helpers.clearDirSync('public');

// start fresh public
helpers.mkdirSync('public');

// connect to mongo and get the list of all posts
database.getPosts(function(posts) {
  // console.log('got em', posts);

  // we are going to 
  let routes = [];

  for (const post of posts) {
    // for each post we need to grab the content
    // and build the template, then copy it over to
    // the directory it will live under in the public/
    const route = { 
      content: post.deets.content,
      cover: post.deets.cover,
      route: post.timestamp,
      title: post.deets.title 
    };

    routes.push(route);

    const onSuccess = function(msg) {
      console.log(msg);
    };

    const onFailure = function(msg) {
      console.log(msg);
    };

    helpers.writePostFile(route, onSuccess, onFailure);
  }

  const indexBase = fs.readFileSync('./src/_index.html', 'utf8');
  const context = {
    posts: routes
  };

  const template = handlebars.compile(indexBase);
  const html = template(context);

  // write the result to public
  fs.writeFile(`public/index.html`, html, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log(`index.html was saved!`);
      copyFiles(function() {
        console.log('done!');
        process.exit();
      });
  });
});
