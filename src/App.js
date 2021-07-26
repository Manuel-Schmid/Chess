import {useState} from "react";
import InitGame from "./components/InitGame";
import Header from "./components/Header";
import Match from "./components/Match";

/* running the App:
 Terminal: npm start
*/


const App = () => {
    const [formCompleted, setFormCompleted] = useState(true) // !!! wäre eigentlich 'false' !!!
    const [fields, setFields] = useState([
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
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
            <Match matchData={matchData} fields={fields}/>
        }
    </div>
  );
}


export default App;
