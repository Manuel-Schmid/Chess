const Header = ({ left, language }) => {
    return (
        <div className={`${left ? 'header-left' : 'header-center'}`}>
            <h1>{language === 'english' ? 'Chess' : 'Schach'}</h1>
            <h3>{language === 'english' ? 'by' : 'von'} Manuel Schmid</h3>
        </div>
    )
}

export default Header