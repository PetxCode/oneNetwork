import React from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";

const JustLook = () => {
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

	const reveal = () => {
		const sideBar = document.getElementById("sideBar");
		sideBar.style.width = "320px";
		const getMe = document.getElementById("menu");
		const getCancel = document.getElementById("cancel");
		getMe.style.display = "none";
		getCancel.style.display = "block";
	};

	const dismiss = () => {
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
		<Wrapper id="header">
			<Container>
				<Left>
					<Logo src="/images/logo.png" />
					<Text>Distress</Text>
				</Left>
				<Navigators className="links-container">
					<Nav href="#header" className="scroll-link">
						Home
					</Nav>
					<Nav href="#second" className="scroll-link">
						Features
					</Nav>
					<Nav href="#third" className="scroll-link">
						Pricing
					</Nav>
					<Nav href="#fouth" className="scroll-link">
						Statistics
					</Nav>
				</Navigators>
				<Right>
					<Button1 href="https://distress-signal.herokuapp.com/signin">
						Log in
					</Button1>
					<Button href="https://distress-signal.herokuapp.com/signup">
						Sign up
					</Button>
				</Right>
				<Menu
					id="menu"
					onClick={() => {
						reveal();
					}}
				>
					<AiOutlineMenu />
				</Menu>

				<Cancel
					id="cancel"
					onClick={() => {
						dismiss();
					}}
				>
					<AiOutlineClose />
				</Cancel>
			</Container>
			<SideBar id="sideBar">
				<Navigator2>
					<Nav2>Home</Nav2>
					<Nav2>Features</Nav2>
					<Nav2>Pricing</Nav2>
					<Nav2>Statistics</Nav2>
				</Navigator2>
				<Logs>
					<Button2 href="https://distress-signal.herokuapp.com/signin">
						Log in
					</Button2>
					<Button3 href="https://distress-signal.herokuapp.com/signup">
						Sign up
					</Button3>
				</Logs>
				<Logo src="/images/logo.png" />
			</SideBar>
		</Wrapper>
	);
};

export default JustLook;

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	transition: all 350ms ease-in-out;
	z-index: 100;
	height: 80px;
`;

const Container = styled.div`
	width: 90%;
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: space-between;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled.img`
	height: 50px;
`;

const Text = styled.div`
	margin-left: 5px;
	font-weight: 500;
	font-size: 18px;
`;

const Navigators = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	padding-left: 20px;
	border-left: 1px solid rgba(0, 0, 0, 0.4);
	margin-left: 20px;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const Nav = styled.a`
	font-weight: 500;
	margin-right: 30px;
	font-size: 14px;
	cursor: pointer;
	text-decoration: none;
	color: black;
`;

const Right = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const Button = styled.a`
	font-size: 14px;
	font-weight: 500;
	padding: 10px 20px;
	color: white;
	background: #0a58ed;
	border-radius: 5px;
	cursor: pointer;
	transition: all 350ms;
	text-decoration: none;
	:hover {
		opacity: 0.7;
	}
`;

const Button1 = styled.a`
	font-size: 14px;
	font-weight: 500;
	color: #0a58ed;
	cursor: pointer;
	transition: all 350ms;
	text-decoration: none;
	margin-right: 20px;
	:hover {
		opacity: 0.7;
	}
`;

const Menu = styled.div`
	font-size: 20px;
	display: none;
	@media screen and (max-width: 768px) {
		display: block;
	}
`;

const SideBar = styled.div`
	width: 0;
	height: 100vh;
	background: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(2px);
	position: fixed;
	z-index: 1000;
	left: 0;
	border-radius: 0 0 10px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	color: white;
	transition: all 350ms ease-in-out;
	overflow: hidden;
`;

const Navigator2 = styled.div`
	margin-top: 50px;
	text-align: center;
`;

const Nav2 = styled.div`
	margin-top: 20px;
	padding: 10px 100px;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 3px;
	:hover {
		background: rgba(255, 255, 255, 0.2);
	}
`;

const Logs = styled.div`
	margin-top: 50px;
	text-align: center;
	flex: 0.8;
	display: flex;
	flex-direction: column;
`;

const Button2 = styled.a`
	margin-top: 20px;
	padding: 10px 100px;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 3px;
	color: #0a58ed;
	text-decoration: none;
	font-weight: 500;
`;

const Button3 = styled.a`
	margin-top: 20px;
	padding: 10px 100px;
	background: #0a58ed;
	border-radius: 3px;
	color: white;
	font-weight: 500;
	text-decoration: none;
`;

const Cancel = styled.div`
	display: none;
`;
