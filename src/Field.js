class Field {
    constructor(x, y, piece) {
        this.x = x
        this.y = y
        this.piece = piece
        this.highlighted = false
    }

    setPiece(piece) {
        this.piece = piece
    }

    getPiece() {
        return this.piece
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    getHighlighted() {
        return this.highlighted;
    }

    setHighlighted(value) {
        this.highlighted = value;
    }
}

export {Field}