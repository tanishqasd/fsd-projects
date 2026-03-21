const express = require('express');
const fs = require('fs').promises;  // USE PROMISES
const path = require('path');
const app = express();
const PORT = 5000;

app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const TODOS_FILE = path.join(DATA_DIR, 'todos.json');

// 🛡️ BULLETPROOF FILE INIT
async function initData() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        
        try {
            await fs.access(USERS_FILE);
        } catch {
            await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
            console.log('✅ Created users.json');
        }
        
        try {
            await fs.access(TODOS_FILE);
        } catch {
            await fs.writeFile(TODOS_FILE, JSON.stringify([], null, 2));
            console.log('✅ Created todos.json');
        }
        
        console.log('📁 Data ready!');
    } catch (error) {
        console.error('💥 Init error:', error);
    }
}

// AUTH
app.post('/api/signup', async (req, res) => {
    console.log('🆕 SIGNUP:', req.body.username);
    try {
        const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
        
        if (users.find(u => u.username === req.body.username)) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        users.push({ username: req.body.username, password: req.body.password });
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        console.log('✅ Signup OK');
        res.json({ success: true });
    } catch (error) {
        console.error('💥 Signup error:', error.message);
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/api/login', async (req, res) => {
    console.log('🔐 LOGIN:', req.body.username);
    try {
        const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
        const user = users.find(u => 
            u.username === req.body.username && 
            u.password === req.body.password
        );
        
        if (user) {
            console.log('✅ Login OK');
            res.json({ success: true, username: user.username });
        } else {
            console.log('❌ Invalid credentials');
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error('💥 Login error:', error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// TODOS - BULLETPROOF
app.get('/api/todos/:username', async (req, res) => {
    console.log('📥 GET todos:', req.params.username);
    try {
        let todos = [];
        try {
            const data = await fs.readFile(TODOS_FILE, 'utf8');
            todos = JSON.parse(data);
        } catch {
            todos = [];
        }
        const userTodos = todos.filter(t => t.username === req.params.username);
        console.log(`✅ ${userTodos.length} todos loaded`);
        res.json(userTodos);
    } catch (error) {
        console.error('💥 GET todos error:', error.message);
        res.json([]);
    }
});

app.post('/api/todos', async (req, res) => {
    console.log('➕ ADD todo:', req.body.username, req.body.text?.substring(0, 30));
    try {
        let todos = [];
        try {
            const data = await fs.readFile(TODOS_FILE, 'utf8');
            todos = JSON.parse(data);
        } catch {
            todos = [];
        }
        
        const newTodo = {
            id: Date.now().toString(),
            username: req.body.username,
            text: req.body.text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        todos.push(newTodo);
        await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
        
        console.log('✅ Todo ADDED:', newTodo.id);
        res.json(newTodo);
    } catch (error) {
        console.error('💥 ADD todo ERROR:', error.message);
        console.error('Full error:', error);
        res.status(500).json({ error: 'Failed to save todo', details: error.message });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    console.log('🗑️ DELETE:', req.params.id);
    try {
        let todos = [];
        try {
            const data = await fs.readFile(TODOS_FILE, 'utf8');
            todos = JSON.parse(data);
        } catch {
            todos = [];
        }
        
        const initialCount = todos.length;
        todos = todos.filter(t => t.id !== req.params.id);
        
        if (todos.length < initialCount) {
            await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
            console.log('✅ Todo DELETED');
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        console.error('💥 DELETE error:', error.message);
        res.status(500).json({ error: 'Failed to delete' });
    }
});

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// START
async function startServer() {
    await initData();
    app.listen(PORT, () => {
        console.log(`\n🚀 TaskMaster running: http://localhost:${PORT}`);
        console.log(`📁 Data folder: ${DATA_DIR}`);
        console.log(`📄 Users: ${path.resolve(USERS_FILE)}`);
        console.log(`📄 Todos: ${path.resolve(TODOS_FILE)}`);
    });
}

startServer().catch(console.error);