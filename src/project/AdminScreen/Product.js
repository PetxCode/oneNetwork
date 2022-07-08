import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	AiFillHeart,
	AiOutlineHeart,
	AiFillEye,
	AiFillStar,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import pix from "./sound.webp";
import pix1 from "./eBook.jpg";
import moment from "moment";

const MianURL = "https://onechurch1.herokuapp.com";
// const MianURL = "http://localhost:2233";

const Product = () => {
	const user = useSelector((state) => state.user);
	const [audio, setAudio] = useState(true);
	const [eBook, setEBook] = useState(false);

	const [audioContent, setAudioContent] = useState({});
	const [eBookContent, setEBookContent] = useState({});

	const getAllAudio = async () => {
		const url = `${MianURL}/api/content/${user?._id}`;
		await axios
			.get(url)
			.then((res) => {
				setAudioContent(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllEbook = async () => {
		const url = `${MianURL}/api/eBook/${user?._id}`;
		await axios
			.get(url)
			.then((res) => {
				setEBookContent(res.data.data);
				console.log("Members: ", eBookContent);
			})
			.catch((err) => console.log(err.message));
	};

	useEffect(() => {
		getAllAudio();
		getAllEbook();
	}, []);

	return (
		<Container>
			<Wrapper>
				<MainTitle>Product Screen</MainTitle>

				<DisplayOption>
					<Nav
						bg={audio ? "bg" : null}
						onClick={() => {
							setAudio(true);
							setEBook(false);
						}}
					>
						Audio Messages
					</Nav>
					<Nav
						bg={eBook ? "bg" : null}
						onClick={() => {
							setAudio(false);
							setEBook(true);
						}}
					>
						E-Book Materials
					</Nav>
				</DisplayOption>
				{audio ? (
					<CardHolder24>
						{audioContent?.audioContent?.map((props) => (
							<Card key={props._id}>
								<ImageHolder>
									{props?.audioCover ? (
										<Image src={props.audioCover} />
									) : (
										<Image src={pix} />
									)}

									{user?.avatar ? (
										<ImageAvatar src={user?.avatar} />
									) : (
										<ImageAvatarMe>One</ImageAvatarMe>
									)}
								</ImageHolder>
								<Tile>{props.title}</Tile>
								<Date>
									created: <span>{moment(props.createdAt).fromNow()}</span>
								</Date>

								<Holder>
									<IconHolder>
										<IconStart>
											<Icon />
										</IconStart>
										<Text>{0}</Text>
									</IconHolder>

									<IconHolder>
										<IconStart>
											<EyeIcon />
										</IconStart>
										<Text>{0}</Text>
									</IconHolder>

									<IconHolder>
										<IconStart>
											<SartIcon />
										</IconStart>
										<Text>{0}</Text>
									</IconHolder>

									<Space />

									{/* <Button>Purchase</Button> */}
								</Holder>
							</Card>
						))}
					</CardHolder24>
				) : eBook ? (
					<CardHolder24>
						{eBookContent?.eBookContent?.map((props) => (
							<Card key={props._id}>
								<ImageHolder>
									{props?.eBookCover ? (
										<Image src={props?.eBookCover} />
									) : (
										<Image src={pix1} />
									)}

									{user?.avatar ? (
										<ImageAvatar src={user?.avatar} />
									) : (
										<ImageAvatarMe>One</ImageAvatarMe>
									)}
								</ImageHolder>
								<Tile>{props.title}</Tile>
								<Date>
									created: <span>{moment(props.createdAt).fromNow()}</span>
								</Date>

								<Holder>
									<IconHolder>
										<IconStart>
											<Icon />
										</IconStart>
										<Text>{0}</Text>
									</IconHolder>

									<IconHolder>
										<IconStart>
											<EyeIcon />
										</IconStart>
										<Text>{0}</Text>
									</IconHolder>

									<IconHolder>
										<IconStart>
											<SartIcon />
										</IconStart>
										<Text>{0}</Text>
									</IconHolder>

									<Space />

									{/* <Button>Purchase</Button> */}
								</Holder>
							</Card>
						))}
					</CardHolder24>
				) : null}
			</Wrapper>
		</Container>
	);
};

export default Product;

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

const Button = styled.div`
	width: 70px;
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

const SartIcon = styled(AiFillStar)``;
const StarIcon = styled(AiFillStar)``;

const EyeIcon = styled(AiFillEye)``;

const Icon = styled(AiFillHeart)`
	color: red;

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

const Holder = styled.div`
	display: flex;
	margin: 0 10px;
	margin-top: 20px;
	margin-bottom: 20px;
`;

const Tile = styled.div`
	font-weight: 700;
	text-transform: uppercase;
	margin-left: 20px;
	margin-top: 40px;
`;

const Date = styled.div`
	/* margin-top: 30px; */
	margin-left: 20px;
	font-size: 10px;

	span {
		font-weight: 700;
	}
`;

const ImageAvatarMe = styled.div`
	width: 50px;
	height: 50px;
	object-fit: cover;
	border-radius: 50%;
	background-color: #742e9d;
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
	border-bottom: 1px solid silver;
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

const Wrapper = styled.div`
	width: 96%;
	flex-direction: column;
	display: flex;
	padding-top: 30px;
`;

const Container = styled.div`
	width: calc(100vw - 260px);
	min-height: 50vh;
	height: 100%;
	display: flex;
	position: absolute;
	right: 0;
	top: 70px;
	justify-content: center;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;
