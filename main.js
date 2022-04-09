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

// a variable to save the single winner combination array that wins in a game
let winnerCombination = [];

// an array to save the final globalArray state after each game; this is done to facilitate return to previous games
let gameStatesArray = [];


const buttons = document.querySelectorAll(".container_button");
console.log(buttons);

const nextGamebutton = document.querySelector(".next-game-button");
nextGamebutton.classList.add("next-game-button--disappear"); //this ensure the button is not visible at the beginning of the game.

const player1WinsButton = document.querySelector(".P1-score");
const player2WinsButton = document.querySelector(".P2-score");
const drawButton = document.querySelector(".draw-score");


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

//method for storing the game-state after a win
const storeGameState = () => {
    gameStatesArray[gameStatesArray.length] = globalArray.slice();
    console.log(gameStatesArray);
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

//method for when nextGameButton is clicked; it resets global variables, makes the grid buttons empty, and removes the nextGameButton display. 
const handleNextGameButton = () => {
  globalArray = ["", "", "", "", "", "", "", "", ""];
  winner = false;
  winnerCombination = [];
  moveOrder = "X";
  buttons.forEach(button => {
    button.innerHTML = "";
    // nextGamebutton.style.display = "none";
    button.classList.remove("container_button--winner");
  })
  nextGamebutton.classList.add("next-game-button--disappear");
}

//method for checking the game-end if there is no winner.
const checkGameEnd = () => {
  console.log(globalArray);
  if (!globalArray.includes("")) {
    console.log("pass");
    checkGameCount();
    makeNextGameButtonAppear();
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


buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    console.log(button);
    console.log(event);
    console.log(button.value);
    console.log(moveOrder);
    if (event.target.innerHTML == "" && winner == false) //winner == false is added to prevent the next steps when a winner is already found.
     {
      event.target.innerHTML = moveOrder;
      globalArray[button.value] = moveOrder;
      checkWinner();
      changeMoveOrder();
    } //this if statement is to ensure that only empty buttons get assigned innerHTML value
  })
})

nextGamebutton.addEventListener("click", handleNextGameButton)

