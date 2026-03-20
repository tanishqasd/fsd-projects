const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// API Route to fetch posts from our "Database"
app.get('/api/posts', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'posts.json'));
    res.json(JSON.parse(data));
});

app.listen(PORT, () => {
    console.log(`Strong backend running at http://localhost:${PORT}`);
});