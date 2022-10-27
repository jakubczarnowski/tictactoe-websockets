import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import GamePage from "../../pages/GamePage";
import HomePage from "../../pages/HomePage";
import GameProvider from "../gameprovider";

type Props = {};

const RouterProvider = (props: Props) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route
					path="game/:roomId"
					element={
						<GameProvider>
							<GamePage />
						</GameProvider>
					}
				></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RouterProvider;
