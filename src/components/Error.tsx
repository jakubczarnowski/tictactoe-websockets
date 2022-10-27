import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";
import PageWrapper from "../layout/PageWrapper";

type Props = {};

const Error = (props: Props) => {
	const navigate = useNavigate();
	return (
		<PageWrapper column>
			<Text variant={"basic"} fontWeight="bold">
				Something went wrong.
			</Text>
			<Text variant="basic">Try again with new game!</Text>
			<Button onClick={() => navigate("/")}>Click to play again</Button>
		</PageWrapper>
	);
};

export default Error;
