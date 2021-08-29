import {AiFillSetting} from "react-icons/all";

const MatchInteraction = ({ started, showButtons, showMatchInteraction, language, setShowMatchInteraction, pauseMatch, defineVictor }) => {
    const onSettingsClick = () => {
        if (!showMatchInteraction) pauseMatch(true)
        else pauseMatch(false)
        setShowMatchInteraction(!showMatchInteraction)
    }

    const handleInteraction = (interaction) => {
        switch (interaction) {
            case 'black-resign' :
                defineVictor('black', true)
                break;
            case 'white-resign' :
                defineVictor('white', true)
                break;
            case 'draw' :
                defineVictor('draw', false)
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
                        className={`resignation button-2 big-btn ${!showButtons ? 'hidden' : ''}`}>
                        {language === 'english' ? 'Black resigns' : 'Schwarz gibt auf'}
                    </button>
                </div>
            </div>
            <button
                onClick={() => handleInteraction('draw')}
                className={`draw button-2 big-btn ${!showButtons ? 'hidden' : ''}`}>
                {language === 'english' ? 'Draw' : 'Remis'}
            </button>
            <div className={'player-info'}>
                <div className={'center-content width-auto'}>
                    <button
                        onClick={() => handleInteraction('white-resign')}
                        className={`resignation button-2 big-btn ${!showButtons ? 'hidden' : ''}`}>
                        {language === 'english' ? 'White resigns' : 'Weiss gibt auf'}
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