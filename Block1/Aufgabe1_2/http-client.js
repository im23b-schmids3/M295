const http = require('http');

http.get(process.argv[2], response => {
  response.setEncoding('utf8');

  response.on('data', chunk => {
    console.log(chunk);
  });

  response.on('error', err => {
    console.error('Fehler beim Empfangen:', err.message);
  });
});

/* REAL SOLUTION
const http = require('http')

  http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    }).on('error', console.error)

 */