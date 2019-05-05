
class Piece {
  constructor(color) {
    this.color = color;
  }
}

/*
  Board class: for represent board & manage board state
*/
export class Board {
  static ROW_LENGTH = 6;
  static COL_LENGTH = 7;

  constructor() {
    // create board (6x7) grids
    this.grids = [];
    for (let i = 0; i < Board.ROW_LENGTH; i++) {
      this.grids[i] = [];
      for (let j = 0; j < Board.COL_LENGTH; j++) {
        this.grids[i].push(null);
      }
    }
  }

  addPiece(col, piece) {
    const row = this.getEmptyGridRowIndex(col);
    this.grids[row][col] = piece;
  }

  getGrids() {
    return this.grids;
  }

  getEmptyGridRowIndex(col) {
    // scan from bottom to top until reached empty block or reached the edge
    let currRow = this.grids.length-1;
    while (this.grids[currRow][col] && currRow > 0) {
      currRow--;
    }
    return currRow;
  }

  getTopNonEmptyGridRowIndex(col) {
    const rowIndex = this.getEmptyGridRowIndex(col);
    return rowIndex === 0 ? 0 : rowIndex+1;
  }

  hasFilledByPiece(row, col, piece) {
    return this.grids[row][col] === piece;
  }
}

/*
  ConnectFour class: contain game logic/algorithms & manage game state
*/
export default class ConnectFour {
  constructor() {
    this.board = new Board();
    this.winner = null;
    this.redPiece = new Piece('red');
    this.yellowPiece = new Piece('yellow');
    this.currentPiece = this.redPiece;
  }

  getWinner() {
    return this.winner;
  }

  addPiece(col) {
    if (this.winner) {
      return;
    }
    this.board.addPiece(col, this.currentPiece);
    // set winner if hasConnected4 is true otherwise switch current player
    if (this.hasConnected4(col)) {
      this.winner = this.currentPiece;
      return;
    }
    this.switchcurrentPiece();
  }

  switchcurrentPiece() {
    if (this.currentPiece === this.redPiece) {
      this.currentPiece = this.yellowPiece;
    } else {
      this.currentPiece = this.redPiece;
    }
  }

  hasConnected4(col) {
    /*
      scan horizontally & vertically use "col(column)" position as starting point
    */
    return this.hasHorizontallyConnected4(col) || this.hasVerticallyConnected4(col);
  }

  hasHorizontallyConnected4(col) {
    /*
      helper function: scan horizontally from center to left & right
    */
    // emptyGridRowIndex + 1 = last non-empty row
    const currRow = this.board.getTopNonEmptyGridRowIndex(col);
    let connected = this.board.hasFilledByPiece(currRow, col, this.currentPiece)
      ? 1
      : 0;
    let leftCol = col-1;
    let rightCol = col+1;
    let colLength = Board.COL_LENGTH;
    while (connected < 4 && colLength > 0) {
      // check left,right column & move left,right pointer if they connected
      if (this.board.hasFilledByPiece(currRow, leftCol, this.currentPiece)) {
        connected++;
        leftCol--;
      }
      if (this.board.hasFilledByPiece(currRow, rightCol, this.currentPiece)) {
        connected++;
        rightCol++;
      }
      colLength--;
    }
    return connected >= 4;
  }

  hasVerticallyConnected4(col) {
    /*
      helper function: scan vertically from bottom to top
    */
    let currRow = this.board.getTopNonEmptyGridRowIndex(col);
    let connected = 0;
    while (connected < 4 && currRow < Board.ROW_LENGTH) {
      if (this.board.hasFilledByPiece(currRow, col, this.currentPiece)) {
        connected++;
      } else {
        connected = 0;
      }
      currRow++;
    }
    return connected >= 4;
  }
}
