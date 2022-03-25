let playField = (function () {
  let field = document.querySelector(".play-field");
  let resultElement = document.querySelector(".player-turn");
  let row, cell;
  let result;
  let getResult = () => result;
  let setResult = (res) => {
    result = res;
    if (result === "TIE") {
      resultElement.textContent = `Its a TIE`;
    } else if (result === "o" || result === "x") {
      resultElement.textContent = `${result.toUpperCase()} WINS!`;
    }
  };

  let turn = "o";
  let getTurn = () => turn;
  let setTurn = (play) => (turn = play);

  function showTurnOnPage() {
    let turnElement = document.querySelector("#turn");
    turnElement.textContent = playField.getTurn();
  }

  for (let i = 0; i < 3; i++) {
    row = document.createElement("tr");
    field.appendChild(row);
    for (let j = 0; j < 3; j++) {
      cell = document.createElement("td");
      cell.textContent = "";
      row.appendChild(cell);
    }
  }

  // add click events on individual tiles
  let addEvent = (e) => {
    e.addEventListener("click", function handler() {
      if (turn === "o") {
        e.textContent = player1.getMarker();
        showTurnOnPage();
        setTurn("x");
        testWinner();
        e.removeEventListener("click", handler);
      } else if (turn === "x") {
        e.textContent = player2.getMarker();
        showTurnOnPage();
        setTurn("o");
        testWinner();
        e.removeEventListener("click", handler);
      }
    });
  };
  document.querySelectorAll("td").forEach((el) => {
    addEvent(el);
  });

  return { getTurn, setTurn, setResult, getResult };
})();

let testWinner = () => {
  let rows = document.querySelectorAll("tr");
  let cells = document.querySelectorAll("td");

  // arrays of diagonal cells
  let diagArr1 = [
    rows[0].querySelector(":nth-child(1)").textContent,
    rows[1].querySelector(":nth-child(2)").textContent,
    rows[2].querySelector(":nth-child(3)").textContent,
  ];
  let diagArr2 = [
    rows[0].querySelector(":nth-child(3)").textContent,
    rows[1].querySelector(":nth-child(2)").textContent,
    rows[2].querySelector(":nth-child(1)").textContent,
  ];

  // test win at both diagonals
  if (diagArr1.join("") === "XXX" || diagArr1.join("") === "OOO") {
    playField.setResult(playField.getTurn());
    endGame();
  }
  if (diagArr2.join("") === "XXX" || diagArr2.join("") === "OOO") {
    playField.setResult(playField.getTurn());
    endGame();
  }

  // test win in every column
  transposeGrid().map((r) => {
    if (r.join("") === "XXX" || r.join("") === "OOO") {
      playField.setResult(playField.getTurn());
      endGame();
    }
  });

  // test win in every row
  rows.forEach((c) => {
    if (c.textContent === "XXX" || c.textContent === "OOO") {
      playField.setResult(playField.getTurn());
      endGame();
    }
  });

  // test if tie
  const allOccupied = (arr) => arr.every((v) => v.textContent !== "");
  if (allOccupied(Object.values(cells))) {
    playField.setResult("TIE");
    endGame();
  }
};

let endGame = () => {
  let nextRoundBtn = document.querySelector(".next-vis");
  nextRoundBtn.classList.toggle("next-vis");
  nextRoundBtn.addEventListener("click", () => {
    window.location.reload();
  });
  playField.setTurn(null);
};

// transpose grid (columns -> rows)
let transposeGrid = () => {
  let colArray = [];
  let nthCol;
  for (let i = 1; i <= 3; i++) {
    let arrRow = [];
    nthCol = document.querySelectorAll(`tr :nth-child(${i})`);
    for (let cell of nthCol) {
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
