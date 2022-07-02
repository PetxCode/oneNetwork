import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChurchMemberAuth from "./compoents/Member/MemberAuth";
import ChurchAuth from "./compoents/Register/ChurchAuth";
import AdminRoutes from "./project/AdminScreen/AdminRoutes";
import AdminScreen from "./project/AdminScreen/AdminScreen";
import MemberRoutes from "./project/MemberScreen/MemberRoutes";
import MemberScreen from "./project/MemberScreen/MemberScreen";
import ScrollToTop from "./ScrollToTop";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<ScrollToTop>
					<ChurchAuth />
					<ChurchMemberAuth />

					<AdminScreen />
					<AdminRoutes />

					<MemberRoutes />
					<MemberScreen />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default App;
