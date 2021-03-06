import React, { useContext, useState } from "react";
import styled from "styled-components";
import pix from "./pii.png";
import { AiFillAudio } from "react-icons/ai";
import {
	BsFillBookFill,
	BsPersonCircle,
	BsFillEyeFill,
	BsFillEyeSlashFill,
} from "react-icons/bs";
import { FaMoneyCheck, FaChurch } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { useSelector } from "react-redux";
import myURL from "../../urlData.json";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import LoadingState from "../../LoadingState";
import { AuthContext } from "../../compoents/Global/GlobalProvider";

const mainURL = "https://onechurch1.herokuapp.com";

const Overview = () => {
	const user = useSelector((state) => state.user);
	const newURL = myURL[0].url;
	const [members, setMembers] = useState({});
	const [audioContent, setAudioContent] = useState({});
	const [announcement, setAnnouncement] = useState({});
	const [announcementOne, setAnnouncementOne] = useState({});
	const [announcementOne7, setAnnouncementOne7] = useState({});
	const [ministry, setMinistry] = useState({});
	const [ministry1, setMinistry1] = useState({});
	const [ebooks, setEbooks] = useState({});

	const [givers7, setGivers7] = useState({});
	const [givers, setGivers] = useState({});
	const [allGivers, setAllGivers] = useState({});
	const [dataUser, setDataUser] = useState();
	const [ministryToGive, setMinistryToGive] = useState();
	const [loading, setLoading] = useState(false);

	const getAllGivers7 = async () => {
		const url = `${mainURL}/api/give/${user?._id}/limit7`;
		await axios
			.get(url)
			.then((res) => {
				setGivers7(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllGivers = async () => {
		const url = `${mainURL}/api/give/${user?._id}/limit`;
		await axios
			.get(url)
			.then((res) => {
				setGivers(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllMembers = async () => {
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `${mainURL}/api/admin/${user?._id}`;
		await axios
			.get(url)
			.then((res) => {
				setMembers(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllMinistry = async () => {
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `${mainURL}/api/ministry/${user?._id}`;
		await axios
			.get(url)
			.then((res) => {
				setMinistry(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllAudio = async () => {
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `${mainURL}/api/content/${user?._id}`;
		await axios
			.get(url)
			.then((res) => {
				setAudioContent(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllEbooks = async () => {
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `${mainURL}/api/ebook/${user?._id}`;
		await axios
			.get(url)
			.then((res) => {
				setEbooks(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllAnnouncement = async () => {
		const newURL = `${mainURL}`;

		const url = `${newURL}/api/announcement/${user?._id}`;
		await axios
			.get(url)
			.then((res) => {
				setAnnouncement(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllAnnouncementSeven = async () => {
		const newURL = `${mainURL}`;

		const url = `${newURL}/api/announcement/${user?._id}/seven`;
		await axios
			.get(url)
			.then((res) => {
				setAnnouncementOne7(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllAnnouncementOne = async () => {
		const newURL = `${mainURL}`;

		const url = `${newURL}/api/announcement/${user?._id}/one`;
		await axios
			.get(url)
			.then((res) => {
				setAnnouncementOne(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const [viewOrders, setViewOrders] = useState({});

	const getOrders = async () => {
		const newURL = `${mainURL}/api/order/${user._id}/five`;
		await axios
			.get(newURL)
			.then((res) => {
				setViewOrders(res.data.data);
			})
			.then((err) => {
				return console.log(err);
			});
	};

	const seenOrdered = async (ID) => {
		const newURL = `${mainURL}/api/order/${user._id}/${ID}/seen`;
		setLoading(true);
		await axios
			.patch(newURL)
			.then(() => {
				setLoading(true);
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Order has been seen",
					showConfirmButton: false,
					timer: 2500,
				}).then(() => {
					// navigate("/");
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

	const deliveredOrdered = async (ID) => {
		const newURL = `${mainURL}/api/order/${user._id}/${ID}/deliver`;
		setLoading(true);
		await axios
			.patch(newURL)
			.then(() => {
				setLoading(true);
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Updating the Delivered info",
					showConfirmButton: false,
					timer: 2500,
				}).then(() => {
					// navigate("/");
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

	const getAllGiversData = async () => {
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `${mainURL}/api/give/${user?._id}/`;
		await axios
			.get(url)
			.then((res) => {
				setAllGivers(res.data.data);

				const r = allGivers.givers.reduce(function (acc, obj) {
					return acc + obj.cost;
				}, 0);

				setDataUser(r);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllGiversDataSinge = async () => {
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `${mainURL}/api/give/${user?._id}/`;
		await axios
			.get(url)
			.then((res) => {
				// setAllGivers(res.data.data);

				var ministryName = res?.data?.data?.givers.reduce(function (pv, cv) {
					if (pv[cv.name]) {
						pv[cv.name] += cv.cost;
					} else {
						pv[cv.name] = cv.cost;
					}
					return pv;
				}, {});

				setMinistryToGive(ministryName);
				console.log("ministries: ", ministryName);
			})
			.catch((err) => console.log(err.message));
	};

	useEffect(() => {
		getOrders();
		getAllAnnouncementOne();
		getAllAnnouncementSeven();
		getAllEbooks();
		getAllMembers();
		getAllAudio();
		getAllAnnouncement();
		getAllMinistry();
		getAllGivers();
		getAllGiversData();
		getAllGivers7();
		getAllGiversDataSinge();

		// console.log(dataUser);
	}, [dataUser]);

	return (
		<Container>
			{loading ? <LoadingState /> : null}
			<Wrapper>
				<Top>
					<TopSider>
						<NoticeHolder>
							<Notice>
								<NoticeTitle>
									Welcome Back <span>{announcementOne.fullName}</span> ????
								</NoticeTitle>
								<Space />
								{announcementOne?.announcement?.map((props) => (
									<div key={props._id}>
										<NoticeMessage>{props.message}</NoticeMessage>
										<Date>{moment(props.createdAt).fromNow()}</Date>
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
							<IconBuild bg="rgba(0, 0, 0, 0.8)" bc=" rgba(0, 0, 0, 0.7)">
								<ChurchPerson />
							</IconBuild>
							<CardTitleTExt style={{ color: "darkorange", fontWeight: "700" }}>
								Total Ministry Givings:
							</CardTitleTExt>
							<TextCOunt>
								<AllCOunt>
									<Count style={{ color: "rgb(116,46,157)" }}>
										#{dataUser}.00
									</Count>
									<Count1>{0}+</Count1>
								</AllCOunt>
							</TextCOunt>

							<DataCount style={{ color: "red" }}>As at Today</DataCount>
						</Card1>

						<Card1>
							<IconBuild bg=" rgba(255, 0, 0, 0.7)" bc="red">
								<IconData />
							</IconBuild>
							<CardTitleTExt>Total Audio Messages</CardTitleTExt>
							<TextCOunt>
								<AllCOunt>
									<Count>{audioContent?.audioContent?.length}</Count>
									<Count1>{0}+</Count1>
								</AllCOunt>
							</TextCOunt>

							<DataCount>As at Today</DataCount>
						</Card1>
						<Card1>
							<IconBuild bg="rgba(255,180,0, 0.7)" bc="#ffb400">
								<IconDataBook />
							</IconBuild>
							<CardTitleTExt>Total Books</CardTitleTExt>
							<TextCOunt>
								<AllCOunt>
									<Count>{ebooks?.eBookContent?.length}</Count>
									<Count1>{0}+</Count1>
								</AllCOunt>
							</TextCOunt>

							<DataCount>As at Today</DataCount>
						</Card1>
						<Card1>
							<IconBuild bg="rgba(116,46,157,0.7)" bc="rgb(116,46,157)">
								<IconDataMoney />
							</IconBuild>
							<CardTitleTExt>Total Audio Sales</CardTitleTExt>
							<TextCOunt>
								<AllCOunt>
									<Count>{0}</Count>
									<Count1>{0}+</Count1>
								</AllCOunt>
							</TextCOunt>

							<DataCount>As at Today</DataCount>
						</Card1>
						<Card1>
							<IconBuild bg="rgba(86,202,0,0.7)" bc="rgb(86,202,0)">
								<IconDataMoney />
							</IconBuild>
							<CardTitleTExt>Total eBooks Sales</CardTitleTExt>
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
				<Card>
					<TextHolderFile>
						<Text>5 Most recent eBook Orders</Text>
						<MinCard1>
							<Header fs>
								<SeenVisible>Seen</SeenVisible>
								<Seen>Status</Seen>
								<Detailed>Profile</Detailed>
								<Status>Details</Status>
							</Header>

							{viewOrders?.order &&
								viewOrders?.order?.map((props) => (
									<Header key={props._id}>
										<SeenVisible>
											{props.seen ? (
												<NonVisibleIcon
													onClick={() => {
														seenOrdered(props._id);
														window.location.reload();
													}}
												/>
											) : (
												<VisibleIcon
													onClick={() => {
														seenOrdered(props._id);
														window.location.reload();
													}}
												/>
											)}
										</SeenVisible>
										<Seen>
											{props.delivered ? (
												<Active
													bg
													onClick={() => {
														deliveredOrdered(props._id);
													}}
												>
													Deliver
												</Active>
											) : (
												<Active
													onClick={() => {
														deliveredOrdered(props._id);
													}}
												>
													Not Deliver
												</Active>
											)}
										</Seen>
										<Detailed>
											<Named>{props.who}</Named>
											<DisplayNamed>displayName</DisplayNamed>
										</Detailed>
										<Status>
											<Named>{props.what}</Named>
											<DisplayNamed>{props.detail}</DisplayNamed>
											<CostOrder>#{props.cost}.00</CostOrder>
										</Status>
									</Header>
								))}
						</MinCard1>
					</TextHolderFile>
				</Card>
				<Card>
					<MinCard>
						<Iframe src="https://charts.mongodb.com/charts-project-0-bbtqu/embed/charts?id=62c15947-7e6a-47f7-89e2-26c53d4c947c&maxDataAge=3600&theme=light&autoRefresh=true" />
					</MinCard>

					<MinCardHolder>
						<TopCard>
							<Iframe src="https://charts.mongodb.com/charts-project-0-bbtqu/embed/charts?id=62c158bd-2fb0-4681-89f0-f0e9a2d8f3ac&maxDataAge=3600&theme=light&autoRefresh=true" />
						</TopCard>
						<BottomCard>
							<BCard>
								<IconBuild bg="rgb(86,202,0)" bc="rgba(86,202,0,0.7)">
									<IconPerson />
								</IconBuild>
								<CardTitleTExt>Total Membership strength: </CardTitleTExt>
								<TextCOunt>
									<AllCOunt>
										<Count> {members?.member?.length}</Count>
										<Count1>{12}%+</Count1>
									</AllCOunt>
								</TextCOunt>

								<DataCount>As at Today</DataCount>
							</BCard>
							<BCard>
								<IconBuild bg="rgb(255, 0, 0)" bc="rgba(255, 0,0,0.7)">
									<ChurchPerson />
								</IconBuild>
								<CardTitleTExt>Total Ministries: </CardTitleTExt>
								<TextCOunt>
									<AllCOunt>
										<Count> {ministry?.ministry?.length}</Count>
										<Count1>{45}%+</Count1>
									</AllCOunt>
								</TextCOunt>

								<DataCount>As at Today</DataCount>
							</BCard>

							<BCard1>
								<IconBuildNew bg="rgb(255,177,0)" bc="rgba(255,177,0, 0.7)">
									<GivePerson />
								</IconBuildNew>
								<CardTitleTExt>3 most recent Givers </CardTitleTExt>
								<TextCOunt>
									<TextCOunt24>
										{givers?.givers?.map((props) => (
											<AllCount>
												{props?.image ? (
													<Image24 src={props.image} />
												) : (
													<DemiImage24>ONE</DemiImage24>
												)}

												<DivName>{props.who}</DivName>
												<DivName>{props.admin}</DivName>
											</AllCount>
										))}
									</TextCOunt24>
								</TextCOunt>
							</BCard1>
						</BottomCard>
					</MinCardHolder>
				</Card>
				<Card>
					<TableCard>
						<TableHolder>
							<TopTitle>Ministries and their Fund Raised</TopTitle>

							<div>
								{ministryToGive && (
									<div>
										{Object?.keys(ministryToGive)?.map((key, i) => (
											<p key={i}>
												<Ministry>
													<MinistryHolder>
														<MinistryLogo>{key.charAt(0)} </MinistryLogo>
														<MinistryInfo>
															<MinistryName24>{key}</MinistryName24>
															<MinistryInfoName>Found Raised</MinistryInfoName>
														</MinistryInfo>
													</MinistryHolder>

													<MinistryCost>#{ministryToGive[key]}.00</MinistryCost>
												</Ministry>
											</p>
										))}
									</div>
								)}
							</div>
						</TableHolder>
					</TableCard>

					<TableCard>
						<TableHolder>
							<TopTitle>7 newly registered Member</TopTitle>

							<div>
								{members?.member &&
									members?.member.map((props) => (
										<Detail key={props._id}>
											{props?.avatar ? (
												<Image src={props.avatar} />
											) : (
												<DemiImage>ONE</DemiImage>
											)}
											<DetailHolder>
												<Name>{props.fullName}</Name>
												{props?.DisplayName ? (
													<DisplayName>{props.didsplayName}</DisplayName>
												) : (
													<DisplayName>No displayName yet!</DisplayName>
												)}
											</DetailHolder>
										</Detail>
									))}
							</div>
						</TableHolder>
					</TableCard>

					<TableCard>
						<TableHolder>
							<TopTitle>7 Recent GIVERS</TopTitle>

							<div>
								{givers7?.givers &&
									givers7?.givers.map((props) => (
										<Detail key={props._id}>
											{props?.image ? (
												<Image src={props.image} />
											) : (
												<DemiImage>ONE</DemiImage>
											)}
											<DetailHolder>
												<Name>{props.admin}</Name>
												<Name>{props.who}</Name>
												<DisplayName>#{props.cost}.00</DisplayName>
												<DisplayName>
													Giver to: <span>{props.name}</span>{" "}
												</DisplayName>
											</DetailHolder>
										</Detail>
									))}
							</div>
						</TableHolder>
					</TableCard>

					<TableCard1>
						<TableHolder>
							<TopTitle>Top 7 Latest Announcemnet</TopTitle>

							<div>
								{announcementOne7?.announcement &&
									announcementOne7?.announcement.map((props) => (
										<Detail1 key={props._id}>
											{props?.avatar ? (
												<Image src={props.avatar} />
											) : (
												<DemiImage>ONE</DemiImage>
											)}
											<DetailHolder1>
												<Name>{props.title}</Name>
												<DisplayName>{props.message}</DisplayName>
											</DetailHolder1>
										</Detail1>
									))}
							</div>
						</TableHolder>
					</TableCard1>
				</Card>
			</Wrapper>
		</Container>
	);
};

export default Overview;

const MinistryCost = styled.div`
	padding: 5px 10px;
	background-color: rgba(116, 46, 157, 0.2);
	color: rgb(116, 46, 157);
	font-weight: 700;
	font-size: 13px;
	border-radius: 20px;
`;

const MinistryInfoName = styled.div`
	font-size: 12px;
	font-weight: 500;
`;

const MinistryName24 = styled.div`
	font-weight: 700;
	text-transform: capitalize;
	font-size: 12px;
`;

const MinistryInfo = styled.div``;

const MinistryLogo = styled.div`
	padding: 10px 25px;
	background-color: #742e9d;
	border-radius: 4px;
	color: white;
	font-size: 25px;
	margin-right: 5px;
	font-weight: 700;
	text-transform: uppercase;
`;

const MinistryHolder = styled.div`
	display: flex;
	align-items: center;
`;

const Ministry = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const DivName = styled.div`
	font-size: 10px;
	color: gray;
	font-weight: 700;
	margin-top: 5px;
`;

const TextHolderFile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 1200px;
`;

const Text = styled.div`
	text-transform: uppercase;
	font-weight: 700;
	margin: 30px 0;
`;

const CostOrder = styled.div`
	font-weight: 700;
	font-size: 13px;
	color: red;
`;

const DisplayNamed = styled.div`
	font-size: 10px;
	color: gray;
`;

const Named = styled.div`
	font-weight: 700;
	font-size: 13px;
`;

const Active = styled.div`
	width: 50%;
	background-color: ${({ bg }) => (bg ? "#56ca00" : "red")};
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
	font-size: 13px;
	padding: 5px 10px;
	transition: all 350ms;
	text-align: center;
	:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
`;

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

const Status = styled.div`
	width: 300px;
`;

const Detailed = styled.div`
	width: 300px;
`;

const SeenVisible = styled.div`
	width: 70px;
`;

const Seen = styled.div`
	width: 130px;
`;

const Header = styled.div`
	padding: 10px 20px;
	display: flex;
	transition: all 350ms;
	border-bottom: 1px solid silver;
	align-items: center;
	font-size: ${({ fs }) => (fs ? "11px" : "")};
	font-weight: ${({ fs }) => (fs ? "700" : "")};
	background-color: ${({ fs }) => (fs ? "rgba(0,0,0,0.1)" : "")};
	text-transform: ${({ fs }) => (fs ? "uppercase" : "")};

	:hover {
		background-color: #f5f7fc;
	}
`;

const Iframe = styled.iframe`
	background: #f1f5f4;
	border: none;
	border-radius: 2px;
	box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);
	width: 100%;
	height: 100%;
`;

const GivePerson = styled(GiMoneyStack)`
	color: white;
	font-size: 40px;
`;

const ChurchPerson = styled(FaChurch)`
	color: white;
	font-size: 30px;
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

const AllCount = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 5px;
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

const TextCOunt24 = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
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

const IconBuildNew = styled.div`
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

const IconBuild = styled.div`
	width: 40px;
	height: 40px;
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

const Date = styled.div`
	font-size: 12px;
	font-weight: 700;
	margin-bottom: 10px;
	font-style: italic;
	padding-bottom: 20px;
`;

const ImagePix = styled.img`
	height: 130%;
	position: absolute;
	right: -20px;
	bottom: 0;
`;

const NoticeMessage = styled.div`
	margin-bottom: 20px;
	margin-top: 20px;
	width: 90%;
`;
const NoticeTitle = styled.div`
	font-size: 25px;
	font-weight: 700;
	margin-top: 20px;

	span {
		font-style: italic;
		font-weight: 900;
	}
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

const Space = styled.div`
	flex: 1;
`;
const Notice = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	padding-bottom: 20px;
`;

const DisplayName = styled.div`
	font-size: 11px;
	width: 100%;
	color: gray;

	span {
		font-weight: 700;
	}
`;
const Name = styled.div`
	font-size: 14px;
	font-weight: 700;
`;

const DetailHolder1 = styled.div`
	width: 90%;
`;

const DetailHolder = styled.div``;

const DemiImage = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	background-color: #742e9d;
	margin-right: 10px;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	font-weight: 700;
`;

const DemiImage24 = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	object-fit: cover;
	background-color: #742e9d;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	font-weight: 700;
	transition: all 350ms;

	:hover {
		/* background-color: rgba(0, 0, 0, 0.1); */
		opacity: 0.9;
		cursor: pointer;
	}
`;

const Image24 = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	object-fit: cover;
	background-color: #742e9d;
	transition: all 350ms;

	:hover {
		/* background-color: rgba(0, 0, 0, 0.1); */
		opacity: 0.9;
		cursor: pointer;
	}
`;

const Image = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	background-color: #742e9d;
	margin-right: 10px;
`;

const Detail1 = styled.div`
	display: flex;
	align-items: center;
	margin: 15px 0;
	transition: all 350ms;
	padding: 10px;
	:hover {
		background-color: #f5f7fc;
		cursor: crosshair;
	}
`;

const Detail = styled.div`
	display: flex;
	align-items: center;
	margin: 15px 0;
	transition: all 350ms;
`;

const TopTitle = styled.div`
	font-size: 12px;
	font-weight: 700;
`;

const TableHolder = styled.div`
	width: 90%;
	margin: 20px 0;
	/* height: 500px; */
`;

const TableCard1 = styled.div`
	width: 500px;
	min-height: 200px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 5px;
	margin-top: 20px;
	display: flex;
	justify-content: center;
	margin: 10px;

	@media screen and (max-width: 768px) {
		width: 80%;
	}
`;

const TableCard = styled.div`
	width: 300px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 5px;
	margin-top: 20px;
	display: flex;
	justify-content: center;
	margin: 10px;
`;

const BCard1 = styled.div`
	width: 180px;
	/* height: 400px; */
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 5px;
	margin: 10px 5px;
	padding: 20px;
`;

const BCard = styled.div`
	width: 180px;
	height: 200px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 5px;
	margin: 0 5px;
	padding: 20px;
`;

const BottomCard = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const TopCard = styled.div`
	width: 400px;
	height: 300px;
	background-color: green;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 5px;
	margin-bottom: 10px;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

const MinCardHolder = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	@media screen and (max-width: 768px) {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
`;

const MinCard1 = styled.div`
	/* width: 900px; */
	height: 100%;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 5px;
	margin-right: 10px;
	margin-bottom: 30px;
	overflow: hidden;
	background-color: white;
	border: 1px solid silver;

	width: 100%;
	max-width: 1200px;

	@media screen and (max-width: 768px) {
		width: 90%;
	}
`;

const MinCard = styled.div`
	width: 900px;
	height: 400px;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 5px;
	margin-right: 10px;
	margin-bottom: 10px;
	overflow: hidden;
`;

const Card = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const Fourth = styled.div``;
const Third = styled.div``;
const Second = styled.div``;
const Card2 = styled.div``;

const Card1 = styled.div`
	width: 250px;
	height: 200px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 3px;
	margin: 0 5px;
	padding: 20px;
	margin-bottom: 10px;
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
	height: 100%;
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

const Wrapper = styled.div`
	width: 98%;
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

const Container = styled.div`
	width: calc(100vw - 300px);
	min-height: 50vh;
	height: 100%;
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
