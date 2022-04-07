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
// an array to save the final globalArray state after each game
let gameStatesArray = [""];

//method for assigning value to globalArray and display on click of a button 

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
  console.log(gameStatesArray);
  for (i = 0; i < gameStatesArray.length; i++) {
    gameStatesArray[i] = globalArray.splice(0, 8);
    console.log(gameStatesArray);
    setEndGameValues();
  }
}

//method for setting final values of the global 
setEndGameValues = () => {
  globalArray = ["", "", "", "", "", "", "", "", ""];
  console.log(globalArray);
  buttons.forEach(button => {
    button.innerHTML = "";
  })

}
//method for checking winner
checkWinner = () => {
  for (i = 0; i < winnerCombinationsArray.length; i++) {
    if (globalArray[winnerCombinationsArray[i][0]] == globalArray[winnerCombinationsArray[i][1]] && globalArray[winnerCombinationsArray[i][0]] == globalArray[winnerCombinationsArray[i][2]] && globalArray[winnerCombinationsArray[i][0]] != "") {
      console.log(winnerCombinationsArray[i]);
      storeGameState();
      return winnerCombinationsArray[i];
    }
  }
}


const buttons = document.querySelectorAll(".button");
console.log(buttons);

buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    console.log(button);
    console.log(event);
    console.log(button.value);
    globalArray[button.value] = moveOrder;
    if (event.target.innerHTML == "") {
      event.target.innerHTML = moveOrder;
    }
    changeMoveOrder();
    checkWinner();
  })
})
