export function LongTxt({ txt, isReadMore, toggleRead }) {

    let currTxt = txt

    if (txt.length > 4) {
        currTxt = (isReadMore) ? txt : txt.slice(1, 5)
        if (isReadMore) txt[3] += '...'
    }
    
    currTxt = currTxt.map(line => {
        console.log(line)
        return <p>{line}</p>
    })

    return (
        <span>
            <span>{currTxt}</span><br />
            {txt.length > 4 && <button onClick={toggleRead}>{(isReadMore) ? 'Read less' : 'Read More'}</button>}
        </span >
    )

}

