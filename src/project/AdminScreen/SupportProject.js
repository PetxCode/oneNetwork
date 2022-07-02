import React, { useState } from "react";
import styled from "styled-components";
import { usePaystackPayment } from "react-paystack";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import left from "./left.png";
import right from "./Right.png";
import { useSelector } from "react-redux";

const SupportProjects = () => {
	const user = useSelector((state) => state.user);

	const [errorState, setErrorState] = useState("");
	const [amount, setAmount] = useState(0);

	const config = {
		reference: new Date().getTime().toString(),
		email: user.email,
		amount: amount * 100,
		publicKey: "pk_test_d632bf4b9aa1e74745eb158cec8034961dc13b18",
	};

	const onSuccess = (reference) => {
		console.log(reference);
	};

	const onClose = () => {
		console.log("closed");
	};

	const initializePayment = usePaystackPayment(config);

	const navigate = useNavigate();

	const onHandle = (e) => {
		e.preventDefault();
		initializePayment(onSuccess, onClose);
	};

	return (
		<Container>
			<Mini>Here are list of our ministries, you can Support</Mini>
			<WrapperHolder>
				<Wrapper>
					<Card>
						<Title>
							<TitleHead>Widows Ministry 💸</TitleHead>
							<br />
							<TitleSub>
								We are <span>GLAD</span>, You've considered giving to Our{" "}
								<span>MINISTRY</span>. <br /> <span>God </span>please you!
							</TitleSub>
						</Title>
						<br />
						<br />
						<InputHolder>
							<Label>How much would you want to Give?</Label>
							<Input
								placeholder="Amount"
								value={amount}
								onChange={(e) => {
									setAmount(amount);
								}}
							/>
						</InputHolder>

						<ButtonHolder>
							<BUtton type="submit" bg onClick={onHandle}>
								Support Widows Ministry
							</BUtton>
							<Div>{errorState}</Div>
						</ButtonHolder>
					</Card>
				</Wrapper>
				<Wrapper>
					<Card>
						<Title>
							<TitleHead>Out of School Ministry 💸</TitleHead>
							<br />
							<TitleSub>
								We are <span>GLAD</span>, You've considered giving to Our{" "}
								<span>MINISTRY</span>. <br /> <span>God </span>please you!
							</TitleSub>
						</Title>
						<br />
						<br />
						<InputHolder>
							<Label>How much would you want to Give?</Label>
							<Input
								placeholder="Amount"
								value={amount}
								onChange={(e) => {
									setAmount(amount);
								}}
							/>
						</InputHolder>

						<ButtonHolder>
							<BUtton type="submit" bg onClick={onHandle}>
								Support Out of School Ministry
							</BUtton>
							<Div>{errorState}</Div>
						</ButtonHolder>
					</Card>
				</Wrapper>
			</WrapperHolder>
			<TextHolder>
				<Title1>
					Give, and it will be given to you. A good measure, pressed down,
					shaken together and running over, will be poured into your lap. For
					with the measure you use, it will be measured to you.”
				</Title1>
				<Sub>Luke 6:38</Sub>
			</TextHolder>

			<Space />
			<Holder>
				<Left src={left} />
				<Right src={right} />
			</Holder>
		</Container>
	);
};

export default SupportProjects;

const Mini = styled.div`
	color: #742e9d;
	font-size: 20px;
	text-transform: uppercase;
	font-weight: bold;
	width: 100%;
	display: flex;
	margin-top: 50px;
`;

const WrapperHolder = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 30px;
`;

const TextHolder = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	position: absolute;
	bottom: 50px;
`;

const ButtonHolder = styled.div`
	margin: 10px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const BUtton = styled.button`
	margin-bottom: 5px;
	width: 100%;
	height: 50px;
	background-color: ${({ bg }) => (bg ? "#742e9d" : "gray")};
	color: white;
	border: 0;
	outline: none;
	border-radius: 5px;
	font-size: 20px;
	font-family: Poppins;
	text-transform: uppercase;
	transition: all 350ms;

	:hover {
		cursor: pointer;
		transform: scale(0.99);
	}
`;

const Div = styled.div`
	color: red;
	bottom: -18px;
	font-size: 10px;
	font-weight: bolder;
`;

const Error = styled.div`
	color: red;
	position: absolute;
	bottom: -18px;
	font-size: 10px;
	font-weight: bolder;
`;

const Input = styled.input`
	padding-left: 10px;
	width: 97%;
	height: 100%;
	outline: none;
	border: 0;
	background-color: transparent;
	::placeholder {
		font-family: Poppins;
		padding-left: 10px;
		color: lightgray;
	}
`;

const Label = styled.label`
	font-size: 14px;
	position: absolute;
	top: -10px;
	left: 10px;
	background-color: white;
	padding: 0 3px;
	font-weight: 700;
`;

const InputHolder = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	margin-bottom: 35px;
	border: 1px solid #742e9d;
	width: 100%;
	height: 40px;
	border-radius: 5px;
	color: #742e9d;
`;

const TitleSub = styled.div`
	color: lightgray;
	font-weight: 500;
	font-size: 13px;

	span {
		color: #742e9d;
		font-weight: bold;
	}
`;

const TitleHead = styled.div`
	font-size: 22px;
	font-weight: bolder;
	color: #742e9d;
	text-align: center;
`;

const Title = styled.div`
	margin-top: 30px;
`;

const Card = styled.form`
	width: 90%;
	height: 100%;
`;

const Wrapper = styled.div`
	width: 450px;
	min-height: 350px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	/* position: absolute; */
	border-radius: 5px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 20px;

	@media screen and (max-width: 500px) {
		width: 90%;
		margin: 0;
		display: flex;
		justify-content: center;
	}
`;

const Right = styled.img`
	width: 200px;
	height: 300px;
	object-fit: cover;
	@media screen and (max-width: 500px) {
		display: none;
	}
`;

const Left = styled.img`
	width: 248px;
	height: 185px;
	object-fit: cover;
`;

const Holder = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	background-image: url("https://demos.themeselection.com/materio-mui-react-nextjs-admin-template-free/images/pages/auth-v1-mask-light.png");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	margin-top: 100px;
`;

const Space = styled.div`
	flex: 1;
`;

const Line = styled.div`
	margin-top: 40px;
	width: 60%;
	border-top: 1px solid silver;
`;

const Sub = styled.div`
	width: 80%;
	text-align: center;
	font-size: 30px;
	font-style: italic;
	font-weight: 700;
	margin-top: 20px;
	color: #742e9d;
`;

const Title1 = styled.div`
	margin-top: 50px;
	width: 70%;
	text-align: center;
	font-size: 20px;
	color: #742e9d;
`;

const Container = styled.div`
	width: calc(100vw - 260px);
	min-height: 30vh;
	display: flex;
	position: absolute;
	right: 0;
	top: 70px;
	flex-direction: column;
	align-items: center;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;
