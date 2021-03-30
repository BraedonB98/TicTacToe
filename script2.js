const statusDisplay = document.querySelector('.game--status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
statusDisplay.innerHTML = (currentPlayer+"s turn");
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        
    }
    function handlePlayerChange() {
        if(currentPlayer == "X")
        {
            currentPlayer = "O";
            clickedCell.className = "xcell";
        }
        else
        {
            currentPlayer = "X";
            clickedCell.className = "ocell";
        }
        statusDisplay.innerHTML = (currentPlayer+"s turn");
    }
    
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        //checking if someone won
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
            statusDisplay.innerHTML = (currentPlayer + " has won!");
            gameActive = false;
            return;
        }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = "Its a tie";
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
   
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        } 
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }
function handleRestartGame() {
    gameActive = true;
    if(currentPlayer=="X")//Who ever wins goes first
    {
        currentPlayer=="O";
    }
    else{
        currentPlayer=="O";
    }
    gameState = ["", "", "", "", "", "", "", "", ""];//reset array
    statusDisplay.innerHTML = (currentPlayer + "s turn");
    document.querySelectorAll('.cell')
    .forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);