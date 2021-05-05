import { NotePreview } from './NotePreview/NotePreview.jsx'
export function NoteList({ notes, loadNotes, setUpdateMode }) {
  return (
    <div className="note-list">
      { notes.map(note => <NotePreview note={note} loadNotes={loadNotes} setUpdateMode={setUpdateMode} key={note.id} />)}
    </div>
  )
}