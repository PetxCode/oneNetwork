import React, { useState } from "react";
import styled from "styled-components";
import pix from "./pii.png";
import { AiFillAudio } from "react-icons/ai";
import { BsFillBookFill, BsPersonCircle } from "react-icons/bs";
import { FaMoneyCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import myURL from "../../urlData.json";
import axios from "axios";
import { useEffect } from "react";

const url = "https://onechurch1.herokuapp.com";

const Overview = () => {
	const user = useSelector((state) => state.user);
	const newURL = myURL[0].url;
	const [members, setMembers] = useState({});
	const [audioContent, setAudioContent] = useState({});
	const [loading, setLoading] = useState(false);

	const getAllMembers = async () => {
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `${url}/api/admin/${user?._id}`;
		await axios
			.get(url)
			.then((res) => {
				setMembers(res.data.data);
			})
			.catch((err) => console.log(err.message));
	};

	const getAllAudio = async () => {
		// const url = `${newURL}/api/admin/${user._id}`;
		const url = `${url}/api/content/${user?._id}`;
		await axios
			.get(url)
			.then((res) => {
				setAudioContent(res.data.data);
				console.log("Members: ", audioContent);
			})
			.catch((err) => console.log(err.message));
	};

	useEffect(() => {
		getAllMembers();
		getAllAudio();
	}, []);

	return (
		<Container>
			<Wrapper>
				<Top>
					<TopSider>
						<NoticeHolder>
							<Notice>
								<NoticeTitle>Welcome Back {user.fullName} 🎉</NoticeTitle>
								<Space />
								<NoticeMessage>
									You have done 72% 🤩 more sales today. Check your new raising
									badge in your profile.
								</NoticeMessage>
								<Date>Date</Date>
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
							<IconBuild bg="rgba(116,46,157,0.7)" bc="rgb(116,46,157)">
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
						<Card1>
							<IconBuild bg="rgba(86,202,0,0.7)" bc="rgb(86,202,0)">
								<IconDataMoney />
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

				{/* <Second>Second</Second>
				<Third>Third</Third>
				<Fourth>Fourth</Fourth> */}

				<Card>
					<MinCard>Most Top</MinCard>
					<MinCardHolder>
						<TopCard>Top Card</TopCard>
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
							<BCard>2</BCard>
						</BottomCard>
					</MinCardHolder>
				</Card>

				<TableCard>
					<TableHolder>
						<TopTitle>Top 5 newly registeres Member</TopTitle>
						{members?.member?.length < 5 ? (
							<div>
								{members?.member.map((props) => (
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
						) : null}
					</TableHolder>
				</TableCard>
			</Wrapper>
		</Container>
	);
};

export default Overview;

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

const Date = styled.div`
	font-size: 12px;
	font-weight: 700;
	margin-bottom: 10px;
	font-style: italic;
`;

const ImagePix = styled.img`
	height: 130%;
	position: absolute;
	right: -40px;
	bottom: 0;
`;

const NoticeMessage = styled.div`
	margin-bottom: 20px;
	width: 90%;
`;
const NoticeTitle = styled.div`
	font-size: 25px;
	font-weight: 700;
	margin-top: 20px;
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
`;

const DisplayName = styled.div`
	font-size: 11px;
	width: 100%;
	color: gray;
`;
const Name = styled.div`
	font-size: 14px;
	font-weight: 700;
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

const Image = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	background-color: #742e9d;
	margin-right: 10px;
`;

const Detail = styled.div`
	display: flex;
	align-items: center;
	margin: 15px 0;
`;

const TopTitle = styled.div`
	font-size: 12px;
	font-weight: 700;
`;

const TableHolder = styled.div`
	width: 90%;
	margin: 20px 0;
`;

const TableCard = styled.div`
	width: 300px;
	height: 200px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 5px;
	margin-top: 20px;
	display: flex;
	justify-content: center;
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
	height: 200px;
	background-color: green;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 5px;
	margin-bottom: 10px;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

const MinCardHolder = styled.div`
	@media screen and (max-width: 768px) {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
`;

const MinCard = styled.div`
	width: 900px;
	height: 400px;
	background-color: red;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	border-radius: 5px;
	margin-right: 10px;
	margin-bottom: 10px;
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
	height: 200px;
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
