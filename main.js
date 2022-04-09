//a global array, which holds 9 values for each position/button in the main-grid.

let globalArray = ["", "", "", "", "", "", "", "", ""]

//a global variable that stores either 'X' or 'O'. It changes after every move to register the change of player.
let moveOrder = "X"

// an array of arrays, each storing integer values of possible winner combination indexes of globalArray.
let winnerCombinationsArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
// a boolean variable to document if there is a winner
let winner = false;

//variables for game count, player wins, and draw count
let gameCount = 0;
let player1Wins = 0; 
let player2Wins = 0; 
let drawCount = 0;

//variable for current game index
let currentGameIndex = 0;

// a variable to save the single winner combination array that wins in a game
let winnerCombination = [];

// an array to save the final globalArray state after each game; this is done to facilitate return to previous games.
let previousGameStatesArray = [];

//an array to store winner combination indexes of previous games; this is done to display the winning streaks of previous games.
let previousGameWinnerCombinations = [];

const buttons = document.querySelectorAll(".container_button");
console.log(buttons);

const nextGamebutton = document.querySelector(".next-game-button");
nextGamebutton.classList.add("next-game-button--disappear"); //this ensures the button is not visible at the beginning of the game.

const player1WinsButton = document.querySelector(".P1-score");
const player2WinsButton = document.querySelector(".P2-score");
const drawButton = document.querySelector(".draw-score");

const previousGameStateButton = document.querySelector(".game-state_previous");
const nextGameStateButton = document.querySelector(".game-state_next");


//method for changing move order
const changeMoveOrder = () => {
  if (moveOrder == "X") {
    moveOrder = "O";
  } else if (moveOrder == "O") {
    moveOrder = "X";
  }
}
//method for when there is a winner
const handleWinner = () => {
  checkGameCount();
  highlightWinnerCombination();
  makeNextGameButtonAppear();
  storeGameState();
}

//method for checking player wins and number of games.
const checkGameCount = () => {
  if (moveOrder == "X" && winner == true) {
    player1Wins += 1;
  } else if (moveOrder == "O" && winner == true) {
    player2Wins += 1;
  } else {
    drawCount += 1;
  }
  gameCount = player1Wins + player2Wins + drawCount;
  console.log(player1Wins, player2Wins, drawCount, gameCount);
  player1WinsButton.innerHTML = `${player1Wins}`;
  player2WinsButton.innerHTML = `${player2Wins}`;
  drawButton.innerHTML = `${drawCount}`; //this displays the score on the page
}

//method for storing the game-states and winner combinations after each game.
const storeGameState = () => {
    previousGameStatesArray[previousGameStatesArray.length] = globalArray.slice();
    console.log(previousGameStatesArray);
    previousGameWinnerCombinations[previousGameWinnerCombinations.length] = winnerCombination.slice();
    console.log(winnerCombination);
    console.log(previousGameWinnerCombinations);
  }

//method for highlighting winner combination
const highlightWinnerCombination = () => {
  for (i=0; i < winnerCombination.length; i++) {
    buttons[winnerCombination[i]].classList.add("container_button--winner");
  } 
}


//method for displaying nextGameButton 
const makeNextGameButtonAppear = () => {
  nextGamebutton.classList.remove("next-game-button--disappear");
  // nextGamebutton.style.display = "block";
}


//method for making main-grid empty
const resetGrid = () => {
  buttons.forEach(button => {
    button.innerHTML = "";
    // nextGamebutton.style.display = "none";
    button.classList.remove("container_button--winner");
  })
}

//method for when nextGameButton is clicked; it resets global variables, makes the grid buttons empty, increases the gameIndex by 1, and removes the nextGameButton display. 
const handleNextGameButton = () => {
  globalArray = ["", "", "", "", "", "", "", "", ""];
  winner = false;
  winnerCombination = [];
  moveOrder = "X";
  resetGrid();
  currentGameIndex += 1;
  nextGamebutton.classList.add("next-game-button--disappear");
}

//method for checking the game-end if there is no winner.
const checkGameEnd = () => {
  // console.log(globalArray);
  if (!globalArray.includes("")) {
    console.log("pass");
    checkGameCount();
    makeNextGameButtonAppear();
    storeGameState();
  }
}

//method for checking winner
const checkWinner = () => {
  console.log("winner start" );
  for (i = 0; i < winnerCombinationsArray.length; i++) {
    if (globalArray[winnerCombinationsArray[i][0]] == globalArray[winnerCombinationsArray[i][1]] && globalArray[winnerCombinationsArray[i][0]] == globalArray[winnerCombinationsArray[i][2]] && globalArray[winnerCombinationsArray[i][0]] != "") {
      console.log("winner " + winnerCombinationsArray[i]);
      winnerCombination = winnerCombinationsArray[i].slice();
      console.log(winnerCombination + " out")
      winner = true;
      break;
      // return winnerCombinationsArray[i];
    }
  }
  if (winner == true) {
    handleWinner();
    return;
  }
    checkGameEnd();
}

const handlePreviousGameStateButton = () => {
  resetGrid();
  console.log(buttons.length);
  for (i=0; i<buttons.length; i++) {
    console.log("previous Button");
    console.log(previousGameStatesArray[currentGameIndex-1][i]);
    buttons[i].innerHTML = previousGameStatesArray[currentGameIndex-1][i];
  }
  for (i=0; i<previousGameWinnerCombinations[currentGameIndex-1].length; i++) {
  buttons[previousGameWinnerCombinations[currentGameIndex-1][i]].classList.add("container_button--winner"); //this will ensure the winning buttons are highlighted when the previous game-state is displayed
  }
  currentGameIndex -= 1;
  makeNextGameButtonAppear();
}

const handleNextGameStateButton = () => {
  resetGrid();
  console.log(buttons.length);
  for (i=0; i<buttons.length; i++) {
    console.log("previous Button");
    console.log(previousGameStatesArray[currentGameIndex+1][i]);
    buttons[i].innerHTML = previousGameStatesArray[currentGameIndex+1][i];
  }
  for (i=0; i<previousGameWinnerCombinations[currentGameIndex+1].length; i++) {
    buttons[previousGameWinnerCombinations[currentGameIndex+1][i]].classList.add("container_button--winner"); //this will ensure the winning buttons are highlighted when the next game-state is displayed
    }
  currentGameIndex += 1;
  makeNextGameButtonAppear();
}

buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    console.log(button);
    console.log(event);
    console.log(button.value);
    console.log(moveOrder);
    if (event.target.innerHTML == "" && winner == false && currentGameIndex == previousGameStatesArray.length) //winner == false is added to prevent the next steps when a winner is already found. // currentGameIndex == previousGameStatesArray.length is to ensure that previous games are not clickable.
     {
      event.target.innerHTML = moveOrder;
      globalArray[button.value] = moveOrder;
      checkWinner();
      changeMoveOrder();
    } //this if statement is to ensure that only empty buttons get assigned innerHTML value
  })
})

nextGamebutton.addEventListener("click", handleNextGameButton);

previousGameStateButton.addEventListener("click", (event) => {
  console.log("previous");
  if (currentGameIndex > 0) { //this is to ensure that handlePreviousGameStateButton is only called when there is a previous game-state.
    handlePreviousGameStateButton();
  }
})

nextGameStateButton.addEventListener("click", (event) => {
  console.log("next");
  if (currentGameIndex < previousGameStatesArray.length) { //this is to ensure that handleNextGameStateButton is only called when there is a next game-state.
    handleNextGameStateButton();
  }
});