import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import * as HelperFunctions from "./HelperFunctions.js";

function App() {
	const [players, setPlayers] = useState(HelperFunctions.PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = HelperFunctions.GetActivePlayer(gameTurns);
	const gameBoard = HelperFunctions.GetGameBoard(gameTurns);
	const winner = HelperFunctions.GetWinner(gameBoard, players);
	const isDraw = gameTurns.length === 9 && !winner;

	// This function is here as both Player and GameBoard component rely on it.
	// Player: requires to set the active player CSS class.
	// GameBoard: requires to determine which symbol is to be placed when selecting a cell.
	function onSelectCellCallback(rowIndex, colIndex) {
		setGameTurns((prevTurns) => {
			const updatedTurns = [
				{
					cell: { row: rowIndex, col: colIndex },
					player: HelperFunctions.GetActivePlayer(prevTurns),
				},
				...prevTurns,
			];

			return updatedTurns;
		});
	}

	function restartGame() {
		setGameTurns([]);
	}

	function onPlayerNameChanged(symbol, newName) {
		setPlayers((prevPlayers) => {
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
