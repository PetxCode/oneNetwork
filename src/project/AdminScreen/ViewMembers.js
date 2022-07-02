import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import pix from "./pii.png";

const ViewMembers = () => {
	const user = useSelector((state) => state.user);
	const [viewMembers, setViewMembers] = useState({});

	const getMembers = async () => {
		const newURL = `http://localhost:2233/api/admin/${user._id}`;
		await axios
			.get(newURL)
			.then((res) => {
				setViewMembers(res.data.data);
			})
			.then((err) => {
				return console.log(err);
			});
	};

	useEffect(() => {
		getMembers();
		console.log(viewMembers);
	}, []);

	return (
		<Container>
			<Wrapper></Wrapper>

			<TableHolder>
				<MyTable>
					<HeaderTable bg>
						<Title bl>User</Title>
						<Email bl>Email</Email>
						<Role bl>Role</Role>
						<Status bl>Status</Status>
					</HeaderTable>

					{viewMembers?.member?.map((props) => (
						<HeaderTable key={props._id}>
							<Title1>
								{props?.avatar ? (
									<Image src={props?.avatar} />
								) : (
									<Image1 src={pix} />
								)}
								<TitleHolder>
									<Name>{props.fullName}</Name>

									{props?.displayName ? (
										<DisplayName>{props.displayName}</DisplayName>
									) : (
										<DisplayName>No displayName yet</DisplayName>
									)}
								</TitleHolder>
							</Title1>
							<Email1>{props.email}</Email1>
							<Role>{props.status}</Role>
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
	font-size: 12px;
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

const Image1 = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #742e9d;
	object-fit: contain;
	display: inline-block;
	vertical-align: top;
	margin-right: 10px;
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

const Email1 = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 250px;
	padding-left: 10px;
	font-size: 12px;
	font-weight: 500;
`;
const Email = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 250px;
	padding-left: 10px;
`;

const Role = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 150px;
	padding-left: 10px;
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
	/* background-color: #f9fafc; */
	border-bottom: 1px solid silver;
	padding: 10px 0;
	transition: all 350ms;
	vertical-align: auto;
	/* overflow-x: scroll; */
	/* overflow-y: hidden; */
	/* white-space: nowrap; */
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
	/* width: 700px; */
	/* background-color: white; */
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
