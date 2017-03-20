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

function writePostFile(data, onSuccess, onFailure) {
    const base = fs.readFileSync('./src/posts/_base.html', 'utf8');

    const context = {
      body: converter.makeHtml(data.content),
	    title: data.title
    };

    const template = handlebars.compile(base);
    const html = template(context);

    mkdirSync(`public/${data.route}`);

    fs.writeFile(`public/${data.route}/index.html`, html, function(err) {
        if(err) {
            return onFailure(err);
        }

        return onSuccess(`${data.route}/index.html was saved!`);
    });
}

module.exports = {
  mkdirSync: mkdirSync,
  clearDirSync: clearDirSync,
  copyFileSync: copyFileSync,
  readFiles: readFiles,
  getDirectories: getDirectories,
  getIndex: getIndex,
  writePostFile: writePostFile
}
