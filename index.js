const ROWS = 6;
const COLS = 7;

let display = []
let board = Array(ROWS).fill().map(col => Array(COLS).fill(0))
let active = Array(COLS).fill(5)

const TIME_STEP = 75;
let INTERVAL_POINTER = null;

let opponent
let currentPlayer = 1
let previousHover

function getCurrentColor(){
  return currentPlayer === 1 ? 'black' : 'red'
}

function initialize() {
  buildGrid();
  initDropButtons();
  initButtons();
  opponent = new Player(1)
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

const pressButton = function(player, column){
  //console.log(column, active[column], board)
  //board[active[column]][column].setAttribute("class", player === 1 ? "black" : "red")
  return () => {
    columnDrop(player, column)
    columnDrop(currentPlayer, opponent.decide(board, active))
  }
}

const columnDrop = function(player, column){
  if(currentPlayer && currentPlayer !== player) return
  const [y, x] = [active[column], column]
  //console.log(`Hello Player ${player}.  You've selected ${x}, ${y}`)
  display[y][x].setAttribute("class", player === 1 ? "black" : "red")
  board[y][x] = player
  active[column]--
  previousHover = null
  currentPlayer = 3 - currentPlayer
}

const columnHover = function(player, column){
  return () => {
    const [y , x] = [active[column], column]
    display[y][x].setAttribute("class", player === 1 ? "grey" : "pink")
    if(previousHover) previousHover.setAttribute("class", "empty")
    previousHover = display[y][x]
  }
}

function buildGrid() {
  const grid = document.getElementById("grid");
  for (let y = 0; y < ROWS; y++) {
    const row = []
    for (let x = 0; x < COLS; x++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "empty");
      cell.setAttribute("id", `${x},${y}`);
      //cell.addEventListener("click", pressButton(currentPlayer, x))
      grid.appendChild(cell);
      row.push(cell)
    }
    display.push(row)
  }
  //display = display.reverse()
  console.log(board)
}

function initDropButtons(){
  const buttonRow = document.getElementById("dropButtons");
  for(let x = 0; x < COLS; x++){
    const button = document.createElement("button")
    button.setAttribute("class", "dropButton")
    button.setAttribute("id", x)
    button.addEventListener("click", pressButton(1, x));
    button.addEventListener("mouseover", columnHover(1, x));
    buttonRow.appendChild(button)
    console.log(`Building button ${x}`)
  }
}

window.onload = initialize;
