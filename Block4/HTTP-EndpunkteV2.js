const express = require('express');
const {response} = require("express");
const app = express();
const port = 3000;
const path = require('path');
const moment = require('moment-timezone');

const names = ['Alice', 'Bob', 'Charlie'];

app.use(express.urlencoded({ extended: true }));

app.get('/now', (request, response) => {
  const tz = request.query.tz || 'Europe/Zurich';
  const time = moment().tz(tz).format();
  response.json({ currentTime: time });
});

app.get('/zli', (request, response) => {
  response.redirect('https://www.zli.ch');
});

app.get('/names', (request, response) => {
    const namesList = names.join(', ');
    response.send(`Die Namen sind: ${namesList}`);
});
app.get('/name', (request, response) => {
  const randomIndex = Math.floor(Math.random() * names.length);
  const randomName = names[randomIndex];

    response.send(randomName);
});

app.post('/names', (request, response) => {
    const name = request.body.name
    names.push(name)
});

app.delete('/names', (request, response) => {
    const name = request.body.name
    const index = names.findIndex(n => n.toLowerCase() === name.toLowerCase());
    names.splice(index, 1);

    response.status(204).send();
});

app.get('/html', (request, response) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mein HTML-Dokument</title>
        </head>
        <body>
            <h1>Willkommen auf meiner Seite!</h1>
            <p>Dies ist ein einfaches HTML-Dokument.</p>
        </body>
        </html>
    `;
    response.send(htmlContent);

});

app.get('/image', (request, response) => {
    const imagePath = path.join(__dirname, 'MainBefore.jpg');
    response.sendFile(imagePath);
});

app.get('/teapot', (request, response) => {
  response.status(418).send("I'm a teapot");
});

app.get('/user-agent', (request, response) => {
  const userAgent = request.get('user-agent');
    response.send(`Your User-Agent is: ${userAgent}`);
});

app.get('/secret', (request, response) => {
    response.status(403).send("I'm a secret :)");
});

app.get('/secret2', (request, response) => {
    const auth = request.get('Authorization');
    if (auth === 'Basic aGFja2VyOjEyMzQ=') {
    return response.status(200).send('🔓 Zugriff gewährt');
  }
  response.status(401).send('🚫 Zugriff verweigert');
});

app.get('/xml', (request, response) => {
  response.sendFile(path.join(__dirname, 'test.xml'));
});

app.get('/me', (request, response) => {
 const person = {
    vorname: "Max",
    nachname: "Mustermann",
    alter: 30,
    wohnort: "Zürich",
    augenfarbe: "braun"
  };
  response.json(person);
});
// GET /chuck
app.get('/chuck', async (req, res) => {
    const name = req.query.name || 'Chuck Norris';
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        const joke = data.value.replace(/Chuck Norris/g, name);
        res.send(joke);
    } catch (err) {
        res.status(500).send('Fehler beim Abrufen des Witzes');
    }
});

// PATCH /me
app.patch('/me', (req, res) => {
    const updates = req.body;
    me = { ...me, ...updates };
    res.json(me);
});

app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});