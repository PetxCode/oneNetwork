import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import left from "./left.png";
import right from "./Right.png";
import { useSelector } from "react-redux";

import pix from "./pix.jpeg";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./base";
import AddEbook from "./AddEbook";

const url = "https://onechurch1.herokuapp.com";

const AddProducts = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);

	const [errorState, setErrorState] = useState("");

	const [myLogo, setMyLogo] = useState(true);
	const [myRecord, setMyRecord] = useState(false);
	const [myImage, setMyImage] = useState(false);

	const [image, setImage] = useState("");
	const [imageBook, setImageBook] = useState("");
	const [avatar, setAvatar] = useState("");

	const [audioFile, setAudioFile] = useState("");
	const [eBookFile, setEBookFile] = useState("");

	const onHandleImage = (e) => {
		const file = e.target.files[0];
		const save = URL.createObjectURL(file);
		setImage(save);
		setAvatar(file);
	};

	const handleAudioUpload = (e) => {
		const file = e.target.files[0];
		const save = URL.createObjectURL(file);
		setImage(save);
		setAvatar(file);

		const storageRef = ref(storage, "/pitchDeck" + file.name);

		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log("File available at", downloadURL);
					setAudioFile(downloadURL);
				});
			}
		);
	};

	const yupSchema = yup.object().shape({
		title: yup.string().required("Please enter your Title!"),
		description: yup.string().required("Please enter your Description!"),
		cost: yup.number().required("Please enter your Cost!"),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: yupResolver(yupSchema) });

	const onSubmitAudio = handleSubmit(async (value) => {
		const { title, description, cost, audioFile } = value;

		console.log(value);

		const newURL = `${url}/api/content/${user._id}/create`;

		await axios
			.post(newURL, { title, description, cost, audioFile: audioFile })
			.then((res) => {})
			.catch((error) => console.log(error));

		Swal.fire({
			position: "center",
			icon: "success",
			title: "Audio Message has been created...",
			showConfirmButton: false,
			timer: 2500,
		}).then(() => {
			navigate("/product");
		});
	});

	return (
		<Container>
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
					Add Audio Content
				</Nav>
				<Nav
					bg={myRecord ? "bg" : null}
					onClick={() => {
						setMyLogo(false);
						setMyRecord(true);
						setMyImage(false);
					}}
				>
					Add eBook Content
				</Nav>
			</DisplayOption>

			<WrapperHolder>
				{myLogo ? (
					<Wrapper>
						<Card onSubmit={onSubmitAudio}>
							<Title>
								<TitleHead>Adding Audio Message</TitleHead>
								<br />
								<TitleSub>
									We are <span>GLAD</span>, You've considered giving to Our{" "}
									<span>MINISTRY</span>. <br /> <span>God </span>please you!
								</TitleSub>
							</Title>
							<br />
							<br />

							<LogoImageHolder>
								{image === "" ? (
									<LogoImage src={pix} br />
								) : (
									<LogoImageAudio>Audio File Loaded</LogoImageAudio>
								)}
								<LogoImageInput
									id="pix"
									onChange={handleAudioUpload}
									type="file"
									accept=".mp3,audio/*"
								/>
								<LogoImageLabel htmlFor="pix">
									Choose the Message
								</LogoImageLabel>
							</LogoImageHolder>

							<InputRow>
								<InputHolder1>
									<Label>Title</Label>
									<Input placeholder="Title" {...register("title")} />
									<Error>{errors?.title?.message}</Error>
								</InputHolder1>
								<InputHolder2>
									<Label>Cost</Label>
									<Input placeholder="Cost" {...register("cost")} />
									<Error>{errors?.cost?.message}</Error>
								</InputHolder2>
							</InputRow>

							<InputHolderArea>
								<Label>Brief Description</Label>
								<InputArea
									placeholder="Description"
									{...register("description")}
								/>
								<Error>{errors?.description?.message}</Error>
							</InputHolderArea>

							<ButtonHolder>
								<BUtton
									type="submit"
									bg
									onClick={() => {
										console.log("clicked 2");
									}}
								>
									Upload Message
								</BUtton>
								<Div>{errorState}</Div>
							</ButtonHolder>
						</Card>
					</Wrapper>
				) : myRecord ? (
					<AddEbook />
				) : null}
			</WrapperHolder>

			<Holder>
				<Left src={left} />
				<Right src={right} />
			</Holder>
		</Container>
	);
};

export default AddProducts;

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

const LogoImageAudio = styled.div`
	width: 50%;
	height: 200px;
	border-radius: ${({ br }) => (br ? "5px" : "50%")};
	object-fit: cover;
	background-color: #742e9d;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LogoImage = styled.img`
	width: 50%;
	height: 200px;
	border-radius: ${({ br }) => (br ? "5px" : "50%")};
	object-fit: cover;
	background-color: #742e9d;
`;

const LogoImageHolder = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 10px;
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
	z-index: 1;
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
	display: flex;
	/* justify-content: flex-start; */
	width: 90%;
	margin-top: 50px;
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

const InputArea = styled.textarea`
	padding-left: 10px;
	width: 97%;
	height: 100%;
	outline: none;
	border: 0;
	height: 150px;
	resize: none;
	background-color: transparent;
	::placeholder {
		font-family: Poppins;
		padding-left: 10px;
		color: lightgray;
		padding-top: 10px;
	}
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

const InputHolderArea = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	margin-bottom: 35px;
	border: 1px solid #742e9d;
	width: 100%;
	/* height: 150px; */
	border-radius: 5px;
	color: #742e9d;
	padding-top: 10px;
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

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;
