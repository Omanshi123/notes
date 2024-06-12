// Array to store notes
let notes = [];

// Function to create a new note
function createNote() {
    notes.push({ content: '', name: 'Note ' + (notes.length + 1) });
    renderNotes();
}

// Function to render notes in the sidebar
function renderNotes() {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = note.name;
        listItem.addEventListener('click', () => {
            displayNote(index);
        });
        noteList.appendChild(listItem);
    });
}

// Function to display a note in the main area
function displayNote(index) {
    const noteContent = document.getElementById('noteContent');
    noteContent.value = notes[index].content;
    highlightSelected(index);
}

// Function to highlight the selected note in the sidebar
function highlightSelected(index) {
    const noteListItems = document.querySelectorAll('#noteList li');
    noteListItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// Function to save a note
function saveNote() {
    const noteContent = document.getElementById('noteContent').value;
    const currentNoteIndex = getCurrentNoteIndex();
    if (currentNoteIndex !== -1) {
        notes[currentNoteIndex].content = noteContent;
        renderNotes();
        highlightSelected(currentNoteIndex);
    }
}

// Function to delete a note
function deleteNote() {
    const currentNoteIndex = getCurrentNoteIndex();
    if (currentNoteIndex !== -1) {
        notes.splice(currentNoteIndex, 1);
        renderNotes();
        clearNoteContent();
    }
}

// Function to rename a note
function renameNote() {
    const newName = prompt('Enter a new name for the note:');
    if (newName !== null && newName.trim() !== '') {
        const currentNoteIndex = getCurrentNoteIndex();
        if (currentNoteIndex !== -1) {
            notes[currentNoteIndex].name = newName.trim();
            renderNotes();
            highlightSelected(currentNoteIndex);
        }
    }
}

// Function to get the index of the currently displayed note
function getCurrentNoteIndex() {
    const noteList = document.getElementById('noteList');
    const selectedNote = noteList.querySelector('.selected');
    if (selectedNote) {
        return Array.from(noteList.children).indexOf(selectedNote);
    }
    return -1;
}

// Function to clear the note content
function clearNoteContent() {
    document.getElementById('noteContent').value = '';
}

// Event listeners
document.getElementById('newNoteBtn').addEventListener('click', createNote);
document.getElementById('saveNoteBtn').addEventListener('click', saveNote);
document.getElementById('deleteNoteBtn').addEventListener('click', deleteNote);
document.getElementById('renameNoteBtn').addEventListener('click', renameNote);

// Initial rendering of notes
createNote();
