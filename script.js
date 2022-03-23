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
  let winner, colNth;
  let row = document.querySelectorAll("tr");
  let col = document.querySelectorAll("td");
  let colArray = [];
  let diagArr1 = [
    row[0].querySelector(":nth-child(1)").textContent,
    row[1].querySelector(":nth-child(2)").textContent,
    row[2].querySelector(":nth-child(3)").textContent,
  ];
  let diagArr2 = [
    row[0].querySelector(":nth-child(3)").textContent,
    row[1].querySelector(":nth-child(2)").textContent,
    row[2].querySelector(":nth-child(1)").textContent,
  ];
  console.log(diagArr1);

  // transpose grid (columns -> rows)
  for (let i = 1; i <= 3; i++) {
    let arrRow = [];
    colNth = document.querySelectorAll(`tr :nth-child(${i})`);
    for (let cell of colNth) {
      arrRow.push(cell.textContent);
    }
    colArray.push(arrRow);
  }

  // test winner at both diagonals
  if (diagArr1.join("") === "XXX" || diagArr1.join("") === "OOO") {
    winner = playField.getTurn();
    console.log(winner);
  }
  if (diagArr2.join("") === "XXX" || diagArr2.join("") === "OOO") {
    winner = playField.getTurn();
    console.log(winner);
  }

  // test winner in every column
  colArray.map((r) => {
    if (r.join("") === "XXX" || r.join("") === "OOO") {
      winner = playField.getTurn();
      console.log(winner);
    }
  });
  // test winner in every row
  row.forEach((c) => {
    if (c.textContent === "XXX" || c.textContent === "OOO") {
      winner = playField.getTurn();
      console.log(winner);
    }
  });

  return winner;
};
let endGame = () => {};
function Player(marker) {
  const getMarker = () => marker;
  return { getMarker };
}

const player1 = Player("X");
const player2 = Player("O");
