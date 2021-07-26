import Board from "./Board";

const Match = ({ matchData, fields }) => {
    let player1 = matchData[0], player2 = matchData[1], time = matchData[2]

    return (
        <div>
            <Board fields={fields}/>
        </div>
    )
}

export default Match