// Gameboard module

const gameBoard = (() => {
  let state = ["", "", "", "", "", "", "", "", ""];

  const placeSymbol = (symbol, location) => {
    if (state[location] !== "") return false;
    state[location] = symbol;
  };

  const checkForWin = () => {
    if (state[4] !== "") {
      if (state[4] === state[3] && state[4] === state[5]) return true;
      if (state[4] === state[1] && state[4] === state[7]) return true;
      if (state[4] === state[0] && state[4] === state[9]) return true;
      if (state[4] === state[2] && state[4] === state[6]) return true;
    }
    if (state[2] !== "") {
      if (state[2] === state[0] && state[2] === state[1]) return true;
      if (state[2] === state[5] && state[2] === state[8]) return true;
    }
    if (state[6] !== "") {
      if (state[6] === state[7] && state[6] === state[8]) return true;
      if (state[6] === state[0] && state[6] === state[3]) return true;
    }
    return false;
  };
  return { state, placeSymbol, checkForWin };
})();

// Players module

const players = (() => {
  const symbols = ["O", "X"];
  let turn = 0;

  return { symbols, turn };
})();

function clear_game_board() {
  document.querySelectorAll("tr").forEach((row) => row.remove());
}

function draw_game_board(playingField) {
  let newLine = document.createElement("tr");
  for (let i = 0; i < 9; i++) {
    let newCell = document.createElement("td");
    newCell.textContent = playingField[i];
    newCell.addEventListener("click", function () {
      let turn = players.turn;
      if (gameBoard.placeSymbol(players.symbols[turn], i) !== false) {
        if (turn === 0) {
          players.turn = 1;
        } else {
          players.turn = 0;
        }
      }
      clear_game_board();
      draw_game_board(gameBoard.state);
      if (gameBoard.checkForWin() === true)
        console.log(`${players.symbols[turn]} WON! Congrats!`);
    });
    newLine.append(newCell);
    if (i == 2 || i == 5 || i == 8) {
      document.querySelector("table").append(newLine);
      newLine = document.createElement("tr");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  draw_game_board(gameBoard.state);
});
