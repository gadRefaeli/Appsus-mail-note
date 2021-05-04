import { storageService } from '../../../services/storage-service.js'
import { utilService } from './util-service.js'

export const keepService = {
    query,
    saveNote
}

const KEY = "notes"
var gNotes;

_createNotes();


function query(isPinned) {
    const filteredNotes = gNotes.filter(note => {
        return note.isPinned = isPinned;
    })
    return Promise.resolve(filteredNotes);
}

function saveNote(note) {
    return note.id ? _updateNote(note) : _addNote(note);
}

function _addNote(note) {
    var note = _createNote(note);
    gNotes.unshift(note);
    storageService.saveToStorage(KEY, gNotes);
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
    };
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
                    txt: "Welcome to MissKeep!"
                }
            }
        ]        
    }
    gNotes = notes;
    storageService.saveToStorage(KEY, gNotes);
}