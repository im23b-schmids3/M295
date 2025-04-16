const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config();
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'geheimes_passwort',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.post('/name', (request, response) => {
    const { name } = request.body;
    request.session.name = name;
    response.send(`Name ${name} gespeichert.`);
});

app.get('/name', (request, response) => {
    if (request.session.name) {
        response.send(`Hallo ${request.session.name}`);
    } else {
        response.status(401).send('Unauthorized: Name nicht gesetzt.');
    }
});

app.delete('/name', (request, response) => {
    request.session.destroy(err => {
        if (err) {
            return response.status(500).send('Fehler beim Löschen der Sitzung.');
        }
        response.send('Sitzung gelöscht.');
    });
});
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});