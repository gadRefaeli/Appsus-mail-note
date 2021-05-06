import { storageService } from '../../../services/storage-service.js'
import { utilService } from './util-service.js'

export const keepService = {
    query,
    saveNote,
    removeNote,
    getNoteById,
    saveNoteTodos
}

const KEY = "notes"
var gNotes;

_createNotes();

function getNoteById(id) {
    const note = gNotes.find(note => {
        return note.id === id
    })
    return Promise.resolve(note)
}

function query(isPinned) {
    const filteredNotes = gNotes.filter(note => {
        return note.isPinned === isPinned;
    })
    return Promise.resolve(filteredNotes);
}

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

function _updateNote(noteToUpdate) {
    const noteIdx = gNotes.findIndex(note => {
        return note.id === noteToUpdate.id;
    })
    gNotes.splice(noteIdx, 1, noteToUpdate)
    _saveNotesToStorage();
    return Promise.resolve(noteToUpdate);
}

function saveNoteTodos(noteToUpdate) {
    const { txt } = noteToUpdate.info
    for (let i = 0; i < txt.length; i++) {
        txt[i] = { id: `${noteToUpdate.id}-${i}`, str: txt[i], isDone: false }
    }
    const noteIdx = gNotes.findIndex(note => {
        return note.id === noteToUpdate.id;
    })
    gNotes.splice(noteIdx, 1, noteToUpdate)
    _saveNotesToStorage();
    return Promise.resolve(noteToUpdate);
}

function _createNote({ type, isPinned, info, style }) {
    let note = {
        id: utilService.makeId(),
        type,
        isPinned,
        info,
        style
    }
    if (note.type === "NoteTodos") {
        const { txt } = note.info
        for (let i = 0; i < note.info.txt.length; i++) {
            txt[i] = { id: `${note.id}-${i}`, str: txt[i], isDone: false }
        }
    }
    return note
}

function _createNotes() {
    var notes = storageService.loadFromStorage(KEY);
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                type: 'NoteTxt',
                isPinned: true,
                info: {
                    txt: ['Welcome to MissKeep!']
                },
                style: {
                    backgroundColor: '#f49494'
                }
            },
            {
                id: utilService.makeId(),
                type: 'NoteTxt',
                isPinned: true,
                info: {
                    txt: ['Enjoy our Keep!']
                },
                style: {
                    backgroundColor: '#f5f77d'
                }
            },
            {
                id: utilService.makeId(),
                type: 'NoteVideo',
                isPinned: true,
                info: {
                    url: '../../assets/video/note.mp4',
                    title: 'Let\'s write notes!'
                },
                style: {
                    backgroundColor: '#ffffff'
                }
            },
            {
                id: utilService.makeId(),
                type: 'NoteImg',
                isPinned: true,
                info: {
                    url: 'https://storage.hidabroot.org/articles_new/128082_tumb_750Xauto.jpg',
                    title: 'The life are graet!'
                },
                style: {
                    backgroundColor: '#ffffff'
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