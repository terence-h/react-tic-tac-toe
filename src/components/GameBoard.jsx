const initialGrid = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export default function GameBoard({ onSelectCell, turns }) {
	let gameBoard = initialGrid;

	// This will not run if turns is empty, therefore the initial game board will be used instead.
	for (const turn of turns) {
		// We can destructure the object to allow us to easily set the game board's grid.
		const { cell, player } = turn;
		const { row, col } = cell;

		gameBoard[row][col] = player;
	}

	return (
		// Map every row then followed each individual grid in each row to generate the tic tac toe game board.
		<ol id="game-board">
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button onClick={() => onSelectCell(rowIndex, colIndex)} disabled={playerSymbol}>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
