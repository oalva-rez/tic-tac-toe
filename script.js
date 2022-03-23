"use strict";

let playField = (function () {
  let field = document.querySelector(".play-field");
  let row, cell;
  let winner;
  let getWinner = () => winner;
  let setWinner = (turn) => {
    winner = turn;
    console.log(`Winner is ${winner}!!!`);
  };
  let turn = "o";
  let getTurn = () => turn;
  let setTurn = (play) => (turn = play);

  for (let i = 0; i < 3; i++) {
    row = document.createElement("tr");
    field.appendChild(row);
    for (let j = 0; j < 3; j++) {
      cell = document.createElement("td");
      cell.textContent = "";
      row.appendChild(cell);
    }
  }

  let addEvent = (e) => {
    e.addEventListener("click", function handler() {
      if (turn === "o") {
        e.textContent = player1.getMarker();
        setTurn("x");
        testWinner();

        e.removeEventListener("click", handler);
      } else if (turn === "x") {
        e.textContent = player2.getMarker();
        setTurn("o");
        testWinner();

        e.removeEventListener("click", handler);
      }
    });
  };

  document.querySelectorAll("td").forEach((el) => {
    addEvent(el);
  });

  return { getTurn, setTurn, setWinner, getWinner };
})();

let testWinner = () => {
  let row = document.querySelectorAll("tr");

  // arrays of diagonal cells
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

  // test winner at both diagonals
  if (diagArr1.join("") === "XXX" || diagArr1.join("") === "OOO") {
    playField.setWinner(playField.getTurn());
    endGame();
  }
  if (diagArr2.join("") === "XXX" || diagArr2.join("") === "OOO") {
    playField.setWinner(playField.getTurn());
    endGame();
  }

  // test winner in every column
  transposeGrid().map((r) => {
    if (r.join("") === "XXX" || r.join("") === "OOO") {
      playField.setWinner(playField.getTurn());
      endGame();
    }
  });
  // test winner in every row
  row.forEach((c) => {
    if (c.textContent === "XXX" || c.textContent === "OOO") {
      playField.setWinner(playField.getTurn());
      endGame();
    }
  });
};
let endGame = () => {
  playField.setTurn(null);
};

// let restartGame = () => {
//   playField.setTurn("o");

// };

// transpose grid (columns -> rows)
let transposeGrid = () => {
  let colNth;
  let colArray = [];
  for (let i = 1; i <= 3; i++) {
    let arrRow = [];
    colNth = document.querySelectorAll(`tr :nth-child(${i})`);
    for (let cell of colNth) {
      arrRow.push(cell.textContent);
    }
    colArray.push(arrRow);
  }
  return colArray;
};
function Player(marker) {
  const getMarker = () => marker;
  return { getMarker };
}

const player1 = Player("X");
const player2 = Player("O");
