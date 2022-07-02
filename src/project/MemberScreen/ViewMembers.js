import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import one from "./one.png";
const ViewMembers = () => {
	const user = useSelector((state) => state.user);
	const [members, setMembers] = useState({});

	const getMembers = async () => {
		const url = "http://localhost:2233";
		const newURL = `${url}/api/admin/${user.admin}`;

		await axios
			.get(newURL)
			.then((res) => {
				setMembers(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	useEffect(() => {
		getMembers();
	}, []);

	return (
		<Container>
			<TableHolder>
				<MyTable>
					<HeaderTable bg>
						<Title bl>User</Title>
						<Email bl>Email</Email>
						<Role bl>Role</Role>
						<Role bl>Phone No</Role>
						<Status bl>Status</Status>
					</HeaderTable>
					{members?.member?.map((props) => (
						<HeaderTable key={props._id}>
							<Title1>
								{props?.avatar ? (
									<Image scr={props.avatar} />
								) : (
									<Image src={one} />
								)}
								<TitleHolder>
									<Name>{props.fullName}</Name>
									{props.DisplayName ? (
										<DisplayName>{props.displayName}</DisplayName>
									) : (
										<DisplayName>No displayName yet</DisplayName>
									)}
								</TitleHolder>
							</Title1>
							<Email>{props.email}</Email>
							<Role>{props.status}</Role>

							{props.phone ? (
								<Role> {props.phone}</Role>
							) : (
								<Role> No Phone Numb. yet</Role>
							)}

							<Status>
								<Active>Active</Active>
							</Status>
						</HeaderTable>
					))}
				</MyTable>
			</TableHolder>
		</Container>
	);
};

export default ViewMembers;

const Active = styled.div`
	width: 60%;
	background-color: #742e9d;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
	font-size: 13px;
	padding: 5px 0;
`;

const DisplayName = styled.div`
	font-size: 13px;
`;
const Name = styled.div`
	margin-bottom: 5px;
	font-weight: 700;
`;

const TitleHolder = styled.div`
	display: inline-block;
	vertical-align: top;
	line-height: 100%;
`;

const Title1 = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 350px;
	padding-left: 10px;
	vertical-align: top;
`;

const Image = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #742e9d;
	object-fit: cover;
	display: inline-block;
	vertical-align: top;
	margin-right: 10px;
`;

const TableHolder = styled.div`
	justify-content: center;
	display: flex;
	width: 100%;
`;

const Title = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 350px;
	padding-left: 10px;
`;

const Email = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 250px;
	padding-left: 10px;
	font-size: 12px;
	font-weight: 500;
	margin-left: ${({ ml }) => (ml ? "20px" : "")};
`;

const Role = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 150px;
	padding-left: 10px;
	margin-left: ${({ ml }) => (ml ? "20px" : "")};
	font-size: 13px;
`;

const Status = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 150px;
	padding-left: 10px;
`;

const HeaderTable = styled.div`
	display: inline-block;
	background-color: ${({ bg }) => (bg ? "rgba(0, 0, 0, 0.1)" : "#f9fafc")};
	border-bottom: 1px solid silver;
	padding: 10px 0;
	transition: all 350ms;
	vertical-align: auto;
	width: 100%;
	:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
`;

const MyTable = styled.div`
	overflow-x: scroll;
	overflow-y: hidden;
	white-space: nowrap;
	margin-right: 20px;
	width: 100%;
	background-color: #f9fafc;
	display: flex;
	flex-direction: column;
`;

const Wrapper = styled.div`
	margin-top: 30px;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	display: flex;
	justify-content: center;
`;

const Container = styled.div`
	width: calc(100vw - 300px);
	min-height: 50vh;
	height: 100%;
	display: flex;
	position: absolute;
	right: 0;
	top: 70px;
	flex-direction: column;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;
