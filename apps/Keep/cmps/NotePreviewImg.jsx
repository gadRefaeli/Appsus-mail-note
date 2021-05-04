export function NotePreviewImg({ note }) {
    return (

        <article className="note-preview-img">
            <p>{note.info.url}</p>
            <p>{note.info.title}</p>
            {note.isPinned && <p>PINNED</p>}
        </article>
    )
}