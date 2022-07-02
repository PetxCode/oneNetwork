import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { AiFillPieChart, AiFillSetting, AiFillAudio } from "react-icons/ai";
import { BsFillBagFill, BsPersonCircle } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { useSelector } from "react-redux";

const AdminSideBar = () => {
	const user = useSelector((state) => state.user);
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
				<Nav to="/">
					<Icon />
					<span>Overview</span>
				</Nav>

				<Nav to="/announcement">
					<ProdIcon />
					<span>Make Announcement</span>
				</Nav>

				<Nav to="/product">
					<ProdIcon />
					<span>Product</span>
				</Nav>

				<Nav to="/add-products">
					<AddIcon />
					<span>Add Product</span>
				</Nav>

				<Nav to="/settings">
					<SetIcon />
					<span>Settings</span>
				</Nav>

				<Nav to="/view-members">
					<MembIcon />
					<span>Members</span>
				</Nav>

				<Nav to="/offering">
					<OffIcon />
					<span>Pay Offering</span>
				</Nav>

				<Space />

				<Nav1 to="/support">
					<span>Support the Ministry</span>
				</Nav1>
			</NavOptions>
		</Container>
	);
};

export default AdminSideBar;

const Space = styled.div`
	flex: 1;
`;

const AddIcon = styled(AiFillAudio)`
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
	height: 85%;
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
`;

const Container = styled.div`
	width: 260px;
	height: 100vh;
	position: fixed;
	background-color: #f4f5fa;
	border-right: 1px dotted silver;
	z-index: 2;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;
