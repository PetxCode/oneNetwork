import React from "react";
import { Route, Routes } from "react-router-dom";
import MyChurch from "./MyChurch";
import DirectComp from "./DirectComp";
import SigninChurch from "./SigninChurch";
import PasswordRedirect from "./PasswordRedirect";
import VerifySigninChurch from "./VerifySigninChurch";
import Start from "../../project/builds/Start";
import ForgetPasswordChurch from "./ForgetPassword";
import ChangePasswordChurch from "./ResetPassword";
import { useSelector } from "react-redux";
import PrivateRoute from "../Global/PrivateRoute";
import AdminScreen from "../../project/AdminScreen/AdminScreen";
import Private from "../Global/Private";
import JustLook from "./JustLook";

const ChurchAuth = () => {
	const user = useSelector((state) => state.user);

	return (
		<Routes>
			{/* {!user ? () :()} */}
			<>
				<Route path="/registerChurch" element={<MyChurch />} />
				<Route path="/just-look" element={<JustLook />} />
				<Route path="/confirmChurch" element={<DirectComp />} />

				<Route path="/signinChurch" element={<SigninChurch />} />
				<Route
					path="/forgetPasswordChurch"
					element={<ForgetPasswordChurch />}
				/>
				<Route path="/redirect" element={<PasswordRedirect />} />
				<Route path="/api/admin/:id/:token" element={<VerifySigninChurch />} />
				<Route
					path="/api/admin/change/:id/:token"
					element={<ChangePasswordChurch />}
				/>

				<Route
					path="adminScreen"
					element={
						<Private>
							<AdminScreen />
						</Private>
					}
				/>
			</>

			<Route
				path="/"
				element={
					<PrivateRoute>
						<Start />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default ChurchAuth;
