import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const url = "https://onechurch1.herokuapp.com";

const ViewOrders = () => {
	const user = useSelector((state) => state.user);
	const [viewMembers, setViewMembers] = useState({});

	const getMembers = async () => {
		const newURL = `${url}/api/order/${user._id}`;
		await axios
			.get(newURL)
			.then((res) => {
				setViewMembers(res.data.data);
			})
			.then((err) => {
				return console.log(err);
			});
	};

	const seenOrdered = async (ID) => {
		const newURL = `${url}/api/order/${user._id}/${ID}/seen`;
		await axios.patch(newURL);
	};

	const deliveredOrdered = async (ID) => {
		const newURL = `${url}/api/order/${user._id}/${ID}/deliver`;
		await axios.patch(newURL);
	};

	useEffect(() => {
		getMembers();
	}, []);

	return (
		<Container>
			<WrapperHolder>
				<DivData style={{ overflowX: "auto" }}>
					<Table>
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
									fontWeight: "normal",
								}}
							>
								Order By
							</th>
							<th
								style={{
									height: "50px",
									paddingRight: "20px",
									paddingLeft: "20px",
									fontWeight: "normal",
								}}
							>
								Order What
							</th>
							<th
								style={{
									height: "50px",
									paddingRight: "20px",
									paddingLeft: "20px",
									fontWeight: "normal",
								}}
							>
								Status
							</th>
						</tr>

						{viewMembers?.order &&
							viewMembers?.order?.map((props) => (
								<TRHold>
									<tr>
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												marginTop: "10px",
												marginBottom: "10px",
												marginLeft: "20px",
												marginLeft: "30px",
												minWidth: "200px",
											}}
										>
											<div>
												{props.seen ? <NonVisibleIcon /> : <VisibleIcon />}
											</div>
											<div>
												<div style={{ fontWeight: "700" }}>{props.who}</div>
												<div>
													{props.displayName ? (
														<div>{props.displayName}</div>
													) : (
														<div
															style={{ fontWeight: "normal", fontSize: "10px" }}
														>
															No Display Name yet
														</div>
													)}
												</div>
											</div>
										</div>
									</tr>

									<td
										style={{
											fontSize: "15px",
											padding: "0 15px",
											minWidth: "250px",
											fontSize: "13px",
										}}
									>
										<Named>{props.what}</Named>
										<DisplayNamed>{props.detail}</DisplayNamed>
										<CostOrder>#{props.cost}.00</CostOrder>
									</td>

									<td
										style={{
											margin: "10px",
											minWidth: "250px",
											paddingLeft: "10px",
											fontWeight: "500",
											fontSize: "13px",
										}}
									>
										{props.delivered ? (
											<Active bg>Deliver</Active>
										) : (
											<Active>Not Deliver</Active>
										)}
									</td>
								</TRHold>
							))}
					</Table>
				</DivData>
			</WrapperHolder>
		</Container>
	);
};

export default ViewOrders;

const Table = styled.table`
	background-color: white;
	border: 1 solid silver;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const DivData = styled.div`
	/* width: 95%;
	display: flex;
	justify-content: center; */
	margin: 0 10px;
`;
const TRHold = styled.tr`
	transition: all 350ms;
	:hover {
		background-color: rgba(0, 0, 0, 0.05);
		cursor: pointer;
	}
`;

const DisplayNamed = styled.div`
	font-size: 10px;
	color: gray;
`;

const Named = styled.div`
	font-weight: 700;
	font-size: 13px;
`;

const CostOrder = styled.div`
	font-weight: 700;
	font-size: 13px;
	color: red;
`;

const WrapperHolder = styled.div`
	/* width: 80%; */
	padding: 30px 10px;
	display: flex;
	justify-content: center;
`;

const Diva = styled.div`
	display: flex;
	align-items: center;
`;

const NonVisibleIcon = styled(BsFillEyeFill)`
	font-size: 30px;
	margin-right: 20px;
	transition: all 350ms;
	color: red;
	:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
`;

const VisibleIcon = styled(BsFillEyeSlashFill)`
	font-size: 30px;
	margin-right: 20px;
	transition: all 350ms;
	color: red;
	:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
`;

const Active = styled.div`
	width: 60%;
	background-color: ${({ bg }) => (bg ? "#56ca00" : "red")};
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
	font-size: 13px;
	padding: 5px 10px;
	transition: all 350ms;
	:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
`;

const DisplayName1 = styled.div`
	font-size: 12px;
	margin-left: 15px;
`;

const DisplayName = styled.div`
	font-size: 12px;
`;
const Name = styled.div`
	margin-bottom: 5px;
	font-weight: 700;
`;

const TitleHolder24 = styled.div`
	display: inline-block;
	vertical-align: top;
	line-height: 100%;
	width: 400px;
`;

const TitleHolder = styled.div`
	display: inline-block;
	vertical-align: top;
	line-height: 100%;
	width: 350px;
`;

const Title1 = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 250px;
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
	width: 250px;
	padding-left: 10px;
`;

const Email1 = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 350px;
	padding-left: 10px;
	font-size: 12px;
	font-weight: 500;
`;
const Email = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	font-weight: ${({ fw }) => (fw ? "700" : "normal")};
	width: 350px;
	padding-left: 10px;
`;

const Role = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 150px;
	padding-left: 10px;
	font-size: 13px;
	font-weight: 700;
`;

const Status = styled.div`
	display: inline-block;
	margin: 10px;
	border-left: ${({ bl }) => (bl ? "3px solid lightgray" : "")};
	width: 100px;
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
