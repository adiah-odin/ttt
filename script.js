// Create a module for the GameBoard
const GameBoard = (() => {
  "use strict";
  const _rows = 3;
  const _columns = 3;
  const _board = [];

  // 2D array to represent the state of the game board
  for (let i = 0; i < _rows; i++) {
    _board[i] = [];
    for (let j = 0; j < _columns; j++) {
      // Might use Cell or something else
      _board[i].push(Cell());
    }
  }

  const getBoard = () => _board;

  // add an x or o to a square, depending on the player
  // square should be a tuple of 2 coordinates
  const makeMove = (square, player) => {
    // If the square is not empty then return
    // if (_board[])
  };

  const printBoard = () => {
    const boardWithValues = _board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithValues);
  };

  return {
    getBoard,
    makeMove,
    printBoard,
  };
})();

// Each of the squares have a cell that will contain the mark and which player
function Cell() {
  let _value = null;

  const addToken = (player) => {
    _value = player;
  };

  const getValue = () => _value;

  return {
    addToken,
    getValue,
  };
}
