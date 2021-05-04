import { keepService } from '../services/keep-service.js'

export function NotePreviewTxt({ note, loadNotes }) {
    return (
        <article className="note-preview">
            <p>{note.info.txt}</p>
            {note.isPinned && <p>PINNED</p>}
            <button className="btn-remove" onClick={() => {keepService.removeNote(note.id); loadNotes()}}>Delete</button>
        </article>
    )
}