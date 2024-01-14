import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";

function App() {

  const [activePlayer, setActivePlayer] = useState("X");

  // This function is here as both Player and GameBoard component rely on it.
  // Player: requires to set the active player CSS class.
  // GameBoard: requires to determine which symbol is to be placed when selecting a cell.
  function onSelectCellCallback() {
    setActivePlayer((currActivePlayer) => currActivePlayer === "X" ? "O" : "X");
  }

	return (
		<main>
			<div id="game-container">
				{/* Players info */}
				<ol id="players" className="highlight-player">
					<Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
					<Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
				</ol>
				<GameBoard onSelectSquare={onSelectCellCallback} activePlayerSymbol={activePlayer} />
			</div>
		</main>
	);
}

export default App;
