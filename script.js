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
    if (_board[square[0]][square[1]].getValue() != null) {
      return 1;
    }

    // Otherwise the valid square.
    _board[square[0]][square[1]].addToken(player);
    return 0;
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

const GameController = ((
  _playerOneName = "Player One",
  _playerTwoName = "Player Two"
) => {
  const _players = [
    {
      name: _playerOneName,
      token: "x",
    },
    {
      name: _playerTwoName,
      token: "o",
    },
  ];

  let _activePlayer = _players[0];

  const _switchPlayerTurn = () => {
    _activePlayer = _activePlayer === _players[0] ? _players[1] : _players[0];
  };

  const getActivePlayer = () => _activePlayer;

  const _printNewRound = () => {
    GameBoard.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const playRound = (square) => {
    // Add token for the current player
    console.log(`Adding ${getActivePlayer().name}'s token to square ${square}`);
    if (GameBoard.makeMove(square, getActivePlayer().token) === 0) {
      // Check for winner

      // Switch player turn
      _switchPlayerTurn();
      _printNewRound();
    } else {
      console.log(`Invalid square`);
      _printNewRound();
    }
  };

  // Initial play game message
  _printNewRound();

  return {
    playRound,
    getActivePlayer,
    //  Don't know if I need this.
    getBoard: GameBoard.getBoard,
  };
})();
