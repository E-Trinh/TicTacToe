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
    const disabled = false;

    const get = index => {
        return board[index];
    };

    const place = (character, index) => {
        if (!disabled) {
            board[index] = character; 
            if (checkWin()) {
                return "win";
            } else {
                checkTie() ? "tie" : false;
            }
        }
    };

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

    const checkTie = () => {
        for (let i = 0; i < 9; i++) {
            if (board[0] === "") {
                return false;
            }
        }
        return true;
    };
    
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

    const place = (character, index) => {
        boardDisplay[index].textContent = character;
    };

    const displayWinner = name => {
        document.getElementById("message").textContent = name + " has Won!"
    };

    const displayTie = () => {
        document.getElementById("message").textContent = "Game has Tied!"
    }

    const reset = () => {
        for (let i = 0; i < 9; i++) {
            boardDisplay[i].textContent = "";
        }
        document.getElementById("message").textContent = "Game Reset"
    }

    const getPlayerOneName = () => {
        return document.getElementById("player-one").value;
    }

    const getPlayerTwoName = () => {
        return document.getElementById("player-two").value;
    }

    return {
        place,
        displayWinner,
        displayTie,
        reset,
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
            }
            playerTurn = playerTurn == playerOne ? playerTwo : playerOne;
        }
    };

    const play = () => {
        playerOne.name = displayController.getPlayerOneName();
        playerTwo.name = displayController.getPlayerTwoName();
    }

    const reset = () => {
        gameBoard.reset();
        displayController.reset();
    }

    return {
        userClick,
        play,
        reset
    }
})();
