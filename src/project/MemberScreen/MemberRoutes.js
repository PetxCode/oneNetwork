import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddProducts from "./AddProducts";
import CartPage from "./CartPage";
import DownloadCartPage from "./DownloadCart";
import Offerings from "./Offerings";
import OrderNotification from "./OrderNotification";
import Overview from "./Overview";
import Product from "./Product";
import SupportProjects from "./SupportProject";
import UpdateSettings from "./UpdateSettings";
import ViewMembers from "./ViewMembers";

const MemberRoutes = () => {
	const user = useSelector((state) => state.user);
	return (
		<>
			{user?.status === "member" ? (
				<Routes>
					{/* <Route path="/" element={<Overview />} /> */}
					<Route path="/downloadcart/:token" element={<DownloadCartPage />} />
					<Route path="/to-cart" element={<CartPage />} />
					<Route path="/order-notification" element={<OrderNotification />} />
					<Route path="/" element={<Product />} />
					<Route path="/view-member" element={<ViewMembers />} />
					<Route path="/offerings" element={<Offerings />} />
					<Route path="/supports" element={<SupportProjects />} />
					<Route path="/setting" element={<UpdateSettings />} />
					<Route path="/add-product" element={<AddProducts />} />
				</Routes>
			) : null}
		</>
	);
};

export default MemberRoutes;
