const notesGrid = document.getElementById('notesGrid');
const modal = document.getElementById('noteModal');
const newNoteBtn = document.getElementById('newNoteBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');

// Fetch and display notes
async function loadNotes() {
    const res = await fetch('/api/notes');
    const notes = await res.json();
    
    notesGrid.innerHTML = notes.map(note => `
        <div class="note-card">
            <button class="delete-btn" onclick="deleteNote(${note.id})">×</button>
            <h3>${note.title}</h3>
            <p>${note.text}</p>
            <div class="note-date">${note.date}</div>
        </div>
    `).join('');
}

// Open Modal
newNoteBtn.onclick = () => modal.style.display = 'flex';
cancelBtn.onclick = () => modal.style.display = 'none';

// Save Note
saveBtn.onclick = async () => {
    const title = document.getElementById('noteTitle').value;
    const text = document.getElementById('noteText').value;

    if (!title || !text) return alert("Please fill everything!");

    await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text })
    });

    document.getElementById('noteTitle').value = '';
    document.getElementById('noteText').value = '';
    modal.style.display = 'none';
    loadNotes();
};

// Delete Note
async function deleteNote(id) {
    if (!confirm("Delete this note?")) return;
    await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    loadNotes();
}

// Initial Load
loadNotes();
