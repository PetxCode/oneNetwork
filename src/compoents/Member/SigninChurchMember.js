import React, { useState } from "react";
import styled from "styled-components";
import left from "./left.png";
import right from "./Right.png";

import Swal from "sweetalert2";
import {
	AiFillFacebook,
	AiFillTwitterSquare,
	AiFillLinkedin,
	AiFillGoogleCircle,
} from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import { useDispatch } from "react-redux";
import { createUser } from "../Global/Global";
import LoadingState from "../../LoadingState";

const url = "https://onechurch1.herokuapp.com";

const SigninChurchMember = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const [errorState, setErrorState] = useState("");
	const [loading, setLoading] = useState(false);

	const yupSchema = yup.object().shape({
		email: yup.string().email().required("Please enter your desired email!"),
		password: yup.string().required("Please enter your choice password!"),
		churchCode: yup.string().required("Please enter your Church Code!"),
		churchName: yup.string().required("Please enter your Church Name!"),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: yupResolver(yupSchema) });

	const onSubmit = handleSubmit(async (value) => {
		console.log(value);
		const newURL = `${url}/api/member/signin`;
		setLoading(true);
		await axios
			.post(newURL, value)
			.then((res) => {
				dispatch(createUser(res.data.data));
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Please check your email for account verification",
					showConfirmButton: false,
					timer: 2500,
				}).then(() => {
					navigate("/");
				});
				setLoading(false);
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
	});

	return (
		<Container>
			<Wrapper>
				{loading ? <LoadingState /> : null}
				<Card onSubmit={onSubmit}>
					<LogoHolder to="/">
						{/* <Bar>One</Bar> */}
						<Logo>ONE</Logo>
						<LogoTitle>One Church Network</LogoTitle>
					</LogoHolder>

					<Title>
						<TitleHead>Member Sign in 🚀🥊</TitleHead>
						<TitleSub>
							to stay connected with <span>CHURCH</span>, at all times!
						</TitleSub>
					</Title>
					<br />
					<InputHolder>
						<Label>Church Name</Label>
						<Input placeholder="Church Name" {...register("churchName")} />
						<Error>{errors?.churchName?.message}</Error>
					</InputHolder>
					<InputHolder>
						<Label>Email</Label>
						<Input placeholder="Email" {...register("email")} />
						<Error>{errors?.email?.message}</Error>
					</InputHolder>

					<InputRow>
						<InputHolder1>
							<Label>Password</Label>
							<Input
								placeholder="Password"
								{...register("password")}
								type="password"
							/>
							<Error>{errors?.password?.message}</Error>
						</InputHolder1>
						<InputHolder2>
							<Label>Church Code</Label>
							<Input placeholder="Church Code" {...register("churchCode")} />
							<Error>{errors?.churchCode?.message}</Error>
						</InputHolder2>
					</InputRow>

					<Statement>
						<TextContent to="/forgetPasswordMember">
							Forgot Password
						</TextContent>
					</Statement>

					<ButtonHolder>
						<BUtton type="submit" bg>
							Sign In
						</BUtton>
						<Div>{errorState}</Div>
					</ButtonHolder>

					<Content>
						Don't have an account yet?
						<Span to="/registerMember">Why not create one</Span>
					</Content>

					<LineHolder>
						<Line />
						<Text>OR</Text>
						<Line />
					</LineHolder>

					<Social>
						<SocialText>Use Social Media</SocialText>
						<Icons>
							<Icon />
							<Icon1 />
							<Icon2 />
							<Icon3 />
						</Icons>
					</Social>
				</Card>
			</Wrapper>

			<Space />
			<Holder>
				<Left src={left} />
				<Right src={right} />
			</Holder>
		</Container>
	);
};

export default SigninChurchMember;

const InputHolder2 = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	margin-bottom: 35px;
	border: 1px solid #742e9d;
	width: 100%;
	height: 40px;
	border-radius: 3px;
	margin-left: 3px;
	color: #742e9d;
`;

const InputHolder1 = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	margin-bottom: 35px;
	border: 1px solid #742e9d;
	width: 100%;
	height: 40px;
	border-radius: 5px;
	margin-right: 5px;
	color: #742e9d;
`;

const InputRow = styled.div`
	display: flex;
`;

const ButtonHolder = styled.div`
	margin: 10px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const TextContent = styled(Link)`
	text-decoration: none;
	font-size: 13px;
	font-weight: 700;
	color: #742e9d;
	cursor: pointer;
	position: absolute;
	top: 420px;
	@media screen and (max-width: 360px) {
		margin-top: 20px;
		font-size: 12px;
	}
`;

const Statement = styled.div`
	width: 100%;
	display: flex;
	/* justify-content: flex-end; */
`;

const Text = styled.div`
	font-size: 15px;
	padding: 0 5px;
`;

const Line = styled.div`
	border-bottom: 1px solid silver;
	width: 100%;
`;

const LineHolder = styled.div`
	display: flex;
	align-items: center;
	margin: 20px 0;
`;

const Icon = styled(AiFillGoogleCircle)`
	font-size: 35px;
	color: red;
	:hover {
		cursor: pointer;
	}
`;

const Icons = styled.div`
	display: flex;
	margin-top: 20px;
`;

const Icon3 = styled(AiFillLinkedin)`
	font-size: 35px;
	color: #0077b7;
	:hover {
		cursor: pointer;
	}
`;

const Icon2 = styled(AiFillTwitterSquare)`
	font-size: 35px;
	color: #50abf1;
	:hover {
		cursor: pointer;
	}
`;

const Icon1 = styled(AiFillFacebook)`
	font-size: 35px;
	color: #475993;
	:hover {
		cursor: pointer;
	}
`;

const SocialText = styled.div`
	font-size: 12px;
	display: flex;
	margin-top: 0px;
`;

const Social = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 10px;
`;

const Span = styled(Link)`
	text-decoration: none;
	color: #742e9d;
	font-weight: 700;
	margin-left: 5px;
	cursor: pointer;
`;

const Content = styled.div`
	display: flex;
	font-size: 13px;
	justify-content: center;
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
`;

const Title = styled.div`
	margin-top: 30px;
`;

const LogoTitle = styled.div`
	font-weight: 700;
	color: gray;
	width: 100px;
	line-height: 1;
	font-size: 25px;
	color: #742e9d;
`;

const Logo = styled.div`
	padding: 20px;
	background-color: #742e9d;
	color: white;
	border-radius: 3px;
	margin-right: 5px;
	font-weight: 700;
`;

const LogoHolder = styled(Link)`
	margin-top: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-decoration: none;
`;
const Card = styled.form`
	width: 90%;
	height: 100%;
`;

const Wrapper = styled.div`
	width: 450px;
	min-height: 500px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	position: absolute;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;

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
`;

const Space = styled.div`
	flex: 1;
`;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	position: relative;
	align-items: center;
	justify-content: center;
`;
