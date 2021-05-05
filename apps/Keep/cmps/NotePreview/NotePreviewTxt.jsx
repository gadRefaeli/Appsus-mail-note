import { keepService } from '../../services/keep-service.js'

export function NotePreviewTxt({ note, loadNotes, setUpdateMode }) {
    return (
        <article className="note-preview" key={note.id}>
            {note.info.txt.map(line => {
                return <p>{line}</p>
            })}
            {note.isPinned && <p>PINNED</p>}
            <button className="btn-update" onClick={() => {setUpdateMode(note)}}>Edit</button>
            <button className="btn-remove" onClick={() => {keepService.removeNote(note.id); loadNotes()}}>Delete</button>
        </article>
    )
}