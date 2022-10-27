import GameResult from "./GameResult";
import RoomState from "./RoomState";
import Tile from "./Tile";

export default interface GameContext {
	roomState: RoomState;
	gameResult: GameResult;
	board: Tile[][];
	enemyRequestedRematch: boolean;
	requestedRematch: boolean;
	yourTurn: boolean;
	yourTile: Tile;
	rematch: () => void;
	playerScore: number;
	opponentScore: number;
	pickTile: (row: number, col: number) => void;
}
