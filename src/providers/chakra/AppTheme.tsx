import { ThemeConfig, defineStyle, defineStyleConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
	useSystemColorMode: false,
	initialColorMode: "dark",
};
const basic = defineStyle({
	fontSize: { sm: "1.3rem", md: "2rem" },
});

export const textTheme = defineStyleConfig({
	variants: { basic },
});

const theme = extendTheme({
	config,
	components: {
		Text: textTheme,
	},
});

export default theme;
