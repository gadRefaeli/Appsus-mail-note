export function NotePreviewImg({ note }) {
    return (
        <article className="note-preview">
            <img src={note.info.url} />
            <p>{note.info.title}</p>
            {note.isPinned && <p>PINNED</p>}
        </article>
    )
}