import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import React from "react";
import Layout from "../layout/Layout";
import AppTheme from "./chakra/AppTheme";
import RouterProvider from "./router/";

type Props = {};

const Providers = (props: Props) => {
	return (
		<ChakraProvider theme={AppTheme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<Layout>
				<RouterProvider />
			</Layout>
		</ChakraProvider>
	);
};

export default Providers;
