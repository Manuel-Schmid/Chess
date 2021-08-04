import {AiFillSetting} from "react-icons/all";

const MatchInteraction = ({ started, showButtons, showMatchInteraction, setShowMatchInteraction, pauseMatch, defineVictor }) => {
    const onSettingsClick = () => {
        if (!showMatchInteraction) pauseMatch(true)
        else pauseMatch(false)
        setShowMatchInteraction(!showMatchInteraction)
    }

    const handleInteraction = (interaction) => {
        switch (interaction) {
            case 'black-resign' :
                defineVictor('black')
                break;
            case 'white-resign' :
                defineVictor('white')
                break;
            case 'draw' :
                defineVictor('draw')
                break;
            default:
                break;
        }

    }

    return (
        <div className={'interaction-container'}>
            <div className={'player-info'}>
                <div className={'center-content width-auto'}>
                    <button
                        onClick={() => handleInteraction('black-resign')}
                        className={`pause-btn big-btn ${!showButtons ? 'hidden' : ''}`}>
                        Black resigns
                    </button>
                </div>
            </div>
            <button
                onClick={() => handleInteraction('draw')}
                className={`pause-btn big-btn ${!showButtons ? 'hidden' : ''}`}>
                Draw
            </button>
            <div className={'player-info'}>
                <div className={'center-content width-auto'}>
                    <button
                        onClick={() => handleInteraction('white-resign')}
                        className={`pause-btn big-btn ${!showButtons ? 'hidden' : ''}`}>
                        White resigns
                    </button>
                </div>
            </div>

            { showButtons && started &&
                <div className={'settings clickable'} onClick={() => onSettingsClick()}>
                    <AiFillSetting />
                </div>
            }
        </div>
    )
}

export default MatchInteraction