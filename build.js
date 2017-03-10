const fs = require('fs');
const handlebars = require('handlebars');
const showdown = require('showdown');
const converter = new showdown.Converter();

function mkdirSync(path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
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
        rmDir(filePath);
    }

  fs.rmdirSync(dirPath);
};

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }

    // delete all the old files in public
    clearDirSync('public');
    mkdirSync('public');

    var base = fs.readFileSync('_base.html', 'utf8');

    filenames.forEach(function(filename) {
      fs.readFile(`${dirname}/${filename}`, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }

        const context = {
          body: converter.makeHtml(content)
        };

        const template = handlebars.compile(base);
        const html = template(context);

        const name = filename.replace('.md', '');
        // we have created the new html file, write it to the
        // public directory with a time stamp on the file
        fs.writeFile(`public/${name}.html`, html, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log(`${name}.html was saved!`);
        });
      });
    });
  });
}

readFiles('./posts', function() { }, function(err) { console.log(err)});
