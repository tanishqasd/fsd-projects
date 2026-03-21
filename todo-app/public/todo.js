// Enhanced todo.js with DEBUG & ERROR HANDLING
const username = localStorage.getItem('currentUser');
console.log('👤 Current user:', username);

if (!username) {
    console.log('❌ No user, redirecting to login');
    window.location.href = 'index.html';
}

document.getElementById('userDisplay').innerText = `Hi, ${username}!`;
document.getElementById('totalTasks').innerText = '0';
document.getElementById('completedTasks').innerText = '0';

let todos = [];

async function loadTodos() {
    console.log('📥 Loading todos for:', username);
    try {
        const res = await fetch(`/api/todos/${username}`);
        console.log('📡 Todos response status:', res.status);
        
        if (!res.ok) {
            console.error('❌ Load todos failed:', res.status);
            showEmptyState();
            return;
        }
        
        todos = await res.json();
        console.log('✅ Loaded todos:', todos);
        renderTodos();
        updateStats();
    } catch (error) {
        console.error('💥 Load todos error:', error);
        showEmptyState();
    }
}

function renderTodos() {
    const list = document.getElementById('todoList');
    
    if (todos.length === 0) {
        showEmptyState();
        return;
    }
    
    hideEmptyState();
    
    list.innerHTML = todos.map(todo => `
        <div class="todo-item" data-id="${todo.id}">
            <div class="todo-text">${escapeHtml(todo.text)}</div>
            <span class="delete-task" onclick="deleteTodo(${todo.id})">🗑️ Delete</span>
        </div>
    `).join('');
}

function showEmptyState() {
    document.getElementById('emptyState').style.display = 'block';
    document.getElementById('todoList').innerHTML = '';
}

function hideEmptyState() {
    document.getElementById('emptyState').style.display = 'none';
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    document.getElementById('totalTasks').innerText = total;
    document.getElementById('completedTasks').innerText = completed;
}

document.getElementById('addBtn').onclick = async () => {
    const text = document.getElementById('todoInput').value.trim();
    if (!text) {
        alert('Please enter a task!');
        return;
    }

    console.log('➕ Adding todo:', { username, text });
    
    try {
        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, text })
        });

        console.log('📡 Add todo response:', res.status);
        
        if (!res.ok) {
            const error = await res.json();
            console.error('❌ Add todo failed:', error);
            alert('Failed to add task!');
            return;
        }

        const newTodo = await res.json();
        console.log('✅ Todo added:', newTodo);
        
        document.getElementById('todoInput').value = '';
        todos.push(newTodo);
        renderTodos();
        updateStats();
    } catch (error) {
        console.error('💥 Add todo error:', error);
        alert('Connection error!');
    }
};

async function deleteTodo(id) {
    console.log('🗑️ Deleting todo:', id);
    
    try {
        const res = await fetch(`/api/todos/${id}`, { 
            method: 'DELETE' 
        });
        
        if (res.ok) {
            todos = todos.filter(t => t.id != id);
            renderTodos();
            updateStats();
            console.log('✅ Todo deleted');
        } else {
            console.error('❌ Delete failed');
        }
    } catch (error) {
        console.error('💥 Delete error:', error);
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Auto-load on page load
loadTodos();

// Enter key to add task
document.getElementById('todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('addBtn').click();
    }
});