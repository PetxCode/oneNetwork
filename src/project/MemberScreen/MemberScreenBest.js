import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MemberHeader from "./MemberHeader";
import MemberSideBar from "./MemberSideBar";

const AdminScreen = () => {
	const user = useSelector((state) => state.user);
	return (
		<>
			{user?.status === "member" ? (
				<Container>
					<div>
						<MemberSideBar />
					</div>
					<div>
						<MemberHeader />
					</div>
				</Container>
			) : null}
		</>
	);
};

export default AdminScreen;

const Container = styled.div`
	display: flex;
`;
