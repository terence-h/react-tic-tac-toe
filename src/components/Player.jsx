import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
    // Used to determined whether React needs to reexecute this component to update the contents.
    const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	function onEditClick() {
        // Since the new state depends on the previous state value, we need to pass a function instead
        // so that React will call this function automatically to receive the latest state value.
        // e.g. doing setIsEditing(!isEditing) will schedule a state update but does not happen immediately.
        // This will be an issue if we want to use isEditing again in this function which will return the old state value.
		setIsEditing((editing) => !editing);
	}

    function onPlayerNameChanged(event) {
        setPlayerName(event.target.value);
    }

    // Display different content depending on the isEditing boolean
	let playerNameContainer = isEditing ? (
		<input type="text" required value={playerName} onChange={onPlayerNameChanged}/>
	) : (
		<span className="player-name">{playerName}</span>
	);

	return (
		<li className={isActive ? "active" : undefined}>
			<span className="player">
				{playerNameContainer}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={onEditClick}>{isEditing ? "Save" : "Edit"}</button>
		</li>
	);
}
