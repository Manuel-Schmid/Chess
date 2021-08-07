import {useState} from "react";
import InitGame from "./components/InitGame";
import Header from "./components/Header";
import Match from "./components/Match";
import {Field} from "./Field";
import * as Pieces from "./Piece";
import Victory from "./components/Victory";
import PromotionSelection from "./components/PromotionSelection";

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
    const [matchData, setMatchData] = useState(['White', 'Black', '100'])
    const [formCompleted, setFormCompleted] = useState(false) // !!! wäre eigentlich 'false' !!!
    const [victor, setVictor] = useState('nobody')
    const [paused, setPaused] = useState(false)
    const [started, setStarted] = useState(false)
    const [fieldToPromote, setFieldToPromote] = useState({ x: 0, y: 0, color: 'none' })
    const [hlCoords, setHlCoords] = useState({ hX: 0, hY: 0 })
    const [possibleMoveCounts, setPossibleMoveCounts] = useState({ white: 20, black: 20 })
    const [turn, setTurn] = useState('nobody')
    const [lastTurn, setLastTurn] = useState('nobody')
    const [deadPieces, setDeadPieces] = useState([[], []])
    // const [rerender, setRerender] = useState(false) // not optimal

    const resetEverything = () => {
        window.location.reload();
        // setFields(initialFieldState)
        // setMatchData(['White', 'Black', '100'])
        setFormCompleted(false)
        setVictor('nobody')
        // setPaused(false)
        // setStarted(false)
        // setFieldToPromote({ x: 0, y: 0, color: 'none' })
        // setHlCoords({ x: 0, y: 0, color: 'none' })
        // setPossibleMoveCounts({ white: 20, black: 20 })
        // setTurn('nobody')
        // setLastTurn('nobody')
        // setDeadPieces([[], []])
        // setRerender(false)
    }

    const switchTurn = () => {
        if(turn !== 'nobody') {
            if (turn === 'white') setTurn('black')
            else if (turn === 'black') setTurn('white')
        }
    }

    const highLightPossibleMoves = (newFields, field, movable) => {
        let possibleMoves
        if (field.getPiece().getName() === 'King') possibleMoves = field.getPiece().getMoves(newFields, field, true)
        else possibleMoves = field.getPiece().getMoves(newFields, field)
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
                    if (movingPiece.getName() === 'Pawn') handleSpecialMoves(fieldRow[j], toX, toY)
                }
            }
        }

        // bare king rules trigger a draw
        if (deadPieces[0].length === 15 && deadPieces[1].length === 15) defineVictor('draw')
        if (deadPieces[0].length + deadPieces[1].length === 29) { // only 3 pieces left alive
            for(let i = 0; i < newFields.length; i++) {
                let fieldRow = newFields[i];
                for(let j = 0; j < fieldRow.length; j++) {
                    if (fieldRow[j].getPiece() !== 'empty' ) {
                        if (fieldRow[j].getPiece().getName() === 'Bishop' || fieldRow[j].getPiece().getName() === 'Knight') {
                            defineVictor('draw')
                            break;
                        }
                    }
                }
            }
        }

        // update possible-move-count
        let newPossibleMoveCounts = possibleMoveCounts
        newPossibleMoveCounts.white = new Pieces.Pawn('white', 'Pawn').getPossibleEnemyMovesCount(newFields, 'black')
        newPossibleMoveCounts.black = new Pieces.Pawn('white', 'Pawn').getPossibleEnemyMovesCount(newFields, 'white')
        setPossibleMoveCounts(newPossibleMoveCounts)

        // check if no move is possible (stalemate)
        if (possibleMoveCounts.white === 0) defineVictor('white')
        else if (possibleMoveCounts.black === 0) defineVictor('black')

        // update fields
        setFields(newFields)
        switchTurn()
    }

    const handleSpecialMoves = (field, toX, toY) => {
        let movingPiece = field.getPiece()
        // first move
        if (movingPiece.getFirstMove()) movingPiece.setFirstMove(false)
        // promotion
        if (toY === 1 && movingPiece.getColor() === 'white') showPromotionSelection(movingPiece, toX, toY)
        else if (toY === 8 && movingPiece.getColor() === 'black') showPromotionSelection(movingPiece, toX, toY)
    }

    const showPromotionSelection = (movingPiece, x, y) => {
        freezeGame()
        setFieldToPromote({ x: x, y: y, color: movingPiece.getColor() })
    }

    const promotePawn = (piece) => {
        let newFields = fields
        for(let i = 0; i < newFields.length; i++) {
            let fieldRow = newFields[i];
            for(let j = 0; j < fieldRow.length; j++) {
                if(fieldRow[j].getX() === fieldToPromote.x && fieldRow[j].getY() === fieldToPromote.y) {
                    fieldRow[j] = new Field(fieldToPromote.x, fieldToPromote.y, piece)
                }
            }
        }
        setFields(newFields)
        setFieldToPromote({ x: 0, y: 0, color: 'none' })
        setPaused(false)
    }
    
    const manageKilledPiece = (killedPiece) => {
        if (killedPiece !== 'empty') {
            let newDeadPieces = deadPieces
            if (killedPiece.getColor() === 'black') deadPieces[0].push(killedPiece)
            else deadPieces[1].push(killedPiece)
            setDeadPieces(newDeadPieces)
            if (killedPiece.getName() === 'King') defineVictor(killedPiece.getColor())
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
            if (turn !== 'nobody') setLastTurn(turn)
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
        let newMatchData = []
        newMatchData.push(user1, user2, duration)
        setMatchData(newMatchData)
        setFormCompleted(true)
    }

    const startGame = () => {
        if (!started) {// start game
            setTurn('white')
            setStarted(true)
        }
        else {
            resetEverything()
        } // end game
    }

    const freezeGame = () => {
        for(let i = 0; i < fields.length; i++) {
            let fieldRow = fields[i];
            for(let j = 0; j < fieldRow.length; j++) {
                fieldRow[j].setMovable(false)
                fieldRow[j].setHighlighted(false)
            }
        }
        setPaused(true)
    }

    const defineVictor = (loser) => {
        freezeGame()
        let victor
        if(loser === 'draw') victor = 'draw'
        else if(loser === 'white') victor = matchData[1]
        else if(loser === 'black') victor = matchData[0]
        setVictor(victor)
    }

    return (
    <div className="App">
        <Header left={formCompleted}/>
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
                showButtons={victor === 'nobody' && started}
                paused={paused}
                pauseMatch={pauseMatch}
                possibleMoveCount={possibleMoveCounts}
                turn={turn}
                movePiece={movePiece}
                deadPieces={deadPieces}
                defineVictor={defineVictor}
            />
        }
        {victor !== 'nobody' &&
            <Victory victor={victor}/>
        }
        {victor === 'nobody' && (fieldToPromote.x !== 0 || fieldToPromote.y !== 0 || fieldToPromote.color !== 'none') &&
            <PromotionSelection promotePawn={promotePawn} pieceColor={fieldToPromote.color} />
        }
    </div>
  );
}


export default App;
