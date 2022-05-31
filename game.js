const playerFactory = (name, character) => {
    return {
        name,
        character
    };
};

const gameBoard = (function() {
    "use strict";
    const board = Array(9).fill("");

    const get = index => {
        return board[index];
    }

    const place = (character, index) => {
        board[index] = character; 
        return true;
    }

    return {
        place,
        get
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
    }

    const place = (character, index) => {
        boardDisplay[index].textContent = character;
        return true;
    }

    const boardDisplay = getDisplay();

    return {
        place,
    }
})();

const gameplayController = (function() {
    "use strict"
    const playerOne = playerFactory("One", "X");
    const playerTwo = playerFactory("Two", "O");
    let playerTurn = playerOne;


    const userClick = (index) => {
        if (gameBoard.get(index) == "") {
            gameBoard.place(playerTurn.character, index);
            displayController.place(playerTurn.character, index);
            playerTurn = playerTurn == playerOne ? playerTwo : playerOne;
        }
    }

    return {
        userClick,
    }
})();
