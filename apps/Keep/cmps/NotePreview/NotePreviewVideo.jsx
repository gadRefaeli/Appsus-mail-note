import { keepService } from '../../services/keep-service.js'

export function NotePreviewVideo({ note, loadNotes }) {
    return (
        <article className="note-preview" key={note.id}>
            <div className="video-player-container">
                <iframe width="240" height="180" src={note.info.url}>
                </iframe>
            </div>
            <p>{note.info.title}</p>
            {note.isPinned && <p>PINNED</p>}
            <button className="btn-remove" onClick={() => {keepService.removeNote(note.id); loadNotes()}}>Delete</button>
        </article>
    )
}

// https://www.youtube.com/embed/07pzfamaI9E