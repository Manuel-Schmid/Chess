import Square from "./Square";

const Board = ({ fields, highlightSquare }) => {

    let oddRow = true
    const changeRow = () => {
        oddRow = !oddRow
        return oddRow
    }

    let rowKey = 0;
    let key = 1;

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
                            oddRow={`${field.getX() === 1 ?changeRow():oddRow}`}/> )
                    }
                </div>
            ))}
        </div>
    )
}


export default Board