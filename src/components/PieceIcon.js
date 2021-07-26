import { FaChessPawn } from 'react-icons/fa'
import { FaChessRook } from 'react-icons/fa'
import { FaChessKnight } from 'react-icons/fa'
import { FaChessBishop } from 'react-icons/fa'
import { FaChessQueen } from 'react-icons/fa'
import { FaChessKing } from 'react-icons/fa'

const PieceIcon = ({ piece, color }) => {
    const renderIcon = () => {
        switch(piece) {
            case 'Pawn':
                return <FaChessPawn className={`piece ${color}`} />
            case 'Rook':
                return <FaChessRook className={`piece ${color}`} />
            case 'Knight':
                return <FaChessKnight className={`piece ${color}`} />
            case 'Bishop':
                return <FaChessBishop className={`piece ${color}`} />
            case 'Queen':
                return <FaChessQueen className={`piece ${color}`} />
            case 'King':
                return <FaChessKing className={`piece ${color}`} />
            default:
                return 'error';
        }
    }

    return (
        <>
            {renderIcon()}
        </>
    )
}

export default PieceIcon