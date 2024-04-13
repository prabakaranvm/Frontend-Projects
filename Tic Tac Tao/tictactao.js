//DOM Declaration
//Welcome
let welcomeDom = document.getElementById("welcomeId")
let startBtnDom = document.getElementById("startBtn")
let player1Dom = document.getElementById("player1")
let player2Dom = document.getElementById("player2")
//Game
let imgBgDom = document.getElementById("imgBgId")
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

//Welcome Page
startBtnDom.addEventListener("click", () => {
    let getPlayerName1 = player1Dom.value
    let getPlayerName2 = player2Dom.value
    if (getPlayerName1 !== "" && getPlayerName2 !== "") {
        welcomeDom.style.display = "none"
        imgBgDom.style.display = "block"
        gameStart(getPlayerName1, getPlayerName2)
    }
    else {
        alert("Please enter palyer names")
    }
})
function gameStart(playerName1, playerName2) {

    //Game Page
    cellDom.forEach(cell => cell.addEventListener("click", clickedCell))
    restartDom.addEventListener("click", restart)
    startGame()
    //Functions
    function startGame() {
        displayDom.textContent = `It's ${playerName1}'s turn`
    }
    function clickedCell() {
        const index = parseInt(this.getAttribute("index"))
        if (cellBoard[index] === "" && gameRunning == true) {
            updateCell(index)
            checkWinner()
        }
    }
    function updateCell(index) {
        cellBoard[index] = currentPlayer
        cellDom[index].textContent = currentPlayer
    }
    function changePlayer() {
        currentPlayer = (currentPlayer === "X") ? "O" : "X"
        displayDom.textContent = "It's " + (currentPlayer === "X" ? playerName1 : playerName2) + "'s turn";
    }
    function checkWinner() {
        let roundWon = false
        for (let start = 0; start < wins.length; start++) {
            const check = wins[start]
            const cellOne = cellBoard[check[0]]
            const cellTwo = cellBoard[check[1]]
            const cellThree = cellBoard[check[2]]
            if (cellOne == "" || cellTwo == "" || cellThree == "") {
                continue
            }
            if (cellOne == cellTwo && cellTwo == cellThree) {
                roundWon = true
                break
            }
        }
        if (roundWon) {
            resultDom.textContent = (currentPlayer === "X" ? playerName1 : playerName2) + " wins"
            displayDom.textContent = ""
            gameRunning = false
            cellDom.forEach((cell, index) => {
                if (wins.some(combination => combination.includes(index))) {
                    cell.style.backgroundColor = (cellBoard[index] === currentPlayer) ? '#4CAF50' : '#FF5252'
                    cell.style.color = 'white'
                }
            });
        }
        else if (!cellBoard.includes("")) {
            resultDom.textContent = "Match Draw"
            gameRunning = false
        }
        else {
            changePlayer()
        }
    }
    function restart() {
        cellBoard = ["", "", "", "", "", "", "", "", ""]
        cellDom.forEach(cell => {
            cell.textContent = ""
            cell.style.backgroundColor = ''
            cell.style.color = ''
        })
        resultDom.textContent = ""
        currentPlayer = "X"
        gameRunning = true
        startGame()
    }

}

