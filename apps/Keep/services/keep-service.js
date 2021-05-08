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

function query(isPinned, filter) { 
    const filteredNotes = gNotes.filter(note => {
        return note.isPinned === isPinned && (
        (note.type === 'NoteTxt' && note.info.txt.join(',').toLowerCase().includes(filter.toLowerCase())) ||
        (note.type === 'NoteTodos' && isNoteTodosFiltered(note.info.txt, filter)).length > 0 ||
        ((note.type === 'NoteImg' || note.type === 'NoteVideo') && note.info.title.toLowerCase().includes(filter.toLowerCase()))
        )
    })
    return Promise.resolve(filteredNotes);
}

function isNoteTodosFiltered(txt, filter) {
    const filteredTodosNotes = txt.filter(line => {
        return line.str.toLowerCase().includes(filter.toLowerCase());
    })
    return filteredTodosNotes;
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
                    backgroundColor: '#fdbfbf'
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
                isPinned: false,
                info: {
                    url: 'https://player.vimeo.com/external/274413239.hd.mp4?s=2df73448dc4bdab5bb529167f29b10a068c3778f&profile_id=174',
                    title: 'Let\'s write notes!'
                },
                style: {
                    backgroundColor: '#ffffff'
                }
            },
            {
                id: utilService.makeId(),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://storage.hidabroot.org/articles_new/128082_tumb_750Xauto.jpg',
                    title: 'The life are graet!'
                },
                style: {
                    backgroundColor: '#ffffff'
                }
            },
            {
                id: "W8BXdk",
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    txt: [{id: "W8BXdk-0", str: "To learn JS", isDone: false}, {id: "W8BXdk-1", str: "To create an app", isDone: false}]
                },
                style: {
                    backgroundColor: '#f5f77d'
                }
            },
            {
                id: utilService.makeId(),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://cdn.pixabay.com/photo/2015/05/31/15/08/blank-792125__340.jpg',
                    title: 'Notes & Mail...'
                },
                style: {
                    backgroundColor: '#fdfdfd'
                }
            },{
                id: utilService.makeId(),
                type: 'NoteTxt',
                isPinned: false,
                info: {
                    txt: ['What is Lorem Ipsum?',' Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,','when an unknown printer took a galley of type and scrambled it to make a type specimen book.','It has survived not only five centuries,','but also the leap into electronic typesetting, remaining essentially unchanged.','It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,',' and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.']
                },
                style: {
                    backgroundColor: '#f5f77d'
                }
            },
            {
                id: utilService.makeId(),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://cdn.pixabay.com/photo/2015/05/31/15/14/woman-792162__340.jpg',
                    title: 'Notes & Mail...'
                },
                style: {
                    backgroundColor: '#cbe2fb'
                }
            },
            {
                id: "W8BXdd",
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    txt: [{id: "W8BXdd-0", str: "To learn JS", isDone: false}, {id: "W8BXdd-1", str: "To create an app", isDone: false}]
                },
                style: {
                    backgroundColor: '#fdbfbf'
                }
            },
            {
                id: utilService.makeId(),
                type: 'NoteTxt',
                isPinned: false,
                info: {
                    txt: ['Play JS!!!']
                },
                style: {
                    backgroundColor: '#91f575'
                }
            },
            {
                id: utilService.makeId(),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://cdn.pixabay.com/photo/2015/05/31/14/23/organizer-791939__340.jpg',
                    title: 'Notes & Mail...'
                },
                style: {
                    backgroundColor: '#cbe2fb'
                } 
            },{
                id: utilService.makeId(),
                type: 'NoteImg',
                isPinned: true,
                info: {
                    url: 'https://cdn.pixabay.com/photo/2017/07/21/23/41/note-2527454__340.jpg',
                    title: 'Notes & Mail...'
                },
                style: {
                    backgroundColor: '#ffffff'
                } 
            },
        ]
    }
    gNotes = notes;
    _saveNotesToStorage();
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes);
}