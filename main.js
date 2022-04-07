//a global array, which holds 9 values for each position/button in the grid.

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
// a variable to document if there is a winner
let winner = false;

//a variable for game count
let gameCount = 0;

//
let player1Wins = 0; 
let player2Wins = 0; 
let drawCount = 0;

// a variable to save the single winner combination array that wins
let winnerCombination = [];

// an array to save the final globalArray state after each game
let gameStatesArray = [];


//method for changing move order
changeMoveOrder = () => {
  if (moveOrder == "X") {
    moveOrder = "O";
  } else if (moveOrder == "O") {
    moveOrder = "X";
  }
}
//method for when there is a winner
handleWinner = () => {
  checkGameCount();
  highlightWinnerCombination();
  makeNextGameButtonAppear();
  // storeGameState()
}

checkGameCount = () => {
  if (moveOrder == "X" && winner == true) {
    player1Wins += 1;
  } else if (moveOrder == "O" && winner == true) {
    player2Wins += 1;
  } else {
    drawCount += 1;
  }
  gameCount = player1Wins + player2Wins + drawCount;
  console.log(player1Wins, player2Wins, drawCount, gameCount);
}

//method for storing game state after a win
storeGameState = () => {
    gameStatesArray[gameStatesArray.length] = globalArray.slice();
    console.log(gameStatesArray);
  }

//method for highlighting winner combination
highlightWinnerCombination = () => {
  for (i=0; i < winnerCombination.length; i++) {
    buttons[winnerCombination[i]].classList.add("button--winner");
  }
}


//method for setting final values of the globalArray and displaying nextGameButton 
makeNextGameButtonAppear = () => {
  nextGamebutton.classList.remove("next-game-button--disappear");
  // nextGamebutton.style.display = "block";
}

//method for when nextGameButton is clicked
handleNextGameButton = () => {
  globalArray = ["", "", "", "", "", "", "", "", ""];
  winner = false;
  winnerCombination = [];
  moveOrder = "X";
  buttons.forEach(button => {
    button.innerHTML = "";
    // nextGamebutton.style.display = "none";
    button.classList.remove("button--winner");
  })
  nextGamebutton.classList.add("next-game-button--disappear");
}

//method for checking game end if there is no winner
const checkGameEnd = () => {
  console.log(globalArray);
  if (!globalArray.includes("")) {
    console.log("pass");
    checkGameCount();
    makeNextGameButtonAppear();
  }
}

//method for checking winner
checkWinner = () => {
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

const buttons = document.querySelectorAll(".button");
console.log(buttons);

const nextGamebutton = document.querySelector(".next-game-button");
nextGamebutton.classList.add("next-game-button--disappear");

buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    console.log(button);
    console.log(event);
    console.log(button.value);
    console.log(moveOrder);
    if (event.target.innerHTML == "") {
      event.target.innerHTML = moveOrder;
      globalArray[button.value] = moveOrder;
      checkWinner();
      changeMoveOrder();
    } //this if statement is to ensure that only empty buttons get assigned innerHTML value
  })
})

nextGamebutton.addEventListener("click", handleNextGameButton)