const Square = ({ fieldNr,oddRow }) => {
    const isOdd = (num) => {
        return !(num % 2 === 0);
    }

    const calcColor = (oddRw, oddNr) => {
        if ( ((!oddRw) && (oddNr)) || (oddRw && !oddNr) ) { return 'light' }// false true, true false
        if ( (!oddRw && !oddNr) || (oddRw && oddNr) ) { return 'dark' }// false false, true true
    }

    return (
        <div className={`square ${calcColor((oddRow === 'true'), isOdd(fieldNr))}`} >
            {fieldNr}
        </div>
    )
}

export default Square