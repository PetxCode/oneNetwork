import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
	AiFillNotification,
	AiFillPieChart,
	AiFillSetting,
} from "react-icons/ai";
import { BsFillBagFill, BsPersonCircle, BsFillCartFill } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../compoents/Global/Global";

const MemberSiderMain = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
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
			<LogoHolder to="/">
				{/* <Bar>One</Bar> */}
				{user?.avatar ? <LogoImage /> : <Logo>ONE</Logo>}

				<LogoTitle>
					{user?.churchName ? user?.churchName : <div>One Church Network</div>}
				</LogoTitle>
			</LogoHolder>

			<NavOptions>
				{/* <Nav
					to="/"
					id="cancel"
					onClick={() => {
						dismissMeun();
						console.log("Close");
					}}
				>
					<Icon />
					<span>Overview</span>
				</Nav> */}

				<Nav
					to="/"
					id="cancel"
					onClick={() => {
						dismissMeun();
						console.log("Close");
					}}
				>
					<ProdIcon />
					<span>Product</span>
				</Nav>
				<Nav
					to="/order-notification"
					id="cancel"
					onClick={() => {
						dismissMeun();
						console.log("Close");
					}}
				>
					<NotifyIcon />
					<span>Order Notification</span>
				</Nav>

				<Nav
					to="/to-cart"
					id="cancel"
					onClick={() => {
						dismissMeun();
						console.log("Close");
					}}
				>
					<CartIcon />
					<span>View Cart</span>
				</Nav>

				<Nav
					to="/setting"
					id="cancel"
					onClick={() => {
						dismissMeun();
						console.log("Close");
					}}
				>
					<SetIcon />
					<span>Settings</span>
				</Nav>

				<Nav
					to="/view-member"
					id="cancel"
					onClick={() => {
						dismissMeun();
						console.log("Close");
					}}
				>
					<MembIcon />
					<span>Members</span>
				</Nav>

				<Nav
					to="/offerings"
					id="cancel"
					onClick={() => {
						dismissMeun();
						console.log("Close");
					}}
				>
					<OffIcon />
					<span>Pay Offering</span>
				</Nav>

				<Space />

				<Nav1
					to="/supports"
					id="cancel"
					onClick={() => {
						dismissMeun();
						console.log("Close");
					}}
				>
					<span>Support the Ministry</span>
				</Nav1>
				<Space />

				<ButtonHolder>
					<Button
						onClick={() => {
							dispatch(logOut());
							navigate("/");
						}}
					>
						Log Out
					</Button>
				</ButtonHolder>
			</NavOptions>
		</Container>
	);
};

export default MemberSiderMain;

const ButtonHolder = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
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

const Space = styled.div`
	flex: 1;
`;

const CartIcon = styled(BsFillCartFill)`
	font-size: 30px;
	margin-right: 10px;
	margin-left: 20px;
`;

const OffIcon = styled(GiPayMoney)`
	font-size: 30px;
	margin-right: 10px;
	margin-left: 20px;
`;

const MembIcon = styled(BsPersonCircle)`
	font-size: 30px;
	margin-right: 10px;
	margin-left: 20px;
`;

const SetIcon = styled(AiFillSetting)`
	font-size: 30px;
	margin-right: 10px;
	margin-left: 20px;
`;

const NotifyIcon = styled(AiFillNotification)`
	font-size: 30px;
	margin-right: 10px;
	margin-left: 20px;
`;

const ProdIcon = styled(BsFillBagFill)`
	font-size: 30px;
	margin-right: 10px;
	margin-left: 20px;
`;

const Icon = styled(AiFillPieChart)`
	font-size: 30px;
	margin-right: 10px;
	margin-left: 20px;
`;

const Nav1 = styled(NavLink)`
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	color: rgba(0, 0, 0, 0.6);
	transition: all 350ms;
	background-color: #742e9d;
	color: white;
	letter-spacing: 1.5px;
	margin-top: 30px;

	span {
		font-weight: 700;
		text-transform: uppercase;
		font-size: 12px;
	}

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
		cursor: pointer;
	}

	&.active {
		border-left: 5px solid darkorange;
		background-color: #e8eef7;
		color: #742e9d;
		width: 98%;
	}
`;

const Nav = styled(NavLink)`
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	text-decoration: none;
	color: rgba(0, 0, 0, 0.5);
	transition: all 350ms;
	margin: 10px 0;

	span {
		font-weight: 700;
		text-transform: uppercase;
		font-size: 12px;
	}

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
		cursor: pointer;
	}

	&.active {
		border-left: 5px solid darkorange;
		background-color: #e8eef7;
		color: #742e9d;
		width: 98%;
	}
`;

const NavOptions = styled.div`
	margin-top: 40px;
	color: rgba(0, 0, 0, 0.7);
	height: 80%;
	display: flex;
	flex-direction: column;
`;

const LogoTitle = styled.div`
	font-weight: 700;
	color: gray;
	width: 100px;
	line-height: 1;
	font-size: 25px;
	color: #742e9d;
`;

const LogoImage = styled.img`
	padding: 20px;
	background-color: #742e9d;
	color: white;
	border-radius: 3px;
	margin-right: 5px;
	font-weight: 700;
	object-fit: contain;
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
	/* position: absolute; */
	z-index: 10000;
`;

const Container = styled.div`
	width: 260px;
	min-height: 100vh;
	position: fixed;
	/* background-color: lightblue; */
	border-right: 1px dotted silver;
	z-index: 100;
`;
