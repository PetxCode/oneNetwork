import React from "react";
import { usePaystackPayment } from "react-paystack";
import styled from "styled-components";

function PayStack() {
	const config = {
		reference: new Date().getTime().toString(),
		email: "user@example.com",
		amount: 20000,
		publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx",
	};

	const onSuccess = (reference) => {
		console.log(reference);
	};

	const onClose = () => {
		console.log("closed");
	};

	const initializePayment = usePaystackPayment(config);
	return (
		<Container>
			<button
				onClick={() => {
					initializePayment(onSuccess, onClose);
				}}
			>
				Paystack Hooks Implementation
			</button>
		</Container>
	);
}

export default PayStack;

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
