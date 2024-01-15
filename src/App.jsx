import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import * as HelperFunctions from "./HelperFunctions.js";

function App() {
	// State for player name and symbol (used to determine winner/draw)
	const [players, setPlayers] = useState(HelperFunctions.PLAYERS);

	// State for the game board grid
	const [gameTurns, setGameTurns] = useState([]);

	// Get the current status of the board and whether if there's a winner.
	const activePlayer = HelperFunctions.GetActivePlayer(gameTurns);
	const gameBoard = HelperFunctions.GetGameBoard(gameTurns);
	const winner = HelperFunctions.GetWinner(gameBoard, players);
	const isDraw = gameTurns.length === 9 && !winner;

	// This function is here as both Player and GameBoard component rely on it.
	// Player: requires to set the active player CSS class.
	// GameBoard: requires to determine which symbol is to be placed when selecting a cell.
	function onSelectCellCallback(rowIndex, colIndex) {
		// Due to the animation, there are few frames that players can click on the tile
		// while the animation is playing to mark a cell.
		if (winner || isDraw)
			return;

		setGameTurns((prevTurns) => {
			const updatedTurns = [
				// We can add in a new turn by spreading the existing turns then
				// adding a new object element into the first index.
				{
					cell: { row: rowIndex, col: colIndex },
					player: HelperFunctions.GetActivePlayer(prevTurns),
				},
				...prevTurns,
			];

			return updatedTurns;
		});
	}

	// To restart we just have to set the game board grid to an empty array and let React reexecute this component.
	// The reason this works is there will be no winner or draw since the board has been reset to the initial state.
	// Therefore, the win/draw screen will no longer be rendered.
	function restartGame() {
		setGameTurns([]);
	}

	function onPlayerNameChanged(symbol, newName) {
		setPlayers((prevPlayers) => {
			// We can modify the player name that needs to be changed by spreading both players info
			// and then adding the same index (the symbol in this case) to replace the same symbol element.
			return {
				...prevPlayers,
				[symbol]: newName,
			};
		});
	}

	return (
		<main>
			<div id="game-container">
				{/* Players info */}
				<ol id="players" className="highlight-player">
					<Player
						initialName={HelperFunctions.PLAYERS.X}
						symbol="X"
						isActive={activePlayer === "X"}
						onNameChanged={onPlayerNameChanged}
					/>
					<Player
						initialName={HelperFunctions.PLAYERS.O}
						symbol="O"
						isActive={activePlayer === "O"}
						onNameChanged={onPlayerNameChanged}
					/>
				</ol>
				{(winner || isDraw) && (
					<GameOver winner={winner} onRestart={restartGame} />
				)}
				<GameBoard onSelectCell={onSelectCellCallback} board={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
