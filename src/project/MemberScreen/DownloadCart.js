import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import left from "./left.png";
import right from "./Right.png";

import { usePaystackPayment } from "react-paystack";
import {
	AiFillHeart,
	AiOutlineHeart,
	AiFillEye,
	AiFillStar,
} from "react-icons/ai";
import { AiFillAudio } from "react-icons/ai";
import { BsFillBookFill, BsPersonCircle } from "react-icons/bs";
import { FaMoneyCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import pix1 from "./pix.jpeg";
import pix from "./pii.png";
import moment from "moment";
import {
	removeMaterial,
	totalMaterialCost,
} from "../../compoents/Global/Global";
import { v4 as uuidv4 } from "uuid";
import fileDownload from "js-file-download";

const DownloadCartPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const cart = useSelector((state) => state.materialCart);
	const totalCost = useSelector((state) => state.tatalMaterialCost);
	const myToken = useSelector((state) => state.tokenData);
	const { token } = useParams();

	console.log(uuidv4());

	const config = {
		reference: uuidv4(),
		email: user.email,
		amount: totalCost * 100,
		publicKey: "pk_test_d632bf4b9aa1e74745eb158cec8034961dc13b18",
	};

	const handleClick = (url, filename) => {
		axios
			.get(url, {
				responseType: "blob",
			})
			.then((res) => {
				fileDownload(res.data, filename);
			});
	};

	useEffect(() => {
		dispatch(totalMaterialCost());
	}, [cart]);

	return (
		<Container>
			<DivText>Thanks for paying to download this Message(ses)... </DivText>
			<WrapperHolder>
				{myToken === token ? (
					<CardHolder24>
						{cart?.map((props) => (
							<Card key={props._id}>
								<ImageHolder>
									<Image src={pix1} />

									{user?.avatar ? (
										<ImageAvatar src={user?.avatar} />
									) : (
										<ImageAvatarMe>One</ImageAvatarMe>
									)}
								</ImageHolder>
								<DisplayHolder>
									<TitleCart>
										<Tile>{props.title}</Tile>
										<Cost>#{props.cost}.00</Cost>
									</TitleCart>

									<Date>
										created: <span>{moment(props.createdAt).fromNow()}</span>
									</Date>
								</DisplayHolder>

								<HolderState>
									<IconHolder>
										<IconStart>
											<Icon
												onClick={() => {
													// unlikeProduct(props._id);
												}}
											/>
										</IconStart>

										<Text> {props.like.length}</Text>
									</IconHolder>
									<IconHolder>
										<IconStart>
											<SartIcon />
										</IconStart>
										<Text> {4.5}</Text>
									</IconHolder>
									<Space />
									<Button
										href={props.audioFile}
										download={props.title}
										// onClick={() => {
										// 	handleClick(props.audioFile, props.title);
										// 	console.log("Donwloooaddedd");
										// }}
									>
										Download
									</Button>
								</HolderState>
							</Card>
						))}
					</CardHolder24>
				) : null}

				{/* <div>
					<button
						onClick={() => {
							handleClick(
								"https://firebasestorage.googleapis.com/v0/b/one-church-network.appspot.com/o/pitchDeckstomping-rock-four-shots-111444.mp3?alt=media&token=2d93f1da-ef0e-4667-8ad3-569bc31ad412",
								"sample"
							);
						}}
					>
						Download the File
					</button>
				</div> */}
			</WrapperHolder>

			<Holder>
				<Left src={left} />
				<Right src={right} />
			</Holder>
		</Container>
	);
};

export default DownloadCartPage;

const DivText = styled.div`
	margin-top: 150px;
	font-weight: 700;
	font-size: 20px;
	color: #742e9d;
`;

const HolderState = styled.div`
	display: flex;
	margin: 0 10px;
	margin-top: 20px;
	margin-bottom: 20px;
`;

const Date = styled.div`
	font-size: 10px;
	width: 90%;
	span {
		font-weight: 700;
		margin-bottom: 10px;
	}
`;

const Cost = styled.div``;

const TitleCart = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: 700;
	text-transform: uppercase;
	/* margin-left: 20px; */
	margin-top: 40px;
	width: 90%;
`;

const DisplayHolder = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const DisplayOption = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	margin: 10px 0;
	position: fixed;
	right: 0;
	z-index: 1;

	@media screen and (max-width: 650px) {
		display: flex;
		width: 100%;
		justify-content: center;
	}
`;

const Nav = styled.div`
	margin: 10px;
	padding: 15px 20px;
	background-color: ${({ bg }) => bg};
	color: white;
	font-weight: 700;
	border-radius: 3px;
	transition: all 350ms;
	text-align: center;

	:hover {
		cursor: pointer;
		transform: scale(1.02);
		box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	}

	@media screen and (max-width: 425px) {
		font-size: 10px;
		font-weight: 500;
		padding: 10px;
		margin: 5px;
	}
`;

const MainTitle = styled.div`
	font-size: 24px;
	font-weight: 700;
	text-transform: uppercase;
	margin: 20px 10px;
	color: #742e9d;
`;

const Space = styled.div`
	flex: 1;
`;

const Button = styled.a`
	text-decoration: none;
	width: 100px;
	height: 40px;
	background-color: #742e9d;
	color: white;
	border-radius: 3px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	margin-left: 10px;
	transition: all 350ms;
	font-weight: 700;
	font-size: 10px;
	text-align: center;

	:hover {
		transform: scale(1.02);
		cursor: pointer;
		background-color: rgba(116, 46, 157, 0.9);
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
`;

const IconStart = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	transition: all 350ms;
	padding-top: 2px;

	:hover {
		cursor: pointer;
		background-color: rgba(255, 0, 0, 0.2);
	}
`;

const Text = styled.div`
	font-weight: 500;
	font-size: 13px;
	margin-left: 1px;
`;

const SartIcon = styled(AiFillStar)`
	color: gold;
	margin-bottom: 5px;
`;
const StarIcon = styled(AiFillStar)``;

const EyeIcon = styled(AiFillEye)``;

const Icon = styled(AiFillHeart)`
	color: red;
	margin-bottom: 5px;
	transition: all 350ms;
	:hover {
		transform: scale(1.1);
		cursor: pointer;
	}
`;

const IconHolder = styled.div`
	display: flex;
	align-items: center;
	margin-right: 20px;
`;

const Tile = styled.div``;

// const Date = styled.div`
// 	/* margin-top: 30px; */
// 	margin-left: 20px;
// 	font-size: 10px;

// 	span {
// 		font-weight: 700;
// 	}
// `;

const ImageAvatarMe = styled.div`
	width: 50px;
	height: 50px;
	object-fit: cover;
	border-radius: 50%;
	background-color: green;
	position: absolute;
	bottom: -30px;
	left: 20px;
	border: 5px solid white;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const ImageAvatar = styled.img`
	width: 50px;
	height: 50px;
	object-fit: cover;
	border-radius: 50%;
	background-color: green;
	position: absolute;
	bottom: -30px;
	left: 20px;
	border: 5px solid white;
`;

const ImageHolder = styled.div`
	position: relative;
	width: 100%;
	height: 200px;
`;

const Image = styled.img`
	width: 100%;
	height: 200px;
	background-color: #742e9d;
	object-fit: cover;
`;

const Card = styled.div`
	width: 300px;
	min-height: 300px;
	border-radius: 5px;
	background-color: white;
	margin: 10px;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	overflow: hidden;
`;

const CardHolder24 = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

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
	background-color: #742e9d;
`;

const LogoImageHolder = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
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
	width: 100%;
	display: flex;
	margin-top: 50px;
`;

const WrapperHolder = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 50px;

	@media screen and (max-width: 425px) {
		margin-top: 80px;
	}
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

{
	/* <Mini>Change Details</Mini> */
}
{
	/* 
			<DisplayOption>
				<Nav bg="#742e9d">
					Total Cost
					<br />#{totalCost}.00
				</Nav>
				<Nav bg="darkorange">
					Total Messages
					<br />
					{cart.length}
				</Nav>

				<Nav
					bg="red"
					onClick={() => {
						initializePayment(onSuccess, onClose);
					}}
				>
					Proceed to
					<br />
					Pay
				</Nav>
			</DisplayOption> */
}
