"use strict";

let playField = (function () {
  let field = document.querySelector(".play-field");
  let row, cell;
  let turn = "o";
  let getTurn = () => turn;
  let setTurn = (play) => (turn = play);
  let addEvent = (e) => {
    e.addEventListener("click", function handler() {
      if (turn === "o") {
        e.textContent = player1.getMarker();
        setTurn("x");
        testWinner();

        e.removeEventListener("click", handler);
      } else {
        e.textContent = player2.getMarker();
        setTurn("o");
        testWinner();

        e.removeEventListener("click", handler);
      }
    });
  };
  for (let i = 0; i < 3; i++) {
    row = document.createElement("tr");
    field.appendChild(row);
    for (let j = 0; j < 3; j++) {
      cell = document.createElement("td");
      cell.textContent = "-";
      row.appendChild(cell);
    }
  }
  document.querySelectorAll("td").forEach((el) => {
    addEvent(el);
  });
  return { getTurn };
})();

let testWinner = () => {
  let winner;
  let row = document.querySelectorAll("tr");

  let cols = document.querySelectorAll("td");

  console.log(row);

  row.forEach((c) => {
    if (c.textContent === "XXX" || c.textContent === "OOO") {
      winner = playField.getTurn();
    }
  });
  return winner;
};

function Player(marker) {
  const getMarker = () => marker;
  return { getMarker };
}

const player1 = Player("X");
const player2 = Player("O");
