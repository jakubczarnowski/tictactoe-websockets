import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<Flex direction="column" minH="100vh" p={5}>
			<Flex ml={"auto"} p={"10px"}>
				<ColorModeSwitcher />
			</Flex>
			{children}
		</Flex>
	);
};

export default Layout;
