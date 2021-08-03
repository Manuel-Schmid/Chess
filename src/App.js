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

    const initialFieldState =
        [
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
                new Field(3, 5, 'empty'),
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
                new Field(5, 6, 'empty'),
                new Field(6, 6, 'empty'),
                new Field(7, 6, 'empty'),
                new Field(8, 6, 'empty'),
            ],
            [
                new Field(1, 7, new Pieces.Pawn('white', 'Pawn')),
                new Field(2, 7, new Pieces.Pawn('white', 'Pawn')),
                new Field(3, 7, new Pieces.Pawn('white', 'Pawn')),
                new Field(4, 7, new Pieces.Pawn('white', 'Pawn')),
                new Field(5, 7, new Pieces.Pawn('white', 'Pawn')),
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
        ]

    const [fields, setFields] = useState(initialFieldState)
    const [matchData, setMatchData] = useState(['White', 'Black', '360'])
    const [formCompleted, setFormCompleted] = useState(true) // !!! wäre eigentlich 'false' !!!
    const [paused, setPaused] = useState(false)
    const [started, setStarted] = useState(false)
    const [hlCoords, setHlCoords] = useState({ hX: 0, hY: 0 })
    const [turn, setTurn] = useState('white')
    const [lastTurn, setLastTurn] = useState('nobody')
    const [deadPieces, setDeadPieces] = useState([[], []])
    const [rerender, setRerender] = useState(false) // not optimal

    const resetEverything = () => {
        setFields(initialFieldState)
        setMatchData(['White', 'Black', '360'])
        setFormCompleted(false)
        setPaused(false)
        setStarted(false)
        setHlCoords({ hX: 0, hY: 0 })
        setTurn('white')
        setLastTurn('nobody')
        setDeadPieces([[], []])
        setRerender(false)
    }

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

    const movePiece = (toX, toY) => {
        const fromX = hlCoords.hX
        const fromY = hlCoords.hY

        let newFields = fields
        let movingPiece
        let killedPiece

        // reset highlights
        newFields = resetLastHighlight(newFields)
        newFields = resetPossibleMoveHighlights(newFields)
        setHlCoords({
            hX: 0,
            hY: 0
        })

        for(let i = 0; i < newFields.length; i++) {
            let fieldRow = newFields[i];
            for(let j = 0; j < fieldRow.length; j++) {
                if(fieldRow[j].getX() === fromX && fieldRow[j].getY() === fromY) {
                    movingPiece = fieldRow[j].getPiece()
                    if (movingPiece.getName() === 'Pawn' && movingPiece.getFirstMove()) movingPiece.setFirstMove(false)
                    fieldRow[j].setPiece('empty')
                }
            }
        }
        for(let i = 0; i < newFields.length; i++) {
            let fieldRow = newFields[i];
            for(let j = 0; j < fieldRow.length; j++) {
                if(fieldRow[j].getX() === toX && fieldRow[j].getY() === toY) {
                    killedPiece = fieldRow[j].getPiece()
                    manageKilledPiece(killedPiece)
                    fieldRow[j].setPiece(movingPiece)
                }
            }
        }

        // update fields
        setFields(newFields)
        setRerender(!rerender)
    }

    const manageKilledPiece = (killedPiece) => {
        if (killedPiece !== 'empty') {
            let newDeadPieces = deadPieces
            if (killedPiece.getColor() === 'black') deadPieces[0].push(killedPiece)
            else deadPieces[1].push(killedPiece)
            setDeadPieces(newDeadPieces)
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
        }

        setFields(newFields)
    }

    const initMatch = (user1, user2, duration) => {
        console.log(matchData)
        let newMatchData = []
        newMatchData.push(user1, user2, duration)
        setMatchData(newMatchData)
        setFormCompleted(true)
    }

    const startGame = () => {
        if (!started) setStarted(true) // start game
        else resetEverything() // end game
    }

    return (
    <div className="App">
        <Header formCompleted={formCompleted}/>
        { !formCompleted && // Form
            <InitGame initMatch={initMatch}/>
        }
        { formCompleted &&
            <Match
                matchData={matchData}
                startGame={startGame}
                started={started}
                fields={fields}
                highlightSquare={highlightSquare}
                paused={paused}
                pauseMatch={pauseMatch}
                turn={turn}
                switchTurn={switchTurn}
                movePiece={movePiece}
                deadPieces={deadPieces}
            />
        }
    </div>
  );
}


export default App;
