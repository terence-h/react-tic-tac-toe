import { WINNING_COMBINATIONS } from "./winning-combinations";

export const PLAYERS = {
	X: "Player 1",
	O: "Player 2",
};

export const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export function GetActivePlayer(gameTurns) {
	let currentPlayer = "X";

	// Since tic tac toe is a turn based game, we can assume that based on the previous turn (if exist)
	// will change to the other player's turn.
	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "O";
	}

	return currentPlayer;
}

export function GetGameBoard(gameTurns) {
	// As objects are reference values, we do not want to modify the original object.
	// To create a brand new object, we can map the object and use the spread operator to populate each column cell.
	let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];

	// This will not run if turns is empty, therefore the initial game board will be used instead.
	for (const turn of gameTurns) {
		// We can destructure the object to allow us to easily set the game board's grid.
		const { cell, player } = turn;
		const { row, col } = cell;

		gameBoard[row][col] = player;
	}

	return gameBoard;
}

export function GetWinner(gameBoard, players) {
	let winner;

	for (const combination of WINNING_COMBINATIONS) {
		// Check the symbol on the grid based on each winning combinations
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}
	return winner;
}
