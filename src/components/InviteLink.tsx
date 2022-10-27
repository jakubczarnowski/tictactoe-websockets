import { Flex, Input, theme, Tooltip, useClipboard, useColorModeValue, Text } from "@chakra-ui/react";
import React from "react";
import PageWrapper from "../layout/PageWrapper";

type Props = {
	link: string;
};

const InviteLink = ({ link }: Props) => {
	const currentColor = useColorModeValue(theme.colors.black, theme.colors.white);
	const { hasCopied, onCopy } = useClipboard(link);
	return (
		<PageWrapper column>
			<Tooltip
				label={hasCopied ? "Check Your Clipboard!" : "Copy to clipboard!"}
				fontSize={"1.6rem"}
				p={3}
				arrowSize={20}
				borderRadius={"3xl"}
				mb={2}
				isOpen
				hasArrow
				placement="top"
			>
				<Input
					maxW={{ sm: "100%", md: "60%" }}
					p={8}
					readOnly={true}
					borderColor={currentColor}
					borderWidth={3}
					fontSize={{ sm: "1.3rem", md: "2rem" }}
					textAlign="center"
					onClick={(e) => {
						e.currentTarget.select();
						onCopy();
					}}
					value={link}
				/>
			</Tooltip>
			<Text variant="basic">Send the link to your friend!</Text>
		</PageWrapper>
	);
};

export default InviteLink;
