import { Box, Button, Circle, Fade, Flex, Spinner, Stack, Text, theme, useColorModeValue, useInterval, useToast } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router";
import Error from "../../components/Error";
import InviteLink from "../../components/InviteLink";
import Loading from "../../components/Loading";
import RoomFull from "../../components/RoomFull";
import Tile from "../../components/Tile";
import UserLeft from "../../components/UserLeft";
import { GameContext } from "../../providers/gameprovider/GameProvider";
import GameResult from "../../types/GameResult";
import RoomState from "../../types/RoomState";

type Props = {};
const frontendDomain = import.meta.env.VITE_FRONTEND_URL || "http://127.0.0.1:5173/";

const GamePage = (props: Props) => {
	const { roomId } = useParams<{ roomId: string }>();
	const mainColor = useColorModeValue(theme.colors.black, theme.colors.white);
	const game = useContext(GameContext);

	const winMapping: Partial<Record<keyof typeof GameResult, string>> = {
		[GameResult.DRAW]: "Draw!",
		[GameResult.WIN]: "You won!",
		[GameResult.LOSE]: "You lost!",
	};

	if (!game) {
		return <></>;
	}

	if (game.roomState !== RoomState.PLAYING) {
		return GameStates(roomId, game.roomState);
	}

	const rematchToast = useToast({
		position: "top",
		duration: 9000,
		isClosable: true,
		title: "Your opponent has requested a rematch!",
		description: "Click rematch to accept!",
		status: "info",
	});

	useEffect(() => {
		if (game.enemyRequestedRematch) {
			rematchToast();
		}
		return () => {
			rematchToast.closeAll();
		};
	}, [game.enemyRequestedRematch]);

	return (
		<>
			<Flex justify={"center"} alignItems={"center"} direction="column">
				<Flex gap={"10px"}>
					<Text variant="basic" fontWeight="bold">
						{game.playerScore}
					</Text>
					<Text variant="basic" fontWeight="bold">
						:
					</Text>
					<Text variant="basic" fontWeight="bold">
						{game.opponentScore}
					</Text>
				</Flex>
				<Flex flex="0 0 80px" align="center">
					<Fade in={game.gameResult !== GameResult.PLAYING} unmountOnExit>
						<Button my={4} w={"100px"} border={`2px solid black`} onClick={() => game.rematch()}>
							{game.requestedRematch ? <Spinner /> : <Text>Rematch!</Text>}
						</Button>
					</Fade>
				</Flex>
				{game.gameResult !== GameResult.PLAYING && <Text variant="basic">{winMapping[game.gameResult]}</Text>}
				<Text variant="basic">Your Tile: {game.yourTile}</Text>
			</Flex>
			<Flex flex={1} flexDirection="row" align="center" justify={"center"} pt={{ md: 5 }} mb={5}>
				<Flex flex={1} flexDirection="column" align="center" justify={"center"} w={"50%"} gap={3}>
					{game.board.map((row, i) => {
						return (
							<Flex key={i} flex={1} flexDirection="row" gap={3}>
								{row.map((tile, j) => (
									<Tile key={`${i}${j}`} tile={tile} onClick={() => game.pickTile(i, j)} />
								))}
							</Flex>
						);
					})}
				</Flex>
			</Flex>
		</>
	);
};

function GameStates(id: string | undefined, roomState: RoomState) {
	const inviteLink = frontendDomain + "game/" + (id || "");
	switch (roomState) {
		case RoomState.LOADING:
			return <Loading roomState={roomState} />;
		case RoomState.WAITING:
			return <InviteLink link={inviteLink} />;
		case RoomState.LEFT:
			return <UserLeft />;
		case RoomState.FULL:
			return <RoomFull />;
		case RoomState.ERROR:
			return <Error />;
		default:
			return <p>Error has Occured</p>;
	}
}

export default GamePage;
