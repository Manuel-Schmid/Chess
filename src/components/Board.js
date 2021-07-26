import Square from "./Square";

const Board = ({ fields }) => {

    let oddRow = true
    const changeRow = () => {
        oddRow = !oddRow
        return oddRow
    }

    let rowKey = 0;
    let key = 0;

    return (
        <div className="board center">
            {fields.map((innerArray) => (
                <div key={rowKey++} className={'row'}>
                    { innerArray.map((fieldNr) => <Square key={key++} fieldNr={fieldNr} oddRow={`${fieldNr === 1 ?changeRow():oddRow}`}/> )}
                </div>
            ))}
        </div>
    )
}


export default Board