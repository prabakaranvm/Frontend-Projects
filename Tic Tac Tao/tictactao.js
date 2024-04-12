//DOM Declaration
let cellDom = document.querySelectorAll(".cell")
let displayDom = document.getElementById("displayId")
let resultDom = document.getElementById("resultId")
let restartDom = document.getElementById("restartId")
//Variable Declaration
const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
let cellBoard = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X"
let gameRunning = true

cellDom.forEach(cell => cell.addEventListener("click", clickedCell))
restartDom.addEventListener("click", restart)
startGame()
//Functions
function startGame() 
{
    displayDom.textContent = "Player X's turn"
}
function clickedCell() 
{
    const index = parseInt(this.getAttribute("index"))
    if (cellBoard[index] === "" && gameRunning == true) 
    {
        updateCell(index)
        checkWinner()
    }
}
function updateCell(index) 
{
    cellBoard[index] = currentPlayer
    cellDom[index].textContent = currentPlayer
}
function changePlayer() 
{
    currentPlayer = (currentPlayer === "X" ) ? "O" : "X"
    displayDom.textContent = "Player " + currentPlayer + "'s turn"
}
function checkWinner() 
{
    let roundWon = false
   for(let start = 0; start<wins.length; start++)
   {
        const check = wins[start]
        const cellOne = cellBoard[check[0]]
        const cellTwo = cellBoard[check[1]]
        const cellThree = cellBoard[check[2]]
        if(cellOne == "" || cellTwo == "" || cellThree == "")
        {
            continue    
        }
        if(cellOne == cellTwo && cellTwo == cellThree)
        {
            roundWon = true
            break
        }
   }
   if(roundWon)
   {
    resultDom.textContent = "Player " + currentPlayer + " wins"
    displayDom.textContent = ""
    gameRunning = false
   }
   else if(!cellBoard.includes(""))
   {
    resultDom.textContent = "Match Draw"
    gameRunning = false
   }
   else
   {
    changePlayer()
   }
}
function restart() {
    cellBoard = ["", "", "", "", "", "", "", "", ""]
    cellDom.forEach(cell => cell.textContent = "")
    resultDom.textContent = ""
    currentPlayer = "X"
    gameRunning = true
    startGame()
}


