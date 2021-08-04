import Square from "./Square";

const Board = ({ fields, highlightSquare, turn, paused, movePiece }) => {

    let oddRow = true
    const changeRow = () => {
        oddRow = !oddRow
        return oddRow
    }

    let rowKey = 0;
    let key = 1;

    const getPieceSelectable = (field) => {
        if (field.getPiece() !== 'empty') {
            return field.getPiece().getColor() === turn && !paused
        }
        return false
    }

    return (
        <div className="board">
            {fields.map((innerArray) => (
                <div key={rowKey++} className={'row'}>
                    { innerArray.map((field) =>
                        <Square
                            key={key++}
                            field={field}
                            fieldNr={field.getX()}
                            highlightSquare={highlightSquare}
                            oddRow={`${field.getX() === 1 ?changeRow():oddRow}`}
                            pieceSelectable={getPieceSelectable(field)}
                            movePiece={movePiece}
                        /> )
                    }
                </div>
            ))}
        </div>
    )
}


export default Board