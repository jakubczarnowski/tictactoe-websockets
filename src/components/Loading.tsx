import { Flex, Spinner, theme, useColorModeValue, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PageWrapper from "../layout/PageWrapper";
import RoomState from "../types/RoomState";

type Props = {
	roomState: RoomState;
};

const Loading = ({ roomState }: Props) => {
	const handsColor = useColorModeValue(theme.colors.black, theme.colors.white);

	const startupToast = useToast({
		position: "bottom",
		duration: 9000,
		isClosable: true,
		title: "Server is booting Up!",
		description: "Wait about 20s, server has a cold start.",
		status: "info",
	});

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (roomState === RoomState.LOADING) {
				startupToast();
			}
		}, 4000);

		return () => {
			clearTimeout(timeout);
			startupToast.closeAll();
		};
	}, [roomState]);
	return (
		<PageWrapper>
			<Spinner color={handsColor} />
		</PageWrapper>
	);
};

export default Loading;
