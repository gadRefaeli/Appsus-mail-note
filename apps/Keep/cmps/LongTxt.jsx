export function LongTxt({ txt, isReadMore, toggleRead }) {


    if (txt.length > 100) {
        txt = (isReadMore) ? txt : txt.substring(0, 100) + '...'
    }
    
    return (
        <span>
            <span>{txt}</span><br />
            {txt.length > 100 && <button onClick={toggleRead}>{(isReadMore) ? 'Read less' : 'Read More'}</button>}
        </span >
    )

}