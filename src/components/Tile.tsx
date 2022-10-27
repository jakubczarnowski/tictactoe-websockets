import { Box } from "@chakra-ui/react";
import React from "react";
import ITile from "../types/Tile";

type Props = {
	tile: ITile;
	onClick: () => void;
};

const Tile = ({ tile, onClick }: Props) => {
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
				if (tile === ITile.NONE) {
					onClick();
				}
			}}
		>
			{tile}
		</Box>
	);
};

export default Tile;
