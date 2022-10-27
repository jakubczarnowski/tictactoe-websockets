import React, { createContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import TGameContext from "../../types/GameContext";
import GameResult from "../../types/GameResult";
import RoomState from "../../types/RoomState";
import Tile from "../../types/Tile";
import TilePicked from "../../types/TilePicked";

type Props = {
	children: React.ReactNode;
};

export const GameContext = createContext<TGameContext | null>(null);

const GameProvider = ({ children }: Props) => {
	const { roomId } = useParams();
	const [roomState, setRoomState] = useState<RoomState>(RoomState.LOADING);
	const [gameResult, setGameResult] = useState<GameResult>(GameResult.PLAYING);
	const [board, setBoard] = useState<Tile[][]>([
		[Tile.NONE, Tile.NONE, Tile.NONE],
		[Tile.NONE, Tile.NONE, Tile.NONE],
		[Tile.NONE, Tile.NONE, Tile.NONE],
	]);
	const [yourTurn, setYourTurn] = useState<boolean>(false);
	const [enemyRequestedRematch, setEnemyRequestedRematch] = useState<boolean>(false);
	const [requestedRematch, setRequestedRematch] = useState<boolean>(false);
	const [yourTile, setYourTile] = useState<Tile>(Tile.NONE);
	const [opponentTile, setOpponentTile] = useState<Tile>(Tile.NONE);
	const [playerScore, setPlayerScore] = useState<number>(0);
	const [opponentScore, setOpponentScore] = useState<number>(0);
	const socketRef = useRef(io(import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/", { autoConnect: false }));
	const socket = socketRef.current;
	const suggestRematch = () => {
		setRequestedRematch(true);
		socket.emit("room:suggestRematch");
	};

	const pickTile = (row: number, col: number) => {
		if (!yourTurn) return;
		socket.emit("player:pickTile", { row: row, col: col });
		setYourTurn(false);
		handleUpdateBoard({ row, col }, yourTile);
	};
	const enemyPick = (row: number, col: number) => {
		setYourTurn(true);
		handleUpdateBoard({ row, col }, opponentTile);
	};
	// wziac to na backend
	const checkWinner = () => {
		const winPositions = [
			[board[0][0], board[0][1], board[0][2]],
			[board[1][0], board[1][1], board[1][2]],
			[board[2][0], board[2][1], board[2][2]],
			[board[0][0], board[1][0], board[2][0]],
			[board[0][1], board[1][1], board[2][1]],
			[board[0][2], board[1][2], board[2][2]],
			[board[0][0], board[1][1], board[2][2]],
			[board[0][2], board[1][1], board[2][0]],
		];
		for (const winPosition of winPositions) {
			if (winPosition[0] === winPosition[1] && winPosition[1] === winPosition[2] && winPosition[0] !== Tile.NONE) {
				if (winPosition[0] === yourTile) {
					setGameResult(GameResult.WIN);
					setPlayerScore(playerScore + 1);
				} else {
					setGameResult(GameResult.LOSE);
					setOpponentScore(opponentScore + 1);
				}
				return;
			}
		}
		if (board.every((row) => row.every((tile) => tile !== Tile.NONE))) {
			setGameResult(GameResult.DRAW);
		}
	};

	const handleRematch = () => {
		setRequestedRematch(false);
		setEnemyRequestedRematch(false);
		setGameResult(GameResult.PLAYING);
		setBoard([
			[Tile.NONE, Tile.NONE, Tile.NONE],
			[Tile.NONE, Tile.NONE, Tile.NONE],
			[Tile.NONE, Tile.NONE, Tile.NONE],
		]);
	};

	const handleUpdateBoard = (change: TilePicked, tile: Tile) => {
		const newBoard = [...board];
		newBoard[change.row][change.col] = tile;
		setBoard(newBoard);
	};
	useEffect(() => {
		if (!socket.connected) socket.connect();
		socket.emit("user:connecting", roomId);
		return () => {
			socket.disconnect();
		};
	}, []);
	useEffect(() => {
		checkWinner();
	}, [board]);

	useEffect(() => {
		socket.on("room:playing", (tile: Tile) => {
			setRoomState(RoomState.PLAYING);
		});
		socket.on("room:waiting", (tile: Tile) => {
			setYourTile(tile);
			setOpponentTile(tile === Tile.X ? Tile.O : Tile.X);
			setYourTurn(tile === Tile.X);
			setRoomState(RoomState.WAITING);
		});
		socket.on("room:full", () => {
			setRoomState(RoomState.FULL);
		});

		socket.on("room:left", () => {
			setRoomState(RoomState.LEFT);
		});
		socket.on("server:error", () => {
			setRoomState(RoomState.ERROR);
		});
		socket.on("room:rematchSuggested", () => {
			if (requestedRematch) {
				return;
			}
			setEnemyRequestedRematch(true);
		});
		socket.on("room:playRematch", () => {
			handleRematch();
		});
		socket.on("player:opponentPick", (change: TilePicked) => {
			enemyPick(change.row, change.col);
		});
		socket.on("player:setTile", (tile: Tile) => {
			setYourTile(tile);
			setOpponentTile(tile === Tile.X ? Tile.O : Tile.X);
			setYourTurn(tile === Tile.X);
		});
		return () => {
			socket.off("room:playing");
			socket.off("room:waiting");
			socket.off("room:left");
			socket.off("room:full");
			socket.off("server:error");
			socket.off("room:rematchSuggested");
			socket.off("room:playRematch");
			socket.off("player:opponentPick");
		};
	}, [opponentTile]);

	return (
		<GameContext.Provider
			value={{
				rematch: suggestRematch,
				roomState,
				gameResult,
				board,
				yourTurn,
				enemyRequestedRematch,
				requestedRematch,
				yourTile,
				playerScore,
				opponentScore,
				pickTile,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
