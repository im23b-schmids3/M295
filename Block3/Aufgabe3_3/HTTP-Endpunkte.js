const express = require('express');
const app = express();
const port = 3000;

// /now → gibt aktuelle Zeit zurück
app.get('/now', (req, res) => {
  const now = new Date().toISOString();
  res.json({ uhrzeit: now });
});

// /zli → Redirect auf ZLI-Website
app.get('/zli', (req, res) => {
  res.redirect('https://www.zli.ch');
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});