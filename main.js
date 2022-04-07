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

//method for storing game state after a win
storeGameState = () => {
    gameStatesArray[gameStatesArray.length] = globalArray.splice(0, 8);
    console.log(gameStatesArray);
    // highlightWinnerCombination();
    setEndGameValues();
  }

//method for highlighting winner combination
highlightWinnerCombination = () => {
  for (i=0; i = winnerCombination.length; i++) {
    buttons[winnerCombination[i]].classList.add("button--winner");
  }
}


//method for setting final values of the globalArray and displaying nextGameButton 
setEndGameValues = () => {
  globalArray = ["", "", "", "", "", "", "", "", ""];
  console.log(globalArray);
  nextGamebutton.classList.remove("next-game-button--disappear");
  // nextGamebutton.style.display = "block";

}

//method for when nextGameButton is clicked
handleNextGameButton = () => {
  buttons.forEach(button => {
    button.innerHTML = "";
    nextGamebutton.classList.add("next-game-button--disappear");
    // nextGamebutton.style.display = "none";
  })
}

//method for checking game end if there is no winner
const checkGameEnd = () => {
  if (globalArray.includes(!"")) {
    setEndGameValues();
  }
}

//method for checking winner
checkWinner = () => {
  for (i = 0; i < winnerCombinationsArray.length; i++) {
    if (globalArray[winnerCombinationsArray[i][0]] == globalArray[winnerCombinationsArray[i][1]] && globalArray[winnerCombinationsArray[i][0]] == globalArray[winnerCombinationsArray[i][2]] && globalArray[winnerCombinationsArray[i][0]] != "") {
      console.log(winnerCombinationsArray[i]);
      winnerCombination = winnerCombinationsArray[i].splice(0,2);
      storeGameState();
      // return winnerCombinationsArray[i];
    }
    else {
      checkGameEnd();
    }
  }
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
      changeMoveOrder();
      checkWinner();
    } //this if statement is to ensure that only empty buttons get assigned innerHTML value
  })
})

nextGamebutton.addEventListener("click", handleNextGameButton)