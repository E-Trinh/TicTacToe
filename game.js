const playerFactory = (name, character) => {
    return {
        name,
        character
    };
};

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
    
    return {
        disabled,
        place,
        get,
    }
})();

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

    const boardDisplay = getDisplay();

    const place = (character, index) => {
        boardDisplay[index].textContent = character;
    };


    const displayWinner = name => {
        alert(name + " has won!");
    };

    const displayTie = () => {
        alert("Game has tied.");
    }

    return {
        place,
        displayWinner,
        displayTie,
    }
})();

const gameplayController = (function() {
    "use strict"
    const playerOne = playerFactory("One", "X");
    const playerTwo = playerFactory("Two", "O");
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

    return {
        userClick,
    }
})();
