export function LongTodos({ txt, isReadMore, toggleRead, currTxt, handleInputChange }) {

    let gTxt = txt
    
    if (txt.length > 4) {
        gTxt = (isReadMore) ? txt : txt.slice(1, 5)
    }
    
    gTxt = gTxt.map((line, idx) => {
        return <p key={line.id}><input type="checkbox" id={line.id} name={line.id} checked={currTxt[line.id]} onChange={handleInputChange} />
            <label htmlFor={line.id}>{' ' + line.str}{(!isReadMore && txt.length > 4 && idx === 3)? '...' : ''}</label></p>
    })

    return (
        <span>
            <span>{gTxt}</span><br />
            {txt.length > 4 && <button onClick={toggleRead}>{(isReadMore) ? 'Read less' : 'Read More'}</button>}
        </span >
    )

}

