const InitGame = ({ initMatch }) => {
    let player1 = ''
    let player2 = ''
    let time = 0

    const onSubmit = (e) => {
        e.preventDefault()
        setValues()

        if(!player1 || !player2 || player1 === player2) {
            alert('Please Enter Two Unique Usernames')
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

    return (
        <form className={'init-form'} onSubmit={onSubmit}>
            <div className={'form-control'}>
                <label>Player 1</label>
                <input
                    id={'player1'}
                    type={'text'}
                    placeholder={'Username'}
                />
            </div>
            <div className={'form-control'}>
                <label>Player 2</label>
                <input
                    id={'player2'}
                    type={'text'}
                    placeholder={'Username'}
                />
            </div>
            <div className={'form-control'}>
                <label>Time per player</label>
                <select id={'time'} name="time-select">
                    <option value="360">360 minutes</option>
                    <option value="200">200 minutes</option>
                    <option value="100">100 minutes</option>
                    <option value="60"> 60 minutes</option>
                    <option value="30"> 30 minutes</option>
                    <option value="10"> 10 minutes</option>
                    <option value="5"> 5 minutes</option>
                </select>
            </div>

            <input className={'btn btn-block'} type={'submit'} value={'Start Game'} />
        </form>
    )
}

export default InitGame