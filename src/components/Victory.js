const Victory = ({ victor, language }) => {
    return (
        <div className={'victory-text'}>
            {victor === 'draw' ? `${language==='english'?'Draw!':'Remis!'}` : `${language==='english'?`${victor} has won!`:`${victor} hat gewonnen!`}`}
        </div>
    )
}

export default Victory