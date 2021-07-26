import Board from "./Board";

const Match = ({ matchData, fields, highlightSquare }) => {
    let player1 = matchData[0], player2 = matchData[1], time = matchData[2]

    return (
        <div>
            <Board fields={fields} highlightSquare={highlightSquare}/>
        </div>
    )
}

export default Match