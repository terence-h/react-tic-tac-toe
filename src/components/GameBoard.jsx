const gameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export default function GameBoard() {
	return (
        // Map every row then followed each individual grid in each row to generate the tic tac toe game board.
		<ol id="game-board">
			{gameBoard.map((row, rIndex) => (
				<li key={rIndex}>
					<ol>
						{row.map((playerSymbol, cIndex) => (
							<li key={cIndex}>
								<button>{playerSymbol}</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
