import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddProducts from "./AddProducts";
import MakeAnnouncement from "./MakeAnnouncement";
import Offerings from "./Offerings";
import Overview from "./Overview";
import PayStack from "./Paystack";
import Product from "./Product";
import SupportProjects from "./SupportProject";
import UpdateSettings from "./UpdateSettings";
import ViewMembers from "./ViewMembers";

const AdminRoutes = () => {
	const user = useSelector((state) => state.user);
	return (
		<>
			{user?.status === "admin" ? (
				<Routes>
					<Route path="/" element={<Overview />} />
					<Route path="/announcement" element={<MakeAnnouncement />} />
					<Route path="/product" element={<Product />} />
					<Route path="/view-members" element={<ViewMembers />} />
					<Route path="/offering" element={<Offerings />} />
					<Route path="/support" element={<SupportProjects />} />
					<Route path="/settings" element={<UpdateSettings />} />
					<Route path="/add-products" element={<AddProducts />} />
				</Routes>
			) : null}
		</>
	);
};

export default AdminRoutes;
