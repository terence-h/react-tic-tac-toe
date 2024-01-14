export default function GameBoard({ onSelectCell, board }) {
	return (
		// Map every row then followed each individual grid in each row to generate the tic tac toe game board.
		<ol id="game-board">
			{board.map((row, rowIndex) => (
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
