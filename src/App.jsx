import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function GetActivePlayer(gameTurns) {
	let currentPlayer = "X";

	// Since tic tac toe is a turn based game, we can assume that based on the previous turn (if exist)
	// will change to the other player's turn.
	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "O";
	}

	return currentPlayer;
}

function App() {
	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = GetActivePlayer(gameTurns);

	// This function is here as both Player and GameBoard component rely on it.
	// Player: requires to set the active player CSS class.
	// GameBoard: requires to determine which symbol is to be placed when selecting a cell.
	function onSelectCellCallback(rowIndex, colIndex) {
		setGameTurns((prevTurns) => {
			const updatedTurns = [
				{
					cell: { row: rowIndex, col: colIndex },
					player: GetActivePlayer(prevTurns),
				},
				...prevTurns,
			];

			return updatedTurns;
		});
	}

	return (
		<main>
			<div id="game-container">
				{/* Players info */}
				<ol id="players" className="highlight-player">
					<Player
						initialName="Player 1"
						symbol="X"
						isActive={activePlayer === "X"}
					/>
					<Player
						initialName="Player 2"
						symbol="O"
						isActive={activePlayer === "O"}
					/>
				</ol>
				<GameBoard onSelectCell={onSelectCellCallback} turns={gameTurns} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
