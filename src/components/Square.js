import PieceIcon from "./PieceIcon";

const Square = ({ field, fieldNr, oddRow, highlightSquare, pieceSelectable, movePiece, resigned }) => {
    const isOdd = (num) => {
        return !(num % 2 === 0);
    }

    const doNothing = () => {}

    const calcColor = (oddRw, oddNr) => {
        if ( ((!oddRw) && (oddNr)) || (oddRw && !oddNr) ) { return 'light' }
        if ( (!oddRw && !oddNr) || (oddRw && oddNr) ) { return 'dark' }
    }

    return (
        <div
            className={`square ${calcColor((oddRow === 'true'), isOdd(fieldNr))} ${pieceSelectable ? 'clickable':''} ${field.getInCheck() ? 'inCheck':''} ${field.getMovable() ? 'movable':''}`}
            id={`${field.getHighlighted() ? 'highlighted':''}`}
            onClick={field.getMovable() ? () => movePiece(field.getX(), field.getY())
                : pieceSelectable ? () => highlightSquare(field.getX(), field.getY())
                    : doNothing}>
            {/*{field.getX() + "|" + field.getY()} /!* comment this out !!! *!/*/}
            {field.getMovable() &&
                <span className={`dot ${field.getMovable() && field.getPiece() !== 'empty' ? 'kill' : ''}`} />
            }
            {field.getPiece() !== 'empty' &&
                <div
                    className={`icon-container ${pieceSelectable ? 'pieceSelectable' : ''} ${resigned ? 'rotate' : ''}`}>
                    <PieceIcon
                        piece={field.getPiece().getName()}
                        color={field.getPiece().getColor()}/>
                </div>
            }
        </div>
    )
}

export default Square