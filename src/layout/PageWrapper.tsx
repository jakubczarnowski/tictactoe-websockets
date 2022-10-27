import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
	column?: boolean;
};

const PageWrapper = ({ children, column }: Props) => {
	return (
		<Flex justifyContent={"center"} alignItems={"center"} flex={1} flexDirection={column ? "column" : "row"} gap={"1rem"} p={10}>
			{children}
		</Flex>
	);
};

export default PageWrapper;
