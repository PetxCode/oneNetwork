import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MemberHeader from "./MemberHeader";
import MemberSideBar from "./MemberSideBar";

const MemberScreen = () => {
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

export default MemberScreen;

const Container = styled.div`
	display: flex;
`;
