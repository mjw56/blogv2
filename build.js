const fs = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter();

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(`${dirname}/${filename}`, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        // onFileContent(filename, content);
        console.log(converter.makeHtml(content));
      });
    });
  });
}

readFiles('./posts', function() { }, function(err) { console.log(err)});
