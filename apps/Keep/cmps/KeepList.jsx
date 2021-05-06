import { KeepPreview } from './KeepPreview/KeepPreview.jsx'
export function KeepList({ notes, loadNotes, setUpdateMode }) {
  return (
    <div className="keep-list">
      { notes.map(note => <KeepPreview note={note} loadNotes={loadNotes} setUpdateMode={setUpdateMode} key={note.id} />)}
    </div>
  )
}