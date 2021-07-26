import PieceIcon from "./PieceIcon";

const Square = ({ field, fieldNr, oddRow, highlightSquare }) => {
    const isOdd = (num) => {
        return !(num % 2 === 0);
    }

    const calcColor = (oddRw, oddNr) => {
        if ( ((!oddRw) && (oddNr)) || (oddRw && !oddNr) ) { return 'light' }// false true, true false
        if ( (!oddRw && !oddNr) || (oddRw && oddNr) ) { return 'dark' }// false false, true true
    }

    return (
        <div
            className={`square ${calcColor((oddRow === 'true'), isOdd(fieldNr))} ${field.getHighlighted() ? 'highlighted':''}`} >
            { field.getPiece() !== 'empty' &&
                <div className={'icon-container'} onClick={() => highlightSquare(field.getX(), field.getY())}>
                    <PieceIcon
                        piece={field.getPiece().getName()}
                        color={field.getPiece().getColor()}/>
                </div>
            }
        </div>
    )
}

export default Square