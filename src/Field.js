class Field {
    constructor(piece, isEmpty) {
        this.piece = piece
        this.isEmpty = isEmpty
    }

    setPiece(piece) {
        this.piece = piece
    }

    getPiece() {
        return this.piece
    }
}