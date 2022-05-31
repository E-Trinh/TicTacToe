//Player factory
const playerFactory = (name, character) => {
    return {
        name,
        character
    };
};


//gameBoard module, keeps track and manages the board logic
const gameBoard = (function() {
    "use strict";
    const board = Array(9).fill("");
    const disabled = true;

    //gets the string stored in the board at the given index
    const get = index => {
        return board[index];
    };

    //fills in the board with a character at the specified index
    const place = (character, index) => {
        board[index] = character; 
        if (checkWin()) {
            return "win";
        } else {
            return checkTie() ? "tie" : false;
        }
    };

    //checks if the current player has won
    const checkWin = () => {
        if (board[0] === board[1] && board[1] === board[2] && board[0] != "") {
            return true;
        } else if (board[3] === board[4] && board[4] === board[5] && board[3] != "") {
            return true;
        } else if (board[6] === board[7] && board[7] === board[8] && board[6] != "") {
            return true;
        } else if (board[0] === board[3] && board[3] === board[6] && board[0] != "") {
            return true;
        } else if (board[1] === board[4] && board[4] === board[7] && board[1] != "") {
            return true;
        } else if (board[2] === board[5] && board[5] === board[8] && board[2] != "") {
            return true;
        } else if (board[0] === board[4] && board[4] === board[8] && board[0] != ""){
            return true;
        } else if (board[2] === board[4] && board[4] === board[6] && board[2] != "") {
            return true;
        } else {
            return false;
        }
    };

    //check if there is a tie
    const checkTie = () => {
        for (let i = 0; i < 9; i++) {
            if (get(i) === "") {
                return false;
            }
        }
        return true;
    };
    
    //empties the board
    const reset = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = "";
        }
    }

    return {
        disabled,
        place,
        get,
        reset,
    }
})();

//displayController module, handles all DOM for the web page
const displayController = (function() {
    "use strict";
    //used for intializing the boardDisplay variable, gets a pointer to each box
    const getDisplay = () => {
        const display = []
        for (let i = 0; i < 9; i++) {
            display.push(document.querySelector("#box-" + i));
            display[i].dataset.index = i;
            display[i].addEventListener("click", (event) => {
                gameplayController.userClick(event.target.dataset.index);
            });
        }
        return display;
    };

    //used for giving the two controls button event listeners
    const setupInfo = () => {
        document.getElementById("play").addEventListener("click", () => {
            gameplayController.play();
        });
        document.getElementById("reset").addEventListener("click", () => {
            gameplayController.reset();
        })
    }

    const boardDisplay = getDisplay();
    setupInfo();
    const playerOneNameBox = document.getElementById("player-one");
    const playerTwoNameBox = document.getElementById("player-two");

    //fills in the board in the HTML document with the character given at the index
    const place = (character, index) => {
        boardDisplay[index].textContent = character;
    };

    //displays the name of the winner
    const displayWinner = name => {
        document.getElementById("message").textContent = name + " has Won!"
    };

    //displays that the game has tied
    const displayTie = () => {
        document.getElementById("message").textContent = "Game has Tied!"
    };

    //empties the HTML board
    const reset = () => {
        for (let i = 0; i < 9; i++) {
            boardDisplay[i].textContent = "";
        }
        document.getElementById("message").textContent = "Game Reset"
    };

    //displays the turn of the name parameter
    const showTurn = name => {
        document.getElementById("message").textContent = name + " turn! Select a box!";
    };

    //gets the name the user inputted in the HTML input
    const getPlayerOneName = () => {
        return document.getElementById("player-one").value;
    };

    //gets the name the user inputted in the HTML input
    const getPlayerTwoName = () => {
        return document.getElementById("player-two").value;
    }; 

    return {
        place,
        displayWinner,
        displayTie,
        reset,
        showTurn,
        getPlayerOneName,
        getPlayerTwoName,
    }
})();

//gameplayController module, handles the flow of the game
const gameplayController = (function() {
    "use strict"
    let playerOne = playerFactory("Player One", "X");
    let playerTwo = playerFactory("Player Two", "O");
    let playerTurn = playerOne;

    //places a mark on board, checks win and tie conditions, and alternates the player turn
    const userClick = (index) => {
        if (gameBoard.get(index) == "" && !gameBoard.disabled) {
            const result = gameBoard.place(playerTurn.character, index);
            displayController.place(playerTurn.character, index);
            if (result === "win") {
                displayController.displayWinner(playerTurn.name);
                gameBoard.disabled = true;
            } else if (result === "tie") {
                displayController.displayTie();
                gameBoard.disabled = true;
            } else {
                playerTurn = playerTurn == playerOne ? playerTwo : playerOne;
                displayController.showTurn(playerTurn.name);
            }
        }
    };

    //sets the two players name and resets the board
    const play = () => {
        playerOne.name = displayController.getPlayerOneName();
        playerTwo.name = displayController.getPlayerTwoName();
        reset();
    }

    //resets both the javascript board and the HTML board
    const reset = () => {
        gameBoard.reset();
        displayController.reset();
        gameBoard.disabled = false;
        displayController.showTurn(playerTurn.name);
    }

    return {
        userClick,
        play,
        reset
    }
})();
