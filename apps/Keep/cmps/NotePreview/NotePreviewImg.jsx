import { keepService } from '../../services/keep-service.js'

export function NotePreviewImg({ note, loadNotes }) {
    return (
        <article className="note-preview" key={note.id}>
            <img src={note.info.url} />
            <p>{note.info.title}</p>
            {note.isPinned && <p>PINNED</p>}
            <button className="btn-remove" onClick={() => {keepService.removeNote(note.id); loadNotes()}}>Delete</button>
        </article>
    )
}