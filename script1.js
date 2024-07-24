document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");

    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

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

    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('id').substring(5));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(`cell-${currentPlayer}`);

        checkWin();
        checkDraw();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    };

    const checkWin = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (
                gameState[a] !== "" &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                return;
            }
        }
    };

    const checkDraw = () => {
        if (gameState.every(cell => cell !== "")) {
            status.textContent = "It's a draw!";
            gameActive = false;
        }
    };

    const handleReset = () => {
        currentPlayer = "X";
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];
        status.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("cell-X", "cell-O");
        });
    };

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    resetButton.addEventListener("click", handleReset);
});
