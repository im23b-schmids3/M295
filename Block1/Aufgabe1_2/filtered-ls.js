const fs = require('fs');
const path = require('path');

const directory = process.argv[2];
const extension = `.${process.argv[3]}`;

fs.readdir(directory, (err, files) => {
  if (err) {
    return console.error(err);
  }

  const filteredFiles = files.filter(file => path.extname(file) === extension);
  filteredFiles.forEach(file => console.log(file));
});

/*
"REAL SOLUTION"
const fs = require('fs')
    const path = require('path')

    const folder = process.argv[2]
    const ext = '.' + process.argv[3]

    fs.readdir(folder, function (err, files) {
      if (err) return console.error(err)
      files.forEach(function (file) {
        if (path.extname(file) === ext) {
          console.log(file)
        }
      })
    })
"
 */