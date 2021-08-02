import Board from "./Board";
// import Countdown from "react-countdown";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {useRef, useState} from "react";


const Match = ({ matchData, fields, highlightSquare, paused, pauseMatch, turn, switchTurn }) => {
    let player1 = matchData[0], player2 = matchData[1], time = matchData[2]

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
                {/*{prevTime.current !== null && (*/}
                {/*    <div*/}
                {/*        key={prevTime.current}*/}
                {/*        className={`time ${!isTimeUp ? "down" : ""}`}*/}
                {/*    >*/}
                {/*        {formatTime(prevTime.current)}*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        );
    }

    const pause = () => {
        pauseMatch(!paused)
    }

    return (
        <div className={'match'}>
            <button className={'switchBtn'} onClick={() => switchTurn()}>switch turns</button>  {/* only temporary button !!!*/}
            <Board fields={fields} highlightSquare={highlightSquare} turn={turn}/>
            <div className={'clock-container'}>
                <div className={'player-info'}>
                    <div className={'center-content'}>
                        <h2>Black</h2>
                        <CountdownCircleTimer
                            size={150}
                            isPlaying={(turn === 'black') && (paused === false)}
                            duration={time*60}
                            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                        >
                            {renderTime}
                        </CountdownCircleTimer>
                    </div>
                </div>
                <button onClick={pause} className={'pause-btn'}>{paused ? 'unpause' : 'pause'}</button>
                <div className={'player-info'}>
                    <div className={'center-content'}>
                        <h2>White</h2>
                        <CountdownCircleTimer
                            size={150}
                            isPlaying={(turn === 'white') && (paused === false)}
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