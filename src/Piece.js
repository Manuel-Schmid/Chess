import {Field} from "./Field";

class Piece {
    constructor(color, name) {
        this.color = color;
        this.name = name
    }

    getColor() {
        return this.color
    }
    getName() {
        return this.name
    }

    getField(list, x, y) {
        for(let i = 0; i < list.length; i++) {
            let fieldRow = list[i];
            for(let j = 0; j < fieldRow.length; j++) {
                if(fieldRow[j].getX() === x && fieldRow[j].getY() === y) {
                    return fieldRow[j]
                }
            }
        }
        return 'NA'
    }

    isBreak(possibleMoveList, pField) { // not sure if this should be in here
        if (pField !== 'NA') {
            if (pField.getPiece() !== 'empty' && pField.getPiece().getColor() === this.getColor()) return true
            possibleMoveList.push({x:pField.getX(), y:pField.getY()})
            return pField.getPiece() !== 'empty';
        } else return false
    }

    pushIfPossible(possibleMoveList, fieldList, x, y) {
        const cField = this.getField(fieldList, x, y)
        if (cField !== 'NA') {
            if (cField.getPiece() !== 'empty') {
                if (cField.getPiece().getColor() !== this.getColor()) {
                    possibleMoveList.push({x: cField.getX(), y: cField.getY()})
                }
            } else {
                possibleMoveList.push({x: cField.getX(), y: cField.getY()})
            }
        }
    }

    markDiagonals(fieldList, field, possibleMoveList) {
        for (let i = 1; i <= 7; i++) { // up-right
            const pField = this.getField(fieldList, field.getX() + i, field.getY() - i)
            if (this.isBreak(possibleMoveList, pField)) break
        }
        for (let i = 1; i <= 7; i++) { // up-left
            const pField = this.getField(fieldList, field.getX() - i, field.getY() - i)
            if (this.isBreak(possibleMoveList, pField)) break
        }
        for (let i = 1; i <= 7; i++) { // down-right
            const pField = this.getField(fieldList, field.getX() + i, field.getY() + i)
            if (this.isBreak(possibleMoveList, pField)) break
        }
        for (let i = 1; i <= 7; i++) { // down-left
            const pField = this.getField(fieldList, field.getX() - i, field.getY() + i)
            if (this.isBreak(possibleMoveList, pField)) break
        }
    }

    markStraights(fieldList, field, possibleMoveList) {
        for (let i = 1; i <= 7; i++) { // up
            const pField = this.getField(fieldList, field.getX(), field.getY() - i)
            if (this.isBreak(possibleMoveList, pField)) break
        }
        for (let i = 1; i <= 7; i++) { // down
            const pField = this.getField(fieldList, field.getX(), field.getY() + i)
            if (this.isBreak(possibleMoveList, pField)) break
        }
        for (let i = 1; i <= 7; i++) { // right
            const pField = this.getField(fieldList, field.getX() + i, field.getY())
            if (this.isBreak(possibleMoveList, pField)) break
        }
        for (let i = 1; i <= 7; i++) { // left
            const pField = this.getField(fieldList, field.getX() - i, field.getY())
            if (this.isBreak(possibleMoveList, pField)) break
        }
    }
}

class Pawn extends Piece {
    firstMove = true

    getFirstMove() {
        return this.firstMove
    }

    setFirstMove(firstMove) {
        this.firstMove = firstMove
    }

    getMoves(fieldList, field) {
        let possibleMoveList = []

        const walkRange = (this.firstMove ? 2 : 1)

        const multiplier = (this.color === 'white') ? -1 : 1

        for (let i = 1; i <= walkRange; i++) { // up
            const pField = this.getField(fieldList, field.getX(), field.getY() + (i * multiplier))
            if (pField !== 'NA') {
                if (pField.getPiece() !== 'empty') break
                possibleMoveList.push({x:pField.getX(), y:pField.getY()})
            } else break
        }

        // diagonal left
        const catchField = this.getField(fieldList, field.getX() - 1, field.getY() + (1 * multiplier))
        if (catchField !== 'NA') {
            if (catchField.getPiece() !== 'empty' && catchField.getPiece().getColor() !== this.getColor()) {
                possibleMoveList.push({x:catchField.getX(), y:catchField.getY()})
            }
        }

        // diagonal right
        const catchField2 = this.getField(fieldList, field.getX() + 1, field.getY() + (1 * multiplier))
        if (catchField2 !== 'NA') {
            if (catchField2.getPiece() !== 'empty' && catchField2.getPiece().getColor() !== this.getColor()) {
                possibleMoveList.push({x: catchField2.getX(), y: catchField2.getY()})
            }
        }

        return possibleMoveList
    }
}

class Rook extends Piece {
    getMoves(fieldList, field) {
        let possibleMoveList = []

        this.markStraights(fieldList, field, possibleMoveList)

        return possibleMoveList
    }
}

class Knight extends Piece {
    getMoves(fieldList, field) {
        let possibleMoveList = []

        // every possible knight-move
        this.pushIfPossible(possibleMoveList, fieldList, field.getX() + 1, field.getY() - 2)
        this.pushIfPossible(possibleMoveList, fieldList, field.getX() + 1, field.getY() + 2)
        this.pushIfPossible(possibleMoveList, fieldList, field.getX() + 2, field.getY() - 1)
        this.pushIfPossible(possibleMoveList, fieldList, field.getX() + 2, field.getY() + 1)
        this.pushIfPossible(possibleMoveList, fieldList, field.getX() - 1, field.getY() - 2)
        this.pushIfPossible(possibleMoveList, fieldList, field.getX() - 1, field.getY() + 2)
        this.pushIfPossible(possibleMoveList, fieldList, field.getX() - 2, field.getY() - 1)
        this.pushIfPossible(possibleMoveList, fieldList, field.getX() - 2, field.getY() + 1)

        return possibleMoveList
    }
}

class Bishop extends Piece {
    getMoves(fieldList, field) {
        let possibleMoveList = []

        this.markDiagonals(fieldList, field, possibleMoveList);

        return possibleMoveList
    }
}

class Queen extends Piece {
    getMoves(fieldList, field) {
        let possibleMoveList = []

        this.markStraights(fieldList, field, possibleMoveList);
        this.markDiagonals(fieldList, field, possibleMoveList);

        return possibleMoveList
    }
}

class King extends Piece {
    getMoves(fieldList, field, checkForCheck) { // , checkForCheck
        let possibleMoveList = []

        // one square in every direction
        this.pushIfNotCheck(possibleMoveList, fieldList, field.getX(), field.getY() - 1, field, checkForCheck)
        this.pushIfNotCheck(possibleMoveList, fieldList, field.getX(), field.getY() + 1, field, checkForCheck)
        this.pushIfNotCheck(possibleMoveList, fieldList, field.getX() + 1, field.getY() -1, field, checkForCheck)
        this.pushIfNotCheck(possibleMoveList, fieldList, field.getX() + 1, field.getY(), field, checkForCheck)
        this.pushIfNotCheck(possibleMoveList, fieldList, field.getX() + 1, field.getY() + 1, field, checkForCheck)
        this.pushIfNotCheck(possibleMoveList, fieldList, field.getX() - 1, field.getY() - 1, field, checkForCheck)
        this.pushIfNotCheck(possibleMoveList, fieldList, field.getX() - 1, field.getY(), field, checkForCheck)
        this.pushIfNotCheck(possibleMoveList, fieldList, field.getX() - 1, field.getY() + 1, field, checkForCheck)

        return possibleMoveList
    }

    deepCopy2dArray(currentArray) {
        let newArray = [];
        let newArrayRow = [];

        for(let i = 0; i < currentArray.length; i++) {
            let fieldRow = currentArray[i];
            newArrayRow = []
            for(let j = 0; j < fieldRow.length; j++) {
                newArrayRow.push(new Field(fieldRow[j].getX(), fieldRow[j].getY(), fieldRow[j].getPiece()))
            }
            newArray.push(newArrayRow)
        }
        return newArray
    }

    // King cannot move somewhere where he is in check

    pushIfNotCheck(possibleMoveList, fieldList, x, y, fromField, checkForCheck) {
        const cField = this.getField(fieldList, x, y)
        if (cField !== 'NA') {

            let everyPossibleMove = []

            if (checkForCheck) {
                let newFields = this.deepCopy2dArray(fieldList)
                let movePossible = false

                let killedPiece
                for(let i = 0; i < newFields.length; i++) {
                    let fieldRow = newFields[i];
                    for(let j = 0; j < fieldRow.length; j++) {
                        if(fieldRow[j].getX() === x && fieldRow[j].getY() === y) {
                            if (fieldRow[j].getPiece() === 'empty' || (fieldRow[j].getPiece() !== 'empty' && fieldRow[j].getPiece().getColor() !== this.getColor())) {
                                movePossible = true
                                killedPiece = fieldRow[j].getPiece()
                                fieldRow[j].setPiece(this)
                            }
                        }
                    }
                }

                if (movePossible) {
                    for(let i = 0; i < newFields.length; i++) {
                        let fieldRow = newFields[i];
                        for(let j = 0; j < fieldRow.length; j++) {
                            if(fieldRow[j].getX() === fromField.getX() && fieldRow[j].getY() === fromField.getY()) {
                                fieldRow[j].setPiece(killedPiece)
                            }
                        }
                    }

                    everyPossibleMove = this.getEveryPossibleMove(newFields)
                }
            }

            // return if check
            for (const move of everyPossibleMove) {
                if (move.x === x && move.y === y) return
            }

            if (cField.getPiece() !== 'empty') {
                if (cField.getPiece().getColor() !== this.getColor()) {
                    possibleMoveList.push({x: cField.getX(), y: cField.getY()})
                }
            } else {
                possibleMoveList.push({x: cField.getX(), y: cField.getY()})
            }
        }
    }

    getEveryPossibleMove(fields) {
        let everyPossibleMove = []
        for(let i = 0; i < fields.length; i++) {
            let fieldRow = fields[i];
            for(let j = 0; j < fieldRow.length; j++) {
                if (fieldRow[j].getPiece() !== 'empty' && fieldRow[j].getPiece().getColor() !== this.getColor()) {
                    let possibleMoves
                    if (fieldRow[j].getPiece().getName() === 'King') possibleMoves = fieldRow[j].getPiece().getMoves(fields, fieldRow[j], false)
                    else possibleMoves = fieldRow[j].getPiece().getMoves(fields, fieldRow[j])
                    everyPossibleMove.push(...possibleMoves)
                }
            }
        }
        return everyPossibleMove
    }
}

export {Piece};
export {Pawn};
export {Rook};
export {Knight};
export {Bishop};
export {Queen};
export {King};