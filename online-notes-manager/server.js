const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'data', 'notes.json');

// Ensure data folder and file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync('data');
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));

// API: Get all notes
app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync(DATA_FILE);
    res.json(JSON.parse(data));
});

// API: Save a new note
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(DATA_FILE));
    const newNote = { id: Date.now(), ...req.body, date: new Date().toLocaleDateString() };
    notes.unshift(newNote); // Put newest first
    fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
    res.json(newNote);
});

// API: Delete a note
app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync(DATA_FILE));
    notes = notes.filter(n => n.id != req.params.id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Notes Manager running at http://localhost:${PORT}`));