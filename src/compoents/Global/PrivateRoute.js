import React from "react";
import { useSelector } from "react-redux";
import decoder from "jwt-decode";
import Start from "../../project/builds/Start";
import MemberScreen from "../../project/MemberScreen/MemberScreen";
import AdminScreen from "../../project/AdminScreen/AdminScreen";

const PrivateRoute = () => {
	const user = useSelector((state) => state.user);
	console.log(user);
	if (user) {
		const token = decoder(user?.myToken);
		console.log("Token: ", token);
		if (token) {
			return token?.status === "admin" ? (
				<AdminScreen />
			) : token?.status === "member" ? (
				<MemberScreen />
			) : null;
		}
	}

	return <Start />;
};

export default PrivateRoute;
