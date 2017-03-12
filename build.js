const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const showdown = require('showdown');
const converter = new showdown.Converter();

// keep a record of all the blog posts and their titles
// we're going to populate them as links into the index.html page
let index = [];

function mkdirSync(path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) {
      console.log(`directory ${path} already exists!`);
    }
  }
}

function clearDirSync(dirPath) {
  try { var files = fs.readdirSync(dirPath); }
  catch(e) { return; }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
        clearDirSync(filePath);
    }

  fs.rmdirSync(dirPath);
};

function copyFileSync(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }

    onFileContent(filenames);
  });
}

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}

function fileExists(path) {
  return fs.existsSync(path);
}

// handle each file in a post directory
function handlePostDir(dirname, onError) {
  const base = fs.readFileSync('posts/_base.html', 'utf8');

  // check if we have an index.md, if we don't return
  if (!fileExists(`posts/${dirname}/index.md`)) {
    console.log(`index.md file not found for ${dirname}`);
    return;
  }

  // check if we have a config.json, if we don't return
  if (!fileExists(`posts/${dirname}/config.json`)) {
    console.log(`config.json file not found for ${dirname}`);
    return;
  }

  // create the public folder for this post
  mkdirSync(`public/${dirname}`);

  // setup the index.md file
  fs.readFile(`posts/${dirname}/index.md`, 'utf-8', function(err, content) {
    if (err) {
      onError(err);
      return;
    }

    const context = {
      body: converter.makeHtml(content)
    };

    const template = handlebars.compile(base);
    const html = template(context);

    fs.writeFile(`public/${dirname}/index.html`, html, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(`${dirname}/index.html was saved!`);
    });
  });

  // read the config and store the title and link
  const config = JSON.parse(fs.readFileSync(`posts/${dirname}/config.json`, 'utf8'));
  index.push({ title: config.title, route: dirname });
}

// wipe out old public
clearDirSync('public');

// start fresh public
mkdirSync('public');

// get all post directories
const dirs = getDirectories('./posts');

// for each directory, go in and read the files
dirs.forEach((dir) => {
  // we should probably have a config.json for each post this just makes it easier
  // wthout having an automated backend right now, i dunno, need to come back to this
  // sometime later though and figure it out
  handlePostDir(dir, (err) => { console.log(err) });
});

// read in base index and populate
const indexBase = fs.readFileSync('_index.html', 'utf8');
const context = {
  posts: index
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