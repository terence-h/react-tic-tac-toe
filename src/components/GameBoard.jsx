import { useState } from "react";

const initialGrid = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
    const [gameBoard, setGameBoard] = useState(initialGrid);

    function onSelectCell(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            // Instead of mutating the original nested array, we will create deep copy by spreading the nested array into a new object.
            // If we were to update the old value directly, this will be done BEFORE the scheduled state update by React. It will causes bugs
            // if there are multiple places that are scheduling state updates for the same state.
            const updatedBoard = [...prevGameBoard.map(row => [...row])];
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedBoard;
        });

        // This function is defined in the App component
        onSelectSquare();
    }
    
	return (
        // Map every row then followed each individual grid in each row to generate the tic tac toe game board.
		<ol id="game-board">
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button onClick={() => onSelectCell(rowIndex, colIndex)}>{playerSymbol}</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
