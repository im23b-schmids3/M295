const http = require('http');

const results = [];
let count = 0;

function printResults() {
  for (let i = 0; i < 3; i++) {
    console.log(results[i]);
  }
}

function getData(index) {
  http.get(process.argv[2 + index], response => {
    response.setEncoding('utf8');

    let data = '';

    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      results[index] = data;
      count++;

      if (count === 3) {
        printResults();
      }
    });

    response.on('error', err => {
      console.error('Fehler beim Empfangen:', err.message);
    });

  }).on('error', err => {
    console.error('Fehler bei der Anfrage:', err.message);
  });
}

for (let i = 0; i < 3; i++) {
  getData(i);
}

/*  REAL SOLUTION
    const http = require('http')
    const bl = require('bl')
    const results = []
    let count = 0

    function printResults () {
      for (let i = 0; i < 3; i++) {
        console.log(results[i])
      }
    }

    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err) {
            return console.error(err)
          }

          results[index] = data.toString()
          count++

          if (count === 3) {
            printResults()
          }
        }))
      })
    }

    for (let i = 0; i < 3; i++) {
      httpGet(i)
    }
    */
