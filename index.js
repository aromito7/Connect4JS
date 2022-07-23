const ROWS = 6;
const COLS = 7;

let board = []
let active = Array(COLS).fill(0)

const TIME_STEP = 75;
let INTERVAL_POINTER = null;

const currentPlayer = 1



function initialize() {
  buildGrid();
  buildButtons();
  //initButtons();
}

function clearScreen() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const current = document.getElementById(`${x},${y}`);
      current.setAttribute("class", "dead");
    }
  }
}

function startGame() {
  const start = document.getElementById("start");
  start.setAttribute("class", "on");
  start.innerHTML = "STOP";
  INTERVAL_POINTER = setInterval(() => nextState(), TIME_STEP);
}

function stopGame() {
  const start = document.getElementById("start");
  start.setAttribute("class", "off");
  start.innerHTML = "START";
  clearInterval(INTERVAL_POINTER);
}

function initButtons() {
  const clear = document.getElementById("clear");
  const next = document.getElementById("next");
  const start = document.getElementById("start");
  start.addEventListener("click", () => start.classList.contains("off")
			 ? startGame()
			 : stopGame());
  clear.addEventListener("click", () => clearScreen());
  next.addEventListener("click", () => nextState());
}

const columnDrop = function(player, column){
  console.log(column, active[column], board)
  //board[active[column]][column].setAttribute("class", player === 1 ? "black" : "red")
  return () => console.log(`Hello Player ${player}.  You've selected ${column}, ${active[column]}`)
}

function buildGrid() {
  const grid = document.getElementById("grid");
  for (let y = 0; y < ROWS; y++) {
    const row = []
    for (let x = 0; x < COLS; x++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", y === ROWS - 1 ? "active" : "empty");
      cell.setAttribute("id", `${x},${y}`);
      cell.addEventListener("click",
			    columnDrop(currentPlayer, x))
      grid.appendChild(cell);
      row.push(cell)
    }
    board.push(row)
  }
}

function buildButtons(){
  const buttonRow = document.getElementById("dropButtons");
  for(let x = 0; x < COLS; x++){
    const button = document.createElement("button")
    button.setAttribute("class", "dropButton")
    button.setAttribute("id", x)
    button.addEventListener("click", columnDrop(currentPlayer, x, board))
    buttonRow.appendChild(button)
    console.log(`Building button ${x}`)
  }
  console.log(board)
}

window.onload = initialize;
