import Board from "./Board";
// import Countdown from "react-countdown";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {useRef, useState} from "react";


const Match = ({ matchData, fields, highlightSquare }) => {
    let player1 = matchData[0], player2 = matchData[1], time = matchData[2]
    const [playerTurn, setTurn] = useState({
        player1Turn: true,
        player2Turn: false
    })

    // const Completion = () => <span>Time's up!</span>;
    //
    // const renderer = ({ hours, minutes, seconds, completed }) => {
    //     if (completed) {
    //         // Render a completed state
    //         return <Completion />;
    //     } else {
    //         // Render a countdown
    //         return <span>{hours}:{minutes}:{seconds}</span>;
    //     }
    // };

    const switchTurns = () => {
        setTurn( {
            player1Turn: !playerTurn.player1Turn,
            player2Turn: !playerTurn.player2Turn
        })
    }

    const renderTime = ({ remainingTime }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const currentTime = useRef(remainingTime);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const prevTime = useRef(null);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const isNewTimeFirstTick = useRef(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [, setOneLastRerender] = useState(0);

        if (currentTime.current !== remainingTime) {
            isNewTimeFirstTick.current = true;
            prevTime.current = currentTime.current;
            currentTime.current = remainingTime;
        } else {
            isNewTimeFirstTick.current = false;
        }

        // force one last re-render when the time is over to trigger the last animation
        if (remainingTime === 0) {
            setTimeout(() => {
                setOneLastRerender(val => val + 1);
            }, 20);
        }

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60)
            const seconds = time % 60
            return (
                <div>
                    {minutes}:{String(seconds).padStart(2, '0')}
                </div>
            )
        }

        const isTimeUp = isNewTimeFirstTick.current;

        return (
            <div className="time-wrapper">
                <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
                    {formatTime(remainingTime)}
                </div>
                {prevTime.current !== null && (
                    <div
                        key={prevTime.current}
                        className={`time ${!isTimeUp ? "down" : ""}`}
                    >
                        {formatTime(prevTime.current)}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={'match'}>
            <Board fields={fields} highlightSquare={highlightSquare}/>
            <div className={'clock-container'}>
                <button className={'btnSwitch'} onClick={switchTurns}>switch</button>
                <div className={'player-info'}>
                    <div className={'center-content'}>
                        <h2>Black</h2>
                        <CountdownCircleTimer
                            size={150}
                            isPlaying={playerTurn.player2Turn}
                            duration={time*60}
                            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                        >
                            {renderTime}
                        </CountdownCircleTimer>
                    </div>
                </div>
                <div className={'player-info'}>
                    <div className={'center-content'}>
                        <h2>White</h2>
                        <CountdownCircleTimer
                            size={150}
                            isPlaying={playerTurn.player1Turn}
                            duration={time*60}
                            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                        >
                            {renderTime}
                        </CountdownCircleTimer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Match