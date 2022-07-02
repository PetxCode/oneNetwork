import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logOut } from "../../compoents/Global/Global";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import {
	BsFillEyeFill,
	BsFillEyeSlashFill,
	BsFillCartFill,
} from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import pix from "./pix.jpeg";
import { Link, useNavigate } from "react-router-dom";
import MemberSiderMain from "./MemberSiderMain";

const MemberHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const count = useSelector((state) => state.materialCart);

	const [visible, setVisible] = useState(false);

	const onVisible = () => {
		setVisible(!visible);
	};

	const getHeader = document.getElementById("header");
	const linksContainer = document.querySelector(".links-container");

	window.addEventListener("scroll", function () {
		const scrollHeight = window.pageYOffset;
		const navHeight = getHeader.getBoundingClientRect().height;
		if (scrollHeight > navHeight) {
			getHeader.style.position = "fixed";
			getHeader.style.background = "white";
		} else {
			getHeader.style.position = "unset";
		}
	});

	const revealMeun = () => {
		const sideBar = document.getElementById("sideBar");
		sideBar.style.width = "260px";
		const getMe = document.getElementById("menu");
		const getCancel = document.getElementById("cancel");
		getMe.style.display = "none";
		getCancel.style.display = "block";
	};

	const dismissMeun = () => {
		const sideBar = document.getElementById("sideBar");
		sideBar.style.width = "0";
		const getMe = document.getElementById("menu");
		const getCancel = document.getElementById("cancel");
		getMe.style.display = "block";
		getCancel.style.display = "none";
	};

	const scrollLinks = document.querySelectorAll(".scroll-link");
	scrollLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			// prevent default
			e.preventDefault();
			// navigate to specific spot
			const id = e.currentTarget.getAttribute("href").slice(1);
			const element = document.getElementById(id);

			const navHeight = getHeader.getBoundingClientRect().height;
			const containerHeight = linksContainer.getBoundingClientRect().height;
			const fixedNav = getHeader.classList.contains("fixed-nav");
			let position = element.offsetTop - navHeight;

			if (!fixedNav) {
				position = position - navHeight;
			}
			if (navHeight > 82) {
				position = position + containerHeight;
			}

			window.scrollTo({
				left: 0,
				top: position,
			});
			// close
			linksContainer.style.height = 0;
		});
	});

	return (
		<Container>
			<Wrapper>
				<Holder>
					<MenuDisplay>
						<MenuHolder
							id="menu"
							onClick={() => {
								revealMeun();
								console.log("Open");
							}}
						>
							<Menu />
						</MenuHolder>
						<MenuHolderClose
							id="cancel"
							onClick={() => {
								dismissMeun();
								console.log("Close");
							}}
						>
							<MenuClose />
						</MenuHolderClose>
					</MenuDisplay>

					<Search>
						<Icon />
						<SearchInput placeholder="search" />
					</Search>
				</Holder>

				<Holder>
					<Diva>
						<CartHolder to="/to-cart">
							<Cart />
							<TextDataCount>
								<span>{count.length}</span>
							</TextDataCount>
						</CartHolder>

						{visible ? (
							<VisibleIcon onClick={onVisible} />
						) : (
							<NonVisibleIcon onClick={onVisible} />
						)}
						<Coder>
							<Div>Church Code</Div>
							{visible ? (
								<HoldCode>{user.churchCode}</HoldCode>
							) : (
								<HoldCode>**********</HoldCode>
							)}
						</Coder>
					</Diva>

					<ImageHolder>
						<Image src={pix} />
						<Green />
					</ImageHolder>
					<Button
						onClick={() => {
							dispatch(logOut());
							navigate("/");
						}}
					>
						Log Out
					</Button>
				</Holder>
			</Wrapper>

			<MySideBar id="sideBar">
				<MemberSiderMain />
			</MySideBar>
		</Container>
	);
};

export default MemberHeader;

const MenuDisplay = styled.div`
	display: none;

	@media screen and (max-width: 768px) {
		display: block;
	}
`;

const MySideBar = styled.div`
	width: 0;
	height: 100%;
	background: #f4f5fa;
	backdrop-filter: blur(2px);
	position: fixed;
	z-index: 100;
	left: 0;
	bottom: 0;
	border-radius: 0 0 10px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	color: white;
	transition: all 350ms ease-in-out;
	overflow: hidden;
`;

const CartHolder = styled(Link)`
	text-decoration: none;
`;

const Cart = styled(BsFillCartFill)`
	color: #742e9d;
	font-size: 30px;
	margin-right: 13px;
`;

const TextDataCount = styled.div`
	position: absolute;
	left: 20px;
	top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: red;
	color: white;
	font-size: 10px;
	font-weight: 700;
`;

const Div = styled.div``;
const Coder = styled.div`
	display: flex;
	flex-direction: column;
`;
const Diva = styled.div`
	display: flex;
	align-items: center;
	position: relative;
`;

const NonVisibleIcon = styled(BsFillEyeFill)`
	font-size: 30px;
	margin-right: 20px;
`;

const VisibleIcon = styled(BsFillEyeSlashFill)`
	font-size: 30px;
	margin-right: 20px;
`;

const HoldCode = styled.div`
	font-size: 20px;
	font-weight: 700;
	margin-right: 20px;
`;

const MenuClose = styled(AiOutlineClose)`
	font-size: 28px;
	margin-left: 5px;
	margin-top: 5px;
`;

const Menu = styled(GiHamburgerMenu)`
	font-size: 28px;
	margin-left: 5px;
	margin-top: 5px;
`;

const MenuHolderClose = styled.div`
	display: none;

	@media screen and (max-width: 768px) {
		display: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		justify-content: center;
		align-items: center;
		transition: all 350ms;
		z-index: 20;
		:hover {
			transform: scale(1.02);
			background-color: rgba(116, 46, 157, 0.1);
			cursor: pointer;
		}
	}
`;

const MenuHolder = styled.div`
	display: none;

	@media screen and (max-width: 768px) {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		justify-content: center;
		align-items: center;
		transition: all 350ms;

		:hover {
			transform: scale(1.02);
			background-color: rgba(116, 46, 157, 0.1);
			cursor: pointer;
		}
	}
`;

const Hold = styled.div``;

const Green = styled.div`
	width: 10px;
	height: 10px;
	background-color: #56ca00;
	border-radius: 50%;
	position: absolute;
	bottom: -3px;
	left: -3px;
	border: 2px solid white;
`;

const ImageHolder = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	background-color: #742e9d;
	transition: all 350ms;
	position: relative;

	:hover {
		transform: scale(1.02);
		cursor: pointer;
		background-color: rgba(116, 46, 157, 0.9);
	}
`;

const Icon = styled(BiSearch)`
	color: #742e9d;
	font-size: 25px;
	margin-left: 10px;
`;

const SearchInput = styled.input`
	background-color: transparent;
	flex: 1;
	height: 100%;
	border: 0;
	outline: none;

	::placeholder {
		font-family: Poppins;
		font-weight: 500;
		color: #742e9d;
		letter-spacing: 1.5px;
	}
`;

const Search = styled.div`
	width: 300px;
	height: 40px;
	border-radius: 30px;
	border: 1px solid #742e9d;
	display: flex;
	align-items: center;

	@media screen and (max-width: 968px) {
		display: none;
	}
`;

const Holder = styled.div`
	display: flex;
	align-items: center;
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

const Image = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	background-color: #742e9d;
	transition: all 350ms;

	:hover {
		transform: scale(1.02);
		cursor: pointer;
		background-color: rgba(116, 46, 157, 0.9);
	}
`;

const Wrapper = styled.div`
	width: 95%;
	display: flex;
	justify-content: space-between;
`;

const Container = styled.div`
	min-width: calc(100vw - 260px);
	height: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	right: 0;
	top: 0;
	background-color: #f4f5fa;
	/* box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px; */
	z-index: 1;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;