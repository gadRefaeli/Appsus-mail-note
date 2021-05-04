import { NotePreview } from './NotePreview.jsx'
export function NoteList({ notes, loadNotes }) {
  return (
    <div className="note-list">
      { notes.map(note => <NotePreview note={note} loadNotes={loadNotes} key={note.id} />)}
    </div>
  )
}