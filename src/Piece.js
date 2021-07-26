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
}

class Pawn extends Piece {}
class Rook extends Piece {}
class Knight extends Piece {}
class Bishop extends Piece {}
class Queen extends Piece {}
class King extends Piece {}

export {Pawn};
export {Rook};
export {Knight};
export {Bishop};
export {Queen};
export {King};