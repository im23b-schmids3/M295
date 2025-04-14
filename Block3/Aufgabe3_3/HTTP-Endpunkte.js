const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');


// /now → gibt aktuelle Zeit zurück
app.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.json({uhrzeit: now});
});

// /zli → Redirect auf ZLI-Website
app.get('/zli', (req, res) => {
    res.redirect('https://www.zli.ch');
});

names = ['Lena', 'Noah', 'Emma', 'Elias', 'Mia', 'Leon', 'Sophia', 'Ben', 'Laura', 'Jonas', 'Anna', 'Luca', 'Marie', 'Paul', 'Lea', 'Tim', 'Julia', 'Finn', 'Sarah', 'Max']
app.get('/name', (req, res) => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    res.send(randomName);
});

app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'static.html'), (err) => {
    });
});

app.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, 'image.jpg'), (err) => {
    });
});

app.get('/teapot', (req, res) => {
    res.status(418).send("I'm a teapot");
});

app.get('/user-agent', (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.send(`User-Agent: ${userAgent}`);
});

app.get('/secret', (req, res) => {
    res.status(403).send('ts pmo')
});

app.get('/xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'example.xml'), (err) => {
    });
});

app.get('/me', (req, res) => {
    const me = {
        name: 'Mustermann',
        vorname: 'Max',
        alter: 20,
        wohnort: 'zürich',
        augenfarbe: 'gelb'
    };
    res.json(me);
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});