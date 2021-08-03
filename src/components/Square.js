import PieceIcon from "./PieceIcon";

const Square = ({ field, fieldNr, oddRow, highlightSquare, pieceSelectable, movePiece }) => {
    const isOdd = (num) => {
        return !(num % 2 === 0);
    }

    const calcColor = (oddRw, oddNr) => {
        if ( ((!oddRw) && (oddNr)) || (oddRw && !oddNr) ) { return 'light' }// false true, true false
        if ( (!oddRw && !oddNr) || (oddRw && oddNr) ) { return 'dark' }// false false, true true
    }

    const doNothing = () => {}
    const move = () => {
        console.log('move')
    }

    return (
        <div
            className={`square ${calcColor((oddRow === 'true'), isOdd(fieldNr))} ${pieceSelectable ? 'clickable':''} ${field.getHighlighted() ? 'highlighted':''} ${field.getMovable() ? 'movable':''} ${field.getMovable() && field.getPiece() !== 'empty' ? 'kill':''}`}
            onClick={field.getMovable() ? () => movePiece(field.getX(), field.getY())
                : pieceSelectable ? () => highlightSquare(field.getX(), field.getY())
                    : doNothing}>
            {/*{field.getX() + " | " + field.getY()} /!* delete this line !!!*!/*/}
            {field.getPiece() !== 'empty' &&
                <div
                    className={`icon-container ${pieceSelectable ? 'pieceSelectable' : ''}`}>
                    <PieceIcon
                        piece={field.getPiece().getName()}
                        color={field.getPiece().getColor()}/>
                </div>
            }
        </div>
    )
}

export default Square