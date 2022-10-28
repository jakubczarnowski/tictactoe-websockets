import { Box } from "@chakra-ui/react";
import React from "react";
import GameResult from "../types/GameResult";
import ITile from "../types/Tile";

type Props = {
	tile: ITile;
	onClick: () => void;
	gameResult: GameResult;
};

const Tile = ({ tile, onClick, gameResult }: Props) => {
	return (
		<Box
			sx={{
				background: "gray.500",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "2rem",
				height: { lg: "75px", base: "50px" },
				width: { lg: "75px", base: "50px" },
				color: "black",
				userSelect: "none",
				borderRadius: "10px",
			}}
			_hover={{ transform: "scale(105%)" }}
			_active={{ transform: "scale(95%)" }}
			onClick={() => {
				if (tile === ITile.NONE && gameResult === GameResult.PLAYING) {
					onClick();
				}
			}}
		>
			{tile}
		</Box>
	);
};

export default Tile;
