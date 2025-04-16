const express = require('express');
const {response} = require("express");
const app = express();
const port = 3000;
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.get('/public', (request, response) => {
    response.send('Öffentlicher Endpunkt');
});

app.get('/private', (req, res) => {
    const { username, password } = req.query;
    if (username === process.env.USERNAMEE && password === process.env.PASSWORD) {
        res.send('Zugriff gewährt: Willkommen im privaten Bereich!');
    } else {
        res.status(401).send('Zugriff verweigert: Ungültige Anmeldedaten.');
    }
});

app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});
console.log('Username:', process.env.USERNAMEE);
console.log('Password:', process.env.PASSWORD);