const Header = ({ formCompleted }) => {
    return (
        <div className={`${formCompleted ? 'header-left' : 'header-center'}`}>
            <h1>Chess</h1>
            <h3>by Manuel Schmid</h3>
        </div>
    )
}

export default Header