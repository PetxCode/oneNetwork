import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import pix from "./pii.png";

const url = "https://onechurch1.herokuapp.com";

const ViewMembers = () => {
	const user = useSelector((state) => state.user);
	const [viewMembers, setViewMembers] = useState({});

	const getMembers = async () => {
		const newURL = `${url}/api/admin/${user._id}`;
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

			<br />
			<br />
			<br />

			<DivData style={{ overflowX: "auto" }}>
				<table>
					<tr
						style={{
							backgroundColor: "#e0e1e2",
							height: "50px",
							paddingRight: "20px",
							paddingLeft: "20px",
						}}
					>
						<th
							style={{
								height: "50px",
								paddingRight: "20px",
								paddingLeft: "20px",
							}}
						>
							User
						</th>
						<th
							style={{
								height: "50px",
								paddingRight: "20px",
								paddingLeft: "20px",
							}}
						>
							Email
						</th>
						<th
							style={{
								height: "50px",
								paddingRight: "20px",
								paddingLeft: "20px",
							}}
						>
							Role
						</th>
						<th
							style={{
								height: "50px",
								paddingRight: "20px",
								paddingLeft: "20px",
							}}
						>
							Status
						</th>
					</tr>

					{viewMembers?.member?.map((props) => (
						<TRHold>
							<td>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										margin: "20px",
										minWidth: "200px",
									}}
								>
									<Image1 src={pix} />
									<div>
										<div style={{ fontWeight: "700" }}>Name</div>
										<div style={{ fontSize: "12px" }}>DisplayName</div>
									</div>
								</div>
							</td>

							<td
								style={{
									fontSize: "15px",
									padding: "0 15px",
									minWidth: "250px",
								}}
							>
								brighterdayscodelab@gmail.com
							</td>

							<td
								style={{
									margin: "10px",
									minWidth: "150px",
									paddingLeft: "30px",
									fontWeight: "500",
								}}
							>
								member
							</td>

							<td
								style={{
									margin: "10px",
									minWidth: "150px",
									paddingLeft: "10px",
									fontWeight: "500",
								}}
							>
								<Active>Active</Active>
							</td>
						</TRHold>
					))}
				</table>
			</DivData>
		</Container>
	);
};

export default ViewMembers;

const DivData = styled.div`
	border: 1 solid silver;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;
const TRHold = styled.tr`
	transition: all 350ms;
	:hover {
		background-color: rgba(0, 0, 0, 0.05);
		cursor: pointer;
	}
`;

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

const DisplayName = styled.td`
	font-size: 12px;
`;
const Name = styled.td`
	margin-bottom: 5px;
	font-weight: 700;
`;

const TitleHolder = styled.tr`
	display: inline-block;
	vertical-align: top;
	line-height: 100%;
`;

const Title1 = styled.tr`
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
	/* justify-content: center;
	display: flex; */
	overflow-x: auto;
	width: 100%;
`;

const Title = styled.th`
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
const Email = styled.th`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 250px;
	padding-left: 10px;
`;

const Role = styled.th`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 150px;
	padding-left: 10px;
`;

const Status = styled.th`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 150px;
	padding-left: 10px;
`;

const HeaderTable = styled.tr`
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

const MyTable = styled.table`
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
