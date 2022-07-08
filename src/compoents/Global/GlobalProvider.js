import React, { useEffect, useState, createContext } from "react";

export const AuthContext = createContext();

export const GlobalProvider = ({ children }) => {
	const [myPaidToken, setMyPaidToken] = useState();

	return (
		<AuthContext.Provider
			value={{ myPaidToken, setMyPaidToken, text: "We are Ready!!!" }}
		>
			{children}
		</AuthContext.Provider>
	);
};
