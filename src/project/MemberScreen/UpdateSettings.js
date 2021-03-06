import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../LoadingState";

import axios from "axios";
import left from "./left.png";
import right from "./Right.png";
import { useSelector } from "react-redux";

import pix from "./avatar.jpg";
import one from "./one.png";
import { useEffect } from "react";

const url = "https://onechurch1.herokuapp.com";

const UpdateSettings = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);

	const [errorState, setErrorState] = useState("");

	const [myLogo, setMyLogo] = useState(true);
	const [myRecord, setMyRecord] = useState(false);
	const [myImage, setMyImage] = useState(false);

	const [image, setImage] = useState(pix);
	const [avatar, setAvatar] = useState("");

	const [userData, setUserData] = useState({});

	const [imageLogo, setImageLogo] = useState(one);

	const [displayName, setDisplayName] = useState("");
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const getMemeberData = async () => {
		const localURL = "http://localhost:2233";
		const url = `${localURL}/api/member/${user._id}/`;
		await axios.get(url).then((res) => {
			setUserData(res.data.data);
		});
	};

	const onHandleImage = (e) => {
		const file = e.target.files[0];
		const save = URL.createObjectURL(file);
		setImage(save);
		setAvatar(file);
	};

	const [loading, setLoading] = useState(false);

	const yupSchema = yup.object().shape({
		displayName: yup.string().required("Please enter your Display Name!"),
		fullName: yup.string().required("Please enter your Full Name!"),
		phoneNumber: yup.string().required("Please enter your Phone Number!"),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: yupResolver(yupSchema) });

	const onSubmit = handleSubmit(async (value) => {
		// const localURL = "http://localhost:2233";
		const newURL = `${url}/api/member/${user._id}/`;

		setLoading(true);
		await axios
			.patch(newURL, value)
			.then((res) => {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Your profile has been updated",
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

	const onSubmitImage = async (e) => {
		e.preventDefault();
		const localURL = "http://localhost:2233";
		const newURL = `${localURL}/api/member/${user._id}/image`;

		const formData = new FormData();
		formData.append("avatar", avatar);

		const config = {
			"Content-Type": "multipart/form-data",
		};
		setLoading(true);
		await axios
			.patch(newURL, formData, config)
			.then((res) => {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Your Avatar has been Uploaded",
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
	};

	useEffect(() => {
		getMemeberData();
	}, []);

	return (
		<Container>
			{loading ? <Loading /> : null}
			<Mini>Change Details</Mini>

			<DisplayOption>
				<Nav
					bg={myLogo ? "bg" : null}
					onClick={() => {
						setMyLogo(true);
						setMyRecord(false);
						setMyImage(false);
					}}
				>
					Personal Detail
				</Nav>

				<Nav
					bg={myRecord ? "bg" : null}
					onClick={() => {
						setMyLogo(false);
						setMyRecord(true);
						setMyImage(false);
					}}
				>
					My Avatar
				</Nav>
			</DisplayOption>

			<WrapperHolder>
				{myLogo ? (
					<Wrapper>
						<Card onSubmit={onSubmit}>
							<Title>
								<TitleHead>Update Personal Profile ????</TitleHead>
								<br />
								<TitleSub>
									We are <span>GLAD</span>, You've considered giving to Our{" "}
									<span>MINISTRY</span>. <br /> <span>God </span>please you!
								</TitleSub>
							</Title>
							<br />
							<br />
							<InputHolder>
								<Label>Full Name</Label>
								<Input
									placeholder={`${userData.fullName}`}
									{...register("fullName")}
								/>
								<Error>{errors?.fullName?.message}</Error>
							</InputHolder>

							<InputRow>
								<InputHolder1>
									<Label>Display Name</Label>
									<Input
										placeholder={`${userData.displayName}`}
										{...register("displayName")}
									/>
									<Error>{errors?.displayName?.message}</Error>
								</InputHolder1>
								<InputHolder2>
									<Label>Phone Number</Label>
									<Input
										placeholder={`${userData.phoneNumber}`}
										{...register("phoneNumber")}
									/>
									<Error>{errors?.phoneNumber?.message}</Error>
								</InputHolder2>
							</InputRow>

							<ButtonHolder>
								<BUtton type="submit" bg>
									Update Profile
								</BUtton>
								<Div>{errorState}</Div>
							</ButtonHolder>
						</Card>
					</Wrapper>
				) : myRecord ? (
					<Wrapper>
						<Card onSubmit={onSubmitImage}>
							<Title>
								<TitleHead>My Aavatar</TitleHead>
								<br />
								<TitleSub>
									Use the <span>AVATAR</span>, for a proper representation of
									the
									<span>YOU</span> across this Platform. <span>God </span>Bless
									you!
								</TitleSub>
							</Title>
							<br />

							<LogoImageHolder>
								<LogoImage src={image} />
								<LogoImageInput
									id="pix"
									onChange={onHandleImage}
									type="file"
									name="myImage"
									accept="image/x-png,image/gif,image/jpeg"
								/>
								<LogoImageLabel htmlFor="pix">
									Choose your Avatar
								</LogoImageLabel>
							</LogoImageHolder>

							<ButtonHolder>
								<BUtton type="submit" bg>
									Upload
								</BUtton>
								<Div>{errorState}</Div>
							</ButtonHolder>
						</Card>
					</Wrapper>
				) : null}
			</WrapperHolder>

			<Holder>
				<Left src={left} />
				<Right src={right} />
			</Holder>
		</Container>
	);
};

export default UpdateSettings;

// const LogoImageLabel = styled.div``;

const LogoImageLabel = styled.label`
	padding: 15px 20px;
	border-radius: 50px;
	background-color: #742e9d;
	color: white;
	margin: 10px 0;
	transition: all 350ms;

	:hover {
		transform: scale(1.02);
		cursor: pointer;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
			rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
	}
`;

const LogoImageInput = styled.input`
	display: none;
`;

const LogoImage = styled.img`
	width: 50%;
	height: 200px;
	border-radius: ${({ br }) => (br ? "5px" : "50%")};
	object-fit: cover;
	border: 1px solid silver;
	background-color: #742e9d;
`;

const LogoImageHolder = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Nav = styled.div`
	margin: 10px;
	padding: 15px 20px;
	background-color: ${({ bg }) => (bg ? "#742e9d" : "gray")};
	color: white;
	font-weight: 700;
	border-radius: 3px;
	transition: all 350ms;

	:hover {
		cursor: pointer;
		transform: scale(1.02);
		box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	}
`;

const DisplayOption = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	margin: 10px 0;
`;

const InputRow = styled.div`
	display: flex;
`;
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

const Mini = styled.div`
	color: #742e9d;
	font-size: 20px;
	text-transform: uppercase;
	font-weight: bold;
	width: 90%;
	display: flex;

	margin-top: 50px;
	/* margin-left: 50px; */
`;

const WrapperHolder = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 30px;
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
		box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
			rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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
	margin-top: 60px;
	position: absolute;
	bottom: 0px;
	z-index: -10;
`;

const Container = styled.div`
	width: calc(100vw - 260px);
	display: flex;
	position: absolute;
	right: 0;
	top: 70px;
	flex-direction: column;
	align-items: center;
	min-height: 91.5vh;
	/* background-color: red; */

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;
