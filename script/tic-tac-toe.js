const statusDisplay = document.querySelector('.status');

//initialization of the score counter variables 
let playerWins = 0;
let computerWins = 0;

let gameActive = true;
//randomly picks between x and o
//let currentPlayer = ['X','O'][Math.round(Math.random())];
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

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


//handels the click
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    //shows who the current player's turn it is 
    statusDisplay.innerHTML = currentPlayerTurn();
}

function checkWin(){

    var table = document.getElementById("table")
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c){
            roundWon = true;
            break
        }
    }
    
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;

        let myTable = document.getElementById('myTable');
        //Checks to see if the winner is "x" or the player
        if (currentPlayer ==="X"){
            //if the winner is the human player it incriments the score
            //counter "playerWins"
            playerWins += 1;
            //updates the score bar in the html
            myTable.rows[1].cells[0].innerHTML = playerWins;
        }
        //Checks to see if the winner is "O" or the computer
        if (currentPlayer ==="O"){
             //if the winner is the human player it incriments the score
            //counter "ComputerWins"
            computerWins += 1;
            //updates the score bar in the html
            myTable.rows[1].cells[1].innerHTML = computerWins;
        }

        statusDisplay.style.color = "rgb(251,100,204)";
        return roundWon;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return roundDraw;
    }


 return false;
}

function handleResultValidation() {
   
    //if it doesn find any empty squares and there is no 3 in a row then its a draw

    checkWin();

    if (gameActive){
         handlePlayerChange();
         handelComputerMove(); 
    }


}

function handelComputerMove(){
    if (currentPlayer==="O"){
        pickComputerMove();
    }

    if (!checkWin()){
      handlePlayerChange();
    }
    
}

function pickComputerMove(){
    while (true) {
        // loop through gameState and randomly fond an available spot
        var m = Math.floor(Math.random() * 8);
        if (gameState[m] === '');{
            //looking for empty spot
            break;
        
        } 
    }
    //m will have the computer move
    gameState[m]=currentPlayer
    document.getElementById(m).innerHTML = currentPlayer
    // querySelector('.cell').getAttributeNode(m).value = currentPlayer;


}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    //check to see if current cell is an available cell and game is active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);