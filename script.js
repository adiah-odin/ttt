// Create a module for the GameBoard
const GameBoard = (() => {
  "use strict";
  const _rows = 3;
  const _columns = 3;
  const _board = [];

  // 2D array to represent the state of the game board
  //   for (let i = 0; i < _rows; i++) {
  //     _board[i] = [];
  //     for (let j = 0; j < _columns; j++) {
  //       // Might use Cell or something else
  //       _board[i].push(Cell());
  //     }
  //   }

  // Use a 1D array instead
  for (let i = 0; i < 9; i++) {
    _board.push(Cell());
  }

  const getBoard = () => _board;

  // add an x or o to a square, depending on the player
  // square should be a tuple of 2 coordinates
  const makeMove = (square, player) => {
    // If the square is not empty then return
    if (_board[square].getValue() != null) {
      return 1;
    }

    // Otherwise the valid square.
    _board[square].addToken(player);
    return 0;
  };

  //   const availableSquares = _board.filter(
  //     (square) => square.getValue() === null
  //   );

  const availableSquares = () => {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      if (_board[i].getValue() === null) {
        count++;
      }
    }
    return count;
  };

  const printBoard = () => {
    // Convert the 1D array into a 2D array for printing
    const oneDBoard = [..._board];
    const twoDBoard = [];
    while (oneDBoard.length) twoDBoard.push(oneDBoard.splice(0, 3));

    // Print the values of the cells
    const boardWithValues = twoDBoard.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithValues);
  };

  return {
    availableSquares,
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

  const _checkWinner = () => {
    // Returns true if the game has a winner

    // The indexes that need to be equal for a winner
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // let roundWon = false;
    _board = GameBoard.getBoard();

    for (let i = 0; i < 8; i++) {
      const winCondition = winningConditions[i];

      let a = _board[winCondition[0]].getValue();
      let b = _board[winCondition[1]].getValue();
      let c = _board[winCondition[2]].getValue();

      if (a === null || b === null || c === null) {
        continue;
      }

      if (a === b && c === b) {
        return true;
      }
    }
  };

  const playRound = (square) => {
    // Add token for the current player
    console.log(`Adding ${getActivePlayer().name}'s token to square ${square}`);
    if (GameBoard.makeMove(square, getActivePlayer().token) === 0) {
      // Check for winner
      if (_checkWinner()) {
        console.log(`Winner: ${getActivePlayer()}.`);
      } else if (GameBoard.availableSquares() === 0) {
        // check if the board is full
        console.log(`Draw`);
      } else {
        // Switch player turn
        _switchPlayerTurn();
        _printNewRound();
      }
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

const ScreenController = (() => {})();
