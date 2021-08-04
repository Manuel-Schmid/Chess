const Victory = ({ victor }) => {
    return (
        <div className={'victory-text'}>
            {victor === 'draw' ? 'Draw !!!' : `${victor} has won!!!`}
        </div>
    )
}

export default Victory