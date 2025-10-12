const Victory = ({ victor, language }) => {
    return (
        <div className={'victory-text'}>
            {victor === 'draw' ? `${language==='english'?'Draw!':'Remis!'}` : `${language==='english'?`${victor} wins!`:`${victor} gewinnt!`}`}
        </div>
    )
}

export default Victory