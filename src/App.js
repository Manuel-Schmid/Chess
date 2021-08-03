import {useState} from "react";
import InitGame from "./components/InitGame";
import Header from "./components/Header";
import Match from "./components/Match";
import {Field} from "./Field";
import * as Pieces from "./Piece";

/* running the App:
 Terminal: npm start
*/


const App = () => {
    const [formCompleted, setFormCompleted] = useState(true) // !!! wäre eigentlich 'false' !!!
    const [paused, setPaused] = useState(false)
    const [hlCoords, setHlCoords] = useState({
        hX: 0,
        hY: 0
    })
    const [turn, setTurn] = useState('white')
    const [lastTurn, setLastTurn] = useState('nobody')
    // const [rerender, setRerender] = useState(false)

    const switchTurn = () => {
        let newFields
        newFields = resetLastHighlight(fields)
        setFields(resetPossibleMoveHighlights(newFields))
        if(turn !== 'nobody')
            if(turn === 'white') setTurn('black')
            else if(turn === 'black') setTurn('white')
    }

    const highLightPossibleMoves = (newFields, field, movable) => {
        const possibleMoves = field.getPiece().getMoves(newFields, field)
        for (const move of possibleMoves) {
            changeMovable(newFields, move.x, move.y, movable)
        }
    }

    const changeHighlight = (list, x, y, highlight) => {
        for(let i = 0; i < list.length; i++) {
            let fieldRow = list[i];
            for(let j = 0; j < fieldRow.length; j++) {
                if(fieldRow[j].getX() === x && fieldRow[j].getY() === y) {
                    fieldRow[j].setHighlighted(highlight)
                }
            }
        }
    }

    const changeMovable = (list, x, y, movable) => {
        for(let i = 0; i < list.length; i++) {
            let fieldRow = list[i];
            for(let j = 0; j < fieldRow.length; j++) {
                if(fieldRow[j].getX() === x && fieldRow[j].getY() === y) {
                    fieldRow[j].setMovable(movable)
                }
            }
        }
    }

    const resetLastHighlight = (newFields) => {
        if (hlCoords.hX !== 0 || hlCoords.hY !== 0) {
            changeHighlight(newFields, hlCoords.hX, hlCoords.hY, false)
        }
        return newFields
    }

    const resetPossibleMoveHighlights = (newFields) => {
        if (hlCoords.hX !== 0 || hlCoords.hY !== 0) {
            highLightPossibleMoves(newFields, getField(newFields, hlCoords.hX, hlCoords.hY), false)
        }
        return newFields
    }

    const pauseMatch = (pause) => {
        setPaused(pause)
        if (pause) { // Match pausieren
            let newFields = fields
            newFields = resetLastHighlight(newFields)
            setFields(resetPossibleMoveHighlights(newFields))
            setLastTurn(turn)
            setTurn('nobody')
        } else { // Match geht weiter
            setTurn(lastTurn)
        }
    }

    const getField = (list, x, y) => {
        for(let i = 0; i < list.length; i++) {
            let fieldRow = list[i];
            for(let j = 0; j < fieldRow.length; j++) {
                if(fieldRow[j].getX() === x && fieldRow[j].getY() === y) {
                    return fieldRow[j]
                }
            }
        }
    }

    const highlightSquare = (x, y) => {
        let newFields = fields
        resetPossibleMoveHighlights(newFields)
        if(!getField(newFields, x, y).getHighlighted()) { // not highlighted
            newFields = resetLastHighlight(newFields)
            changeHighlight(newFields, x, y, true)
            setHlCoords({
                hX: x,
                hY: y
            })
            // highlight possible fields
            highLightPossibleMoves(newFields, getField(newFields, x, y), true)

        } else {
            changeHighlight(newFields, x, y, false) // already highlighted
            setHlCoords({
                hX: 0,
                hY: 0
            })
            // un-highlight possible fields
            // for (const field of possibleMoveFields) {
            //     changeHighlight(newFields, field.getX(), field.getY(), false)
            // }
        }

        setFields(newFields)
    }

    const [fields, setFields] = useState([
        [
            new Field(1, 1, new Pieces.Rook('black', 'Rook')),
            new Field(2, 1, new Pieces.Knight('black', 'Knight')),
            new Field(3, 1, new Pieces.Bishop('black', 'Bishop')),
            new Field(4, 1, new Pieces.Queen('black', 'Queen')),
            new Field(5, 1, new Pieces.King('black', 'King')),
            new Field(6, 1, new Pieces.Bishop('black', 'Bishop')),
            new Field(7, 1, new Pieces.Knight('black', 'Knight')),
            new Field(8, 1, new Pieces.Rook('black', 'Rook')),
        ],
        [
            new Field(1, 2, new Pieces.Pawn('black', 'Pawn')),
            new Field(2, 2, new Pieces.Pawn('black', 'Pawn')),
            new Field(3, 2, new Pieces.Pawn('black', 'Pawn')),
            new Field(4, 2, new Pieces.Pawn('black', 'Pawn')),
            new Field(5, 2, new Pieces.Pawn('black', 'Pawn')),
            new Field(6, 2, new Pieces.Pawn('black', 'Pawn')),
            new Field(7, 2, new Pieces.Pawn('black', 'Pawn')),
            new Field(8, 2, new Pieces.Pawn('black', 'Pawn')),
        ],
        [
            new Field(1, 3, 'empty'),
            new Field(2, 3, 'empty'),
            new Field(3, 3, 'empty'),
            new Field(4, 3, 'empty'),
            new Field(5, 3, 'empty'),
            new Field(6, 3, 'empty'),
            new Field(7, 3, 'empty'),
            new Field(8, 3, 'empty'),
        ],
        [
            new Field(1, 4, 'empty'),
            new Field(2, 4, 'empty'),
            new Field(3, 4, 'empty'),
            new Field(4, 4, 'empty'),
            new Field(5, 4, 'empty'),
            new Field(6, 4, 'empty'),
            new Field(7, 4, 'empty'),
            new Field(8, 4, 'empty'),
        ],
        [
            new Field(1, 5, 'empty'),
            new Field(2, 5, 'empty'),
            // new Field(3, 5, 'empty'),
            new Field(3, 5, new Pieces.Rook('white', 'Rook')),

            new Field(4, 5, 'empty'),
            new Field(5, 5, 'empty'),
            new Field(6, 5, 'empty'),
            new Field(7, 5, 'empty'),
            new Field(8, 5, 'empty'),
        ],
        [
            new Field(1, 6, 'empty'),
            new Field(2, 6, 'empty'),
            new Field(3, 6, 'empty'),
            new Field(4, 6, 'empty'),
            // new Field(5, 6, 'empty'),
            new Field(5, 6, new Pieces.Pawn('black', 'Pawn')),
            new Field(6, 6, 'empty'),
            // new Field(7, 6, 'empty'),
            new Field(7, 6, new Pieces.Pawn('black', 'Pawn')),
            new Field(8, 6, 'empty'),
        ],
        [
            // new Field(1, 7, new Pieces.Pawn('white', 'Pawn')),
            new Field(1, 7, 'empty'), // delete this line
            new Field(2, 7, 'empty'), // delete this line
            new Field(3, 7, 'empty'), // delete this line
            new Field(4, 7, 'empty'), // delete this line
            new Field(5, 7, 'empty'), // delete this line
            new Field(6, 7, new Pieces.Pawn('white', 'Pawn')),
            new Field(7, 7, new Pieces.Pawn('white', 'Pawn')),
            new Field(8, 7, new Pieces.Pawn('white', 'Pawn')),
        ],
        [
            new Field(1, 8, new Pieces.Rook('white', 'Rook')),
            new Field(2, 8, new Pieces.Knight('white', 'Knight')),
            new Field(3, 8, new Pieces.Bishop('white', 'Bishop')),
            new Field(4, 8, new Pieces.Queen('white', 'Queen')),
            new Field(5, 8, new Pieces.King('white', 'King')),
            new Field(6, 8, new Pieces.Bishop('white', 'Bishop')),
            new Field(7, 8, new Pieces.Knight('white', 'Knight')),
            new Field(8, 8, new Pieces.Rook('white', 'Rook')),
        ],
    ])

    let player1 = 'Manuel', player2 = 'Fabian', time = '60'
    let matchData = []
    matchData.push(player1, player2, time)

    const initMatch = (user1, user2, duration) => {
        player1 = user1
        player2 = user2
        time = duration
        matchData.push(player1, player2, time)
        console.log(matchData)
    }

    return (
    <div className="App">
        <Header formCompleted={formCompleted}/>
        { !formCompleted && // Form
            <InitGame onCompleted={() => setFormCompleted(true)} initMatch={initMatch}/>
        }
        { formCompleted &&
            <Match
                matchData={matchData}
                fields={fields}
                highlightSquare={highlightSquare}
                paused={paused}
                pauseMatch={pauseMatch}
                turn={turn}
                switchTurn={switchTurn}
            />
        }
    </div>
  );
}


export default App;
