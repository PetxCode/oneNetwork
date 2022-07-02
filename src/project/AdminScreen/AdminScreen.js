import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";

const AdminScreen = () => {
	const user = useSelector((state) => state.user);
	return (
		<>
			{user?.status === "admin" ? (
				<Container>
					<div>
						<AdminSideBar />
					</div>
					<div>
						<AdminHeader />
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
