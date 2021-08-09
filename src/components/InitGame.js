const InitGame = ({ initMatch, switchLanguage, language }) => {
    let player1 = ''
    let player2 = ''
    let time = 0
    let minsText = (language === 'english' ? 'minutes' : 'Minuten')

    const onSubmit = (e) => {
        e.preventDefault()
        setValues()

        if(!player1 || !player2 || player1 === player2) {
            alert(`${language === 'english' ? 'Please Enter Two Unique Usernames' : 'Geben Sie bitte zwei eindeutige Benutzernamen ein'}`)
            return
        }

        initMatch(player1, player2, time)
    }

    const setValues = () => {
        player1 = document.getElementById('player1').value
        player2 = document.getElementById('player2').value
        time = document.getElementById('time').value
        player1 = player1.trim()
        player2 = player2.trim()
    }

    const onLanguageSwitch = () => {
        switchLanguage()
    }

    return (
        <form className={'init-form'} onSubmit={onSubmit}>
            <div className={'switch-container'}>
                <p><span className={'english'}>English</span> / <span className={'german'}>Deutsch</span></p>
                <label className="switch">
                    <input type="checkbox" onChange={onLanguageSwitch}/>
                    <span className="slider round"/>
                </label>
            </div>
            <div className={'form-control'}>
                <label>{language === 'english' ? 'Player 1 (White)' : 'Spieler 1 (Weiss)'}</label>
                <input
                    id={'player1'}
                    type={'text'}
                    placeholder={`${language === 'english' ? 'Username' : 'Benutzername'}`}
                />
            </div>
            <div className={'form-control'}>
                <label>{language === 'english' ? 'Player 2 (Black)' : 'Spieler 2 (Schwarz)'}</label>
                <input
                    id={'player2'}
                    type={'text'}
                    placeholder={`${language === 'english' ? 'Username' : 'Benutzername'}`}
                />
            </div>
            <div className={'form-control'}>
                <label>{language === 'english' ? 'Time per player' : 'Zeit pro Spieler'}</label>
                <select id={'time'} name="option-select">
                    <option value="360">360 {minsText}</option>
                    <option value="200">200 {minsText}</option>
                    <option value="100">100 {minsText}</option>
                    <option value="60"> 60 {minsText}</option>
                    <option value="30"> 30 {minsText}</option>
                    <option value="10"> 10 {minsText}</option>
                    <option value="5"> 5 {minsText}</option>
                </select>
            </div>
            <input className={'btn btn-block'} type={'submit'} value={language === 'english' ? 'Start Game' : 'Spiel starten'} />
        </form>
    )
}

export default InitGame