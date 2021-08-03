import Board from "./Board";
// import Countdown from "react-countdown";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {useRef, useState} from "react";
import PieceIcon from "./PieceIcon";


const Match = ({ matchData, startGame, started, fields, highlightSquare, showPause, paused, pauseMatch, turn, movePiece, deadPieces }) => {
    let player1 = matchData[0], player2 = matchData[1], time = matchData[2]

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
                {(time <= 10) &&
                    prevTime.current !== null && (
                    <div
                        key={prevTime.current}
                        className={`time ${!isTimeUp ? "down" : ""}`}>
                        {formatTime(prevTime.current)}
                    </div>
                )}
            </div>
        );
    }

    const pause = () => {
        pauseMatch(!paused)
    }

    let key = 0;

    return (
        <div className={'match'}>
            <div className={'death-container'}>
                <div className={'death-pool player-info'}>
                    <div className={'dead-pieces-container top'}>
                        {deadPieces[0].map((piece) => (
                            <PieceIcon key={key++} piece={piece.getName()} color={piece.getColor()}/>
                        ))}
                    </div>
                </div>
                <button className={`big-btn start-btn ${started ? 'started' : ''}`} onClick={() => startGame()}>{!started ? 'Start' : 'End Game'}</button>
                <div className={'death-pool player-info'}>
                    <div className={'dead-pieces-container bottom'}>
                        {deadPieces[1].map((piece) => (
                            <PieceIcon key={key++} piece={piece.getName()} color={piece.getColor()}/>
                        ))}
                    </div>
                </div>
            </div>
            <Board fields={fields} highlightSquare={highlightSquare} turn={turn} movePiece={movePiece} />
            <div className={'clock-container'}>
                <div className={'player-info'}>
                    <div className={'center-content'}>
                        <h2>{player2}</h2>
                        <CountdownCircleTimer
                            size={150}
                            isPlaying={(started) && (turn === 'black') && (!paused)}
                            duration={time*60}
                            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                        >
                            {renderTime}
                        </CountdownCircleTimer>
                    </div>
                </div>
                <button onClick={pause} className={`pause-btn big-btn ${!showPause ? 'hidden' : ''} ${paused ? 'paused-btn' : ''}`}>{paused ? 'unpause' : 'pause'}</button>
                <div className={'player-info'}>
                    <div className={'center-content'}>
                        <h2>{player1}</h2>
                        <CountdownCircleTimer
                            size={150}
                            isPlaying={(started) && (turn === 'white') && (!paused)}
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