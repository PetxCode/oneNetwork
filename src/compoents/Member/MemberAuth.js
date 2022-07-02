import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Start from "../../project/builds/Start";
import PrivateRoute from "../Global/PrivateRoute";
import MemberDirectComp from "./MemberDirectComp";
import ForgetPasswordChurchMember from "./MemberForgetPassword";
import MemberPasswordRedirect from "./MemberPasswordRedirect";
import MyChurchMember from "./MyChurchMember";
import ChangeMemberPassword from "./ResetMemberPassword";
import SigninChurchMember from "./SigninChurchMember";
import VerifySigninChurchMember from "./VerifySigninChurchMember";

const ChurchMemberAuth = () => {
	const user = useSelector((state) => state.user);

	return (
		<Routes>
			<>
				<Route path="/registerMember" element={<MyChurchMember />} />
				<Route path="/confirmMember" element={<MemberDirectComp />} />

				<Route path="/signinMember" element={<SigninChurchMember />} />
				<Route
					path="/forgetPasswordMember"
					element={<ForgetPasswordChurchMember />}
				/>
				<Route path="/redirectMember" element={<MemberPasswordRedirect />} />
				<Route
					path="/api/member/:id/:token"
					element={<VerifySigninChurchMember />}
				/>
				<Route
					path="/api/member/change/:id/:token"
					element={<ChangeMemberPassword />}
				/>
			</>
		</Routes>
	);
};

export default ChurchMemberAuth;
