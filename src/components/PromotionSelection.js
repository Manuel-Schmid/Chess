import {FaArrowRight} from "react-icons/fa";
import * as Pieces from "../Piece";
import PieceIcon from "./PieceIcon";
import {useState} from "react";

const PromotionSelection = ({ promotePawn, pieceColor }) => {

    const [selection, setSelection] = useState('Queen')

    const getSelectedPiece = () => {
        switch(document.getElementById('promotion').value) {
            case 'Queen':
                return new Pieces.Queen(pieceColor, 'Queen')
            case 'Knight':
                return new Pieces.Knight(pieceColor, 'Knight')
            case 'Bishop':
                return new Pieces.Bishop(pieceColor, 'Bishop')
            case 'Rook':
                return new Pieces.Rook(pieceColor, 'Rook')
            default:
                console.log('error')
                break;
        }
    }

    const updateSelection = () => {
        setSelection(document.getElementById('promotion').value)
    }

    const executePromotion = () => {
        promotePawn(getSelectedPiece())
    }

    return (
        <div>
            <div className='popup'>
                <div className='popup_inner'>
                    <h2>Select the piece you want your Pawn to become</h2>
                    <div className={'promotion-container'}>
                        <select id={'promotion'} name="option-select" onChange={() => updateSelection()}>
                            <option value="Queen">
                                Queen
                            </option>
                            <option value="Rook">
                                Rook
                            </option>
                            <option value="Bishop">
                                Bishop
                            </option>
                            <option value="Knight">
                                Knight
                            </option>
                        </select>
                        <div className={'preview'}>
                            <PieceIcon piece={'Pawn'} color={pieceColor} />
                            <FaArrowRight className={'arrow'} />
                            <PieceIcon piece={selection} color={pieceColor} />
                        </div>
                        <button onClick={executePromotion} className={'btn'}>Promote Pawn</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromotionSelection