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
    // create a 2-dimensional array of board
    this.board = [];
    for (let i = 0; i < Board.ROW_LENGTH; i++) {
      this.board[i] = [];
      for (let j = 0; j < Board.COL_LENGTH; j++) {
        this.board[i].push(null);
      }
    }
  }

  addPiece(col, piece) {
    // scan from bottom to top until reached empty block or reached the edge
    let currRow = Board.ROW_LENGTH - 1;
    while (this.board[currRow][col] && currRow > 0) {
      currRow--;
    }
    // add piece to empty block
    this.board[currRow][col] = piece;
  }

  getBoard() {
    return this.board;
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
    this.board.addPiece(col, this.currentPiece);
    // set winner if checkWinnerWithColumn is true otherwise switch current player
    if (this.checkWinnerWithColumn(col)) {
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

  checkWinnerWithColumn(col) {
    /*
      scan horizontally & vertically use "col(column)" position as starting point
    */
    return this.traversalHorizontally(col) || this.traversalVertically(col);
  }

  traversalHorizontally(col) {
    /*
      helper function: scale horizontally from center to left & right
    */
    const board = this.board.getBoard();
    // get filled block position
    let currRow = Board.ROW_LENGTH - 1;
    while (!board[currRow][col] && currRow > 0) {
      currRow--;
    }
    let connected = 1;
    let left = col-1;
    let right = col+1;
    let length = Board.COL_LENGTH-1;
    while (
      (left > 0 || right < Board.COL_LENGTH-1)  &&
      connected < 4 &&
      length > 0
    ) {
      // check left side
      if (board[currRow][left] === this.currentPiece) {
        connected++;
        left--
      }
      // check right side
      if (board[currRow][right] === this.currentPiece) {
        connected++;
        right++;
      }
      length--;
    }
    return connected >= 4 ? true : false;
  }

  traversalVertically(col) {
    /*
      helper function: scale vertically from bottom to top
    */
    const board = this.board.getBoard();
    let currRow = Board.ROW_LENGTH - 1;
    let connected = 0;
    while (currRow > 0 && connected < 4) {
      if (
        board[currRow][col] &&
        board[currRow][col] === this.currentPiece
      ) {
        connected++
      } else {
        connected = 0;
      }
      currRow--;
    }
    return connected >= 4 ? true : false;
  }
}
