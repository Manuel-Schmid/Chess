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
    const [hlCoords, setHlCoords] = useState({
        hX: 0,
        hY: 0
    })
    // const [rerender, setRerender] = useState(false)

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
        if(!getField(newFields, x, y).getHighlighted()) { // not highlighted
            console.log('not highlighted')
            if (hlCoords.hX !== 0 || hlCoords.hY !== 0) {
                changeHighlight(newFields, hlCoords.hX, hlCoords.hY, false)
            }
            changeHighlight(newFields, x, y, true)
            setHlCoords({
                hX: x,
                hY: y
            })
        } else {
            console.log('already highlighted')
            changeHighlight(newFields, x, y, false) // already highlighted
            setHlCoords({
                hX: 0,
                hY: 0
            })
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
            new Field(5, 8, new Pieces.King('white', 'Queen')),
            new Field(6, 8, new Pieces.Bishop('white', 'Bishop')),
            new Field(7, 8, new Pieces.Knight('white', 'Knight')),
            new Field(8, 8, new Pieces.Rook('white', 'Rook')),
        ],
    ])

    let player1 = 'Manuel', player2 = 'Fabian', time = '200'
    let matchData = []
    matchData.push(player1, player2, time)
    // const [board, setBoard] = useState([]) // initial state, change would be made with 'setTasks()'

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
            <Match matchData={matchData} fields={fields} highlightSquare={highlightSquare}/>
        }
    </div>
  );
}


export default App;
