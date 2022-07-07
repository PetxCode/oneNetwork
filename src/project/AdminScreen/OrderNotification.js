import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import one from "./one.png";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import LoadingState from "../../LoadingState";

import Swal from "sweetalert2";

const mainURL = "https://onechurch1.herokuapp.com";

const OrderNotification = () => {
	const user = useSelector((state) => state.user);
	const [members, setMembers] = useState({});

	const [viewOrders, setViewOrders] = useState({});
	const [loading, setLoading] = useState(false);
	const url = "https://onechurch1.herokuapp.com";

	const getMembers = async () => {
		const newURL = `${url}/api/admin/${user.admin}`;

		await axios
			.get(newURL)
			.then((res) => {
				setMembers(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getOrders = async () => {
		const newURL = `${mainURL}/api/order/${user.admin}/five`;

		await axios
			.get(newURL)
			.then((res) => {
				setViewOrders(res.data.data);
			})
			.catch((error) => {
				new Swal({
					title: error.response.data.message,
					text: "Please check and fix this ERROR",
					icon: "error",
					showConfirmButton: false,
					timer: 3500,
				}).then(() => {
					setLoading(false);
				});
			});
	};

	useEffect(() => {
		getMembers();
		getOrders();
	}, []);

	return (
		<Container>
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
							}}
						>
							SEEN
						</th>
						<th
							style={{
								height: "50px",
								paddingRight: "20px",
								paddingLeft: "20px",
							}}
						>
							STATUS
						</th>
						<th
							style={{
								height: "50px",
								paddingRight: "20px",
								paddingLeft: "20px",
							}}
						>
							PROFILE
						</th>
						<th
							style={{
								height: "50px",
								paddingRight: "20px",
								paddingLeft: "20px",
							}}
						>
							DETAILS
						</th>
					</tr>

					{viewOrders?.order &&
						viewOrders?.order?.map((props) => (
							<TRHold>
								<tr>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											marginTop: "20px",
											marginLeft: "10px",
											minWidth: "200px",
										}}
									>
										{props.seen ? <NonVisibleIcon /> : <VisibleIcon />}
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
									{props.delivered ? (
										<Active bg>Deliver</Active>
									) : (
										<Active>Not Deliver</Active>
									)}
								</td>

								<td
									style={{
										margin: "10px",
										minWidth: "200px",
										paddingLeft: "30px",
										fontSize: "13px",
									}}
								>
									{props.who}
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
									<Named>{props.what}</Named>
									<DisplayNamed>{props.detail}</DisplayNamed>
									<CostOrder>#{props.cost}.00</CostOrder>
								</td>
							</TRHold>
						))}
				</Table>
			</DivData>
		</Container>
	);
};

export default OrderNotification;

const NonVisibleIcon = styled(BsFillEyeFill)`
	font-size: 20px;
	margin-right: 20px;
	transition: all 350ms;
	color: red;
	:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
`;

const VisibleIcon = styled(BsFillEyeSlashFill)`
	font-size: 20px;
	margin-right: 20px;
	transition: all 350ms;
	color: red;
	:hover {
		cursor: pointer;
		transform: scale(1.05);
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
