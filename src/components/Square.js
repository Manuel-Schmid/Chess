import PieceIcon from "./PieceIcon";

const Square = ({ field, fieldNr, oddRow, highlightSquare, clickable }) => {
    const isOdd = (num) => {
        return !(num % 2 === 0);
    }

    const calcColor = (oddRw, oddNr) => {
        if ( ((!oddRw) && (oddNr)) || (oddRw && !oddNr) ) { return 'light' }// false true, true false
        if ( (!oddRw && !oddNr) || (oddRw && oddNr) ) { return 'dark' }// false false, true true
    }

    const empty = () => {}

    return (
        <div
            className={`square ${calcColor((oddRow === 'true'), isOdd(fieldNr))} ${field.getHighlighted() ? 'highlighted':''}`} >
            {field.getX() + " | " + field.getY()} {/* delete this line !!!*/}
            { field.getPiece() !== 'empty' &&
                <div
                    className={`icon-container ${clickable ? 'clickable' : ''}`}
                    onClick={clickable ? () => highlightSquare(field.getX(), field.getY()) : empty}>
                    <PieceIcon
                        piece={field.getPiece().getName()}
                        color={field.getPiece().getColor()}/>
                </div>
            }
        </div>
    )
}

export default Square