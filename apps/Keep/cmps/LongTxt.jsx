export function LongTxt({ txt, isReadMore, toggleRead }) {

    let gTxt = txt
    
    if (txt.length > 4) {
        gTxt = (isReadMore) ? txt : txt.slice(0, 4)
    }
    
    gTxt = gTxt.map((line, idx) => {
        return <span key={idx}>{line}{(!isReadMore && txt.length > 4 && idx === 3)? '...' : ''}</span>
    })

    return (
        <span>
            <span>{gTxt}
            {txt.length > 4 && <span onClick={toggleRead}>{(isReadMore) ? ' [Read less]' : ' [Read More]'}</span>}
            <p></p>
            <br/>
            </span>
        </span >
    )

}

