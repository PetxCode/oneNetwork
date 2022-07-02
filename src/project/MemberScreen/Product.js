import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
import { addToCart, createBook } from "../../compoents/Global/Global";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { usePaystackPayment } from "react-paystack";

const Product = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const book = useSelector((state) => state.book);
	const [audio, setAudio] = useState(true);
	const [eBook, setEBook] = useState(false);

	const [audioContent, setAudioContent] = useState({});
	const [eBookContent, setEBookContent] = useState({});
	const [productDisplay, setProductDisplay] = useState({});
	const [eBookDisplay, setEBookDisplay] = useState({});
	const [announcementOne, setAnnouncementOne] = useState({});

	const getAllAudio = async () => {
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `http://localhost:2233/api/content/${user?._id}`;
		await axios
			.get(url)
			.then((res) => {
				setAudioContent(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllEbook = async () => {
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `http://localhost:2233/api/eBook/${user?._id}`;
		await axios
			.get(url)
			.then((res) => {
				setEBookContent(res.data.data);
				console.log("Members: ", eBookContent);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllProducts = async () => {
		console.log(user.admin);
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `http://localhost:2233/api/content/${user.admin}`;

		await axios
			.get(url)
			.then((res) => {
				setProductDisplay(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAlleBookProducts = async () => {
		console.log(user.admin);
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `http://localhost:2233/api/ebook/${user.admin}`;

		await axios
			.get(url)
			.then((res) => {
				setEBookDisplay(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const likeProduct = async (content) => {
		console.log(user.admin);
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `http://localhost:2233/api/content/${user._id}/${content}/like`;

		await axios
			.post(url)
			.then((res) => {
				// setProductDisplay(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const unlikeProduct = async (content) => {
		console.log(user.admin);
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `http://localhost:2233/api/content/${user._id}/${content}/dislike`;

		await axios
			.post(url)
			.then((res) => {
				// setProductDisplay(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllAnnouncementOne = async () => {
		const newURL = `http://localhost:2233`;

		const url = `${newURL}/api/announcement/${user?.admin}/one`;
		await axios
			.get(url)
			.then((res) => {
				setAnnouncementOne(res.data.data);
				console.log("announcement: ", announcementOne);
			})
			.catch((err) => console.log(err.message));
	};

	const config = {
		reference: uuidv4(),
		email: user.email,
		amount: book.cost * 100,
		publicKey: "pk_test_d632bf4b9aa1e74745eb158cec8034961dc13b18",
	};

	const onSuccess = (reference) => {
		console.log(reference);
	};

	const onClose = () => {
		console.log("closed");
	};

	const initializePayment = usePaystackPayment(config);

	useEffect(() => {
		// getAllAudio();
		getAllAnnouncementOne();
		getAlleBookProducts();
		getAllProducts();
	}, []);

	return (
		<Container>
			<Wrapper>
				<MainTitle>Product Screen</MainTitle>

				<Top>
					<TopSider>
						<NoticeHolder>
							<Notice>
								<NoticeTitle>Welcome Back {user.fullName} 🎉</NoticeTitle>
								<Space />
								{announcementOne?.announcement?.map((props) => (
									<div>
										<NoticeMessage>{props.message}</NoticeMessage>
										<Dated>{props.createdAt}</Dated>
									</div>
								))}
							</Notice>
							<Cartoon>
								<ImagePix src={pix} />
							</Cartoon>
						</NoticeHolder>
					</TopSider>
					<SiderSider>
						<Card1>
							<IconBuild bg=" rgba(255, 0, 0, 0.7)" bc="red">
								<IconData />
							</IconBuild>
							<CardTitleTExt>Total Audio Messages</CardTitleTExt>
							<TextCOunt>
								<AllCOunt>
									<Count>{productDisplay?.audioContent?.length}</Count>
									<Count1>{0}+</Count1>
								</AllCOunt>
							</TextCOunt>

							<DataCount>As at Today</DataCount>
						</Card1>

						<Card1>
							<IconBuild bg="rgba(86,202,0,0.7)" bc="rgb(86,202,0)">
								<IconDataBook />
							</IconBuild>
							<CardTitleTExt>Total eBooks</CardTitleTExt>
							<TextCOunt>
								<AllCOunt>
									<Count>{0}</Count>
									<Count1>{0}+</Count1>
								</AllCOunt>
							</TextCOunt>

							<DataCount>As at Today</DataCount>
						</Card1>
					</SiderSider>
				</Top>

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
						{productDisplay?.audioContent?.map((props) => (
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

								<Holder>
									<IconHolder>
										{props.like.includes(user._id) ? (
											<IconStart>
												<Icon
													onClick={() => {
														unlikeProduct(props._id);
													}}
												/>
											</IconStart>
										) : (
											<IconStart>
												<UnIcon
													onClick={() => {
														likeProduct(props._id);
													}}
												/>
											</IconStart>
										)}

										<Text> {props.like.length}</Text>
									</IconHolder>

									{/* <IconHolder>
										<IconStart>
											<EyeIcon />
										</IconStart>
										<Text>View: {0}</Text>
									</IconHolder> */}

									<IconHolder>
										<IconStart>
											<SartIcon />
										</IconStart>
										<Text> {4.5}</Text>
									</IconHolder>

									<Space />

									<Button
										onClick={() => {
											dispatch(addToCart(props));
										}}
									>
										Add to Cart
									</Button>
								</Holder>
							</Card>
						))}
					</CardHolder24>
				) : eBook ? (
					<CardHolder24>
						{eBookDisplay?.eBookContent?.map((props) => (
							<Card key={props._id}>
								<ImageHolder>
									<Image src={pix} />

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

								<Holder>
									<IconHolder>
										{props.like.includes(user._id) ? (
											<IconStart>
												<Icon
													onClick={() => {
														unlikeProduct(props._id);
													}}
												/>
											</IconStart>
										) : (
											<IconStart>
												<UnIcon
													onClick={() => {
														likeProduct(props._id);
													}}
												/>
											</IconStart>
										)}

										<Text> {props.like.length}</Text>
									</IconHolder>

									{/* <IconHolder>
									<IconStart>
										<EyeIcon />
									</IconStart>
									<Text>View: {0}</Text>
								</IconHolder> */}

									<IconHolder>
										<IconStart>
											<SartIcon />
										</IconStart>
										<Text> {4.5}</Text>
									</IconHolder>

									<Space />

									<Button
										onClick={() => {
											dispatch(createBook(props));
											Swal.fire({
												title: props.title,
												text: "You are about to place an order for this book, could you like to continue?",
												imageUrl: pix,
												imageWidth: 400,
												imageHeight: 200,
												imageAlt: props.title,
												showCancelButton: true,
												cancelButtonColor: "#d33",
												confirmButtonText: "Yes, Please!",
											}).then(() => {
												console.log("Order Completed");
												initializePayment(onSuccess, onClose);
											});
										}}
									>
										Place Order
									</Button>
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

const Cost = styled.div``;
const DisplayHolder = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const TitleCart = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: 700;
	text-transform: uppercase;
	/* margin-left: 20px; */
	margin-top: 40px;
	width: 90%;
`;

const UnIcon = styled(AiOutlineHeart)`
	color: red;
	margin-bottom: 5px;
	transition: all 350ms;
	:hover {
		transform: scale(1.1);
		cursor: pointer;
	}
`;

const IconPerson = styled(BsPersonCircle)`
	color: white;
	font-size: 30px;
`;

const IconDataMoney = styled(FaMoneyCheck)`
	color: white;
	font-size: 30px;
`;
const IconDataBook = styled(BsFillBookFill)`
	color: white;
	font-size: 30px;
`;

const IconData = styled(AiFillAudio)`
	color: white;
	font-size: 30px;
`;

const AllCOunt = styled.div`
	display: flex;
`;

const Count1 = styled.div`
	color: #56ca00;
	font-size: 13px;
	margin-left: 10px;
`;

const Count = styled.div``;

const DataCount = styled.div`
	margin: 10px 0;
	font-size: 13px;
	font-weight: 700;
`;

const TextCOunt = styled.div`
	margin: 10px 0;
	font-size: 25px;
	font-weight: 700;
	flex: 1;
`;

const CardTitleTExt = styled.div`
	margin-top: 40px;
	font-size: 13px;
	font-weight: 500;
`;

const IconBuild = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: ${({ bg }) => bg};
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 350ms;

	:hover {
		background-color: ${({ bc }) => bc};
		cursor: pointer;
	}
`;

const Dated = styled.div`
	font-size: 12px;
	font-weight: 700;
	margin-bottom: 10px;
	font-style: italic;
`;

const Date = styled.div`
	font-size: 10px;
	width: 90%;
	margin-bottom: 10px;

	span {
		font-weight: 700;
		margin-bottom: 10px;
	}
`;

const ImagePix = styled.img`
	height: 130%;
	position: absolute;
	right: -20px;
	bottom: 0;
`;

const NoticeMessage = styled.div`
	margin-bottom: 20px;
	width: 90%;
	margin-top: 10px;
`;
const NoticeTitle = styled.div`
	font-size: 25px;
	font-weight: 700;
	margin-top: 20px;
	line-height: 1.1;
`;

const NoticeHolder = styled.div`
	display: flex;
	justify-content: space-between;
	width: 90%;
`;
const Cartoon = styled.div`
	position: relative;
	/* overflow: hidden; */
	width: 40%;
`;

const Notice = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	padding-bottom: 20px;
`;

const Card1 = styled.div`
	width: 250px;
	height: 200px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 3px;
	margin: 0 5px;
	padding: 20px;
	margin-bottom: 0px;
`;

const SiderSider = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	height: 100%;
	margin-bottom: 10px;
`;

const TopSider = styled.div`
	width: 100%;
	min-height: 200px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 3px;
	margin-bottom: 10px;
	display: flex;
	justify-content: center;
`;

const Top = styled.div`
	/* width: 100%; */
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 80px;
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

const Holder = styled.div`
	display: flex;
	margin: 0 10px;
	margin-top: 20px;
	margin-bottom: 20px;
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