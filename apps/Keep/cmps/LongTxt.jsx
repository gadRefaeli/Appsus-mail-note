export function LongTxt({ txt, isReadMore, toggleRead }) {

    let gTxt = txt
    
    if (txt.length > 4) {
        gTxt = (isReadMore) ? txt : txt.slice(0, 4)
    }
    
    gTxt = gTxt.map((line, idx) => {
        return <p key={idx}>{line}{(!isReadMore && txt.length > 4 && idx === 3)? '...' : ''}</p>
    })

    return (
        <span>
            <span>{gTxt}</span><br />
            {txt.length > 4 && <button onClick={toggleRead}>{(isReadMore) ? 'Read less' : 'Read More'}</button>}
        </span >
    )

}

