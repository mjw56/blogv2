const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const showdown = require('showdown');
const converter = new showdown.Converter();

// creates a directory
function mkdirSync(path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) {
      console.log(`directory ${path} already exists!`);
    }
  }
}

// removes a directory path completely
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

// copy files from one location to another
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
    if (!cbCalled && typeof cb === 'function') {
      cb(err);
      cbCalled = true;
    }
  }
}

// read all files in a given directory
function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
	  if (typeof onError === 'function') {
        onError(err);
	  }
      return;
    }

    if (typeof onFileContent === 'function') {
      onFileContent(filenames);
    }
  });
}

// get list of directories in folder
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}

// check if a file exists
function fileExists(path) {
  return fs.existsSync(path);
}

// TODO: think of better way to pass in this index
// this file represents the list of blog posts on the
// landing index page of the blog
let index = [];

// get the index
function getIndex() {
  return index;
}

// handle each file in a post directory
function handlePostDir(dirname, onError) {
  const base = fs.readFileSync('./src/posts/_base.html', 'utf8');

  // check if we have an index.md, if we don't return
  if (!fileExists(`./src/posts/${dirname}/index.md`)) {
    console.log(`index.md file not found for ${dirname}`);
    return;
  }

  // check if we have a config.json, if we don't return
  if (!fileExists(`./src/posts/${dirname}/config.json`)) {
    console.log(`config.json file not found for ${dirname}`);
    return;
  }

  // grab the post config
  const config = JSON.parse(fs.readFileSync(`./src/posts/${dirname}/config.json`, 'utf8'));

  // create the public folder for this post
  mkdirSync(`public/${dirname}`);

  // setup the index.md file
  fs.readFile(`./src/posts/${dirname}/index.md`, 'utf-8', function(err, content) {
    if (err) {
      onError(err);
      return;
    }

    const context = {
      body: converter.makeHtml(content),
	  title: config.title
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

  // copy all the remainder of the files excluding the index.md or config.json
  readFiles(
    `./src/posts/${dirname}/`, 
    (files) => {
      files.forEach((file) => {
        if (file !== 'index.md' && file !== 'config.json') {
          copyFileSync(
            `./src/posts/${dirname}/${file}`,
            `public/${dirname}/${file}`,
            () => { console.log(`public/${dirname}/${file} copied!`) }
          );
        }
      })
    },
    (err) => {
      console.warn(err);
    }
  );

  // read the config and store the title and link
  index.push({ title: config.title, route: dirname });
}

module.exports = {
  mkdirSync: mkdirSync,
  clearDirSync: clearDirSync,
  copyFileSync: copyFileSync,
  readFiles: readFiles,
  getDirectories: getDirectories,
  handlePostDir: handlePostDir,
  getIndex: getIndex
}
