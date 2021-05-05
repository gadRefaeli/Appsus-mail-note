const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'
import { KeepUpdate } from '../../pages/KeepUpdate.jsx'

export function NotePreviewTxt({ note, loadNotes, setUpdateMode }) {
    return (
        <article className="note-preview" key={note.id}>
            {note.info.txt.map(line => {
                return <p>{line}</p>
            })}
            {note.isPinned && <p>PINNED</p>}
            <NavLink className="btn-update" to={`/KeepApp/${note.id}/`}>Edit</NavLink>
            {/* <Link className="btn-update" to={`/KeepApp/${note.id}/`}>Edit</Link> */}
            {/* <button className="btn-update" onClick={() => {setUpdateMode(note)}}>Edit</button> */}
            <button className="btn-remove" onClick={() => { keepService.removeNote(note.id); loadNotes() }}>Delete</button>
            
            
        </article>
    )
}