const btnEl = document.getElementById('btn');
const appEl = document.getElementById('app');

getNotes().forEach((notes)=>{
    const noteEl = createNoteEl(notes.id, notes.content);
    appEl.insertBefore(noteEl,btnEl);
});

function createNoteEl(id, content){
    const element = document.createElement('textarea');
    element.classList.add('notes');
    element.placeholder = "Empty Notes"
    element.value = content

    element.addEventListener('dblclick',()=>{
        const warning = confirm('Do you want to delete this note')
        if(warning){
            deleteNote(id,element)
        }
    })

    element.addEventListener('input',()=>{
        updateNote(id,element.value)
    })

    return element
}

function deleteNote(id, element){
    const notes = getNotes().filter((notes)=>notes.id != id)
    saveNote(notes)
    appEl.removeChild(element);
}

function updateNote(id, content){
    const notes = getNotes();
    const target = notes.filter((notes)=>notes.id == id)[0];
    target.content = content;
    saveNote(notes);
}

function addNote(){
    const note = getNotes();
    const noteObj = {
        id: Math.floor(Math.random()*10000),
        content: '',
    };
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl,btnEl);

    note.push(noteObj);
    
    saveNote(note)
}

function saveNote(notes){
    localStorage.setItem('note-app',JSON.stringify(notes))
}

function getNotes(){
   return JSON.parse(localStorage.getItem('note-app') || '[]');
}

btnEl.addEventListener('click',addNote)