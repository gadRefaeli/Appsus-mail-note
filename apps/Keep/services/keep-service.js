import { storageService } from '../../../services/storage-service.js'
import { utilService } from './util-service.js'

export const keepService = {
    query,
    saveNote,
    removeNote
}

const KEY = "notes"
var gNotes;

_createNotes();

function query() {
    return Promise.resolve(gNotes);
}
// function query(isPinned) {
//     const filteredNotes = gNotes.filter(note => {
//         return note.isPinned === isPinned;
//     })
//     return Promise.resolve(filteredNotes);
// }

function saveNote(note) {
    return note.id ? _updateNote(note) : _addNote(note);
}

function removeNote(id) {
    var noteIdx = gNotes.findIndex(note => {
        return id === note.id
    })
    gNotes.splice(noteIdx, 1);
    _saveNotesToStorage();
    return Promise.resolve();
}

function _addNote(note) {
    var note = _createNote(note);
    gNotes.unshift(note);
    _saveNotesToStorage();
    console.log(gNotes)
    return Promise.resolve(note);
}

function _createNote({type, isPinned, info, style}) {
    return {
        id: utilService.makeId(),
        type,
        isPinned,
        info,
        style
    } 
}

function _createNotes() {
    var notes = storageService.loadFromStorage(KEY);
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                type: "NoteTxt",
                isPinned: true,
                info: {
                    txt: "Welcome to MissKeep!"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteTxt",
                isPinned: true,
                info: {
                    txt: "Enjoy our Keep!"
                }
            }
        ]        
    }
    gNotes = notes;
    _saveNotesToStorage();
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes);
}