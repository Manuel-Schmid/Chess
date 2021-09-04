import Board from "./Board";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {useRef, useState} from "react";
import PieceIcon from "./PieceIcon";
import MatchInteraction from "./MatchInteraction";
import { FaPause, FaPlay } from "react-icons/fa";

const Match = ({ matchData, language, startGame, started, fields, highlightSquare, showButtons, paused, pauseMatch, touchMoveTouched, turn, possibleMoveCount, movePiece, deadPieces, defineVictor }) => {
    let player1 = matchData[0], player2 = matchData[1], time = matchData[2]
    const [showMatchInteraction, setShowMatchInteraction] = useState(false)
    const [showClockTime, setShowClockTime] = useState(true)
    const [resignedColor, setResignedColor] = useState('none')

    const onClockClick = () => {
        setShowClockTime(!showClockTime)
    }

    const renderTime = ({ remainingTime }) => {
        const currentTime = useRef(remainingTime);
        const prevTime = useRef(null);
        const isNewTimeFirstTick = useRef(false);
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
            <div className={`time-wrapper ${showClockTime ? '' : 'hidden'}`}>
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

    const crownVictor = (loser, resignation) => {
        defineVictor(loser)
        if (resignation) {
            setResignedColor(loser)
        }
    }

    const pause = () => {
        pauseMatch(!paused)
    }

    let key = 0;

    return (
        <div className={'match'}>
            <div className={'move-count-container move-count-container-top'}>
                <p>{language === 'english' ? 'Possible Moves: ' : 'Mögliche Spielzüge: '}<b>{possibleMoveCount.black}</b></p>
            </div>
            <div className={'move-count-container move-count-container-bottom'}>
                <p>{language === 'english' ? 'Possible Moves: ' : 'Mögliche Spielzüge: '}<b>{possibleMoveCount.white}</b></p>
            </div>
            <div className={'death-container'}>
                <div className={'death-pool player-info'}>
                    <div className={'dead-pieces-container top'}>
                        {deadPieces[0].map((piece) => (
                            <PieceIcon key={key++} piece={piece.getName()} color={piece.getColor()}/>
                        ))}
                    </div>
                </div>
                <button className={`big-btn button-2 start-btn ${started ? 'started' : 'not-started'}`} onClick={() => startGame()}>{!started ? 'Start' : `${language === 'english' ? 'End Game' : 'Spiel beenden'}`}</button>
                <div className={'death-pool player-info'}>
                    <div className={'dead-pieces-container bottom'}>
                        {deadPieces[1].map((piece) => (
                            <PieceIcon key={key++} piece={piece.getName()} color={piece.getColor()}/>
                        ))}
                    </div>
                </div>
            </div>
            <Board fields={fields} highlightSquare={highlightSquare} turn={turn} touchMoveTouched={touchMoveTouched} paused={paused} movePiece={movePiece} resignedColor={resignedColor} />
            <div className={`clock-container ${showMatchInteraction ? '' : 'front'}`}>
                <div className={'player-info'}>
                    <div className={'center-content'}>
                        <h2>{player2}</h2>
                        <div className={'clock clickable'} onClick={() => onClockClick()}>
                            <CountdownCircleTimer
                                onComplete={() => defineVictor('black')}
                                size={150}
                                isPlaying={(started) && (turn === 'black') && (!paused)}
                                duration={time*60}
                                colors={[["#191343", 0.33], ["#F7B801", 0.33], ["#dc143c"]]}
                            >
                                {renderTime}
                            </CountdownCircleTimer>
                        </div>
                    </div>
                </div>
                <button onClick={pause} className={`button-2 pause-btn big-btn ${!showButtons ? 'hidden' : ''} ${paused ? 'paused-btn' : 'not-paused-btn'}`}>{paused ? <FaPlay className={`pause-icon`} /> : <FaPause className={`pause-icon`} />}</button>
                <div className={'player-info'}>
                    <div className={'center-content'}>
                        <h2>{player1}</h2>
                        <div className={'clock clickable'} onClick={() => onClockClick()}>
                            <CountdownCircleTimer
                                onComplete={() => defineVictor('white')}
                                size={150}
                                isPlaying={(started) && (turn === 'white') && (!paused)}
                                duration={time*60}
                                colors={[["#191343", 0.33], ["#F7B801", 0.33], ["#dc143c"]]} // 004777 191343
                            >
                                {renderTime}
                            </CountdownCircleTimer>
                        </div>
                    </div>
                </div>
            </div>
            <MatchInteraction
                started={started}
                showButtons={showButtons}
                showMatchInteraction={showMatchInteraction}
                language={language}
                setShowMatchInteraction={setShowMatchInteraction}
                pauseMatch={pauseMatch}
                defineVictor={crownVictor}
            />
        </div>
    )
}

export default Match