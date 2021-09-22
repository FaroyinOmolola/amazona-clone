import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/CartAction";

function PaymentScreen(props) {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	if (!shippingAddress.address) {
		props.history.push("./shipping");
	}

	const [paymentMethod, setPaymentMethod] = useState("Paypal");
	const [validated, setValidated] = useState(false);
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			setValidated(true);
			e.stopPropagation();
		} else {
			setValidated(true);
			dispatch(savePaymentMethod(paymentMethod));
			props.history.push("/placeorder");
		}
	};
	return (
		<div>
			<CheckoutSteps step1 step2 step3 />
			<Container>
				<Form
					onSubmit={submitHandler}
					noValidate
					validated={validated}
					className=" w-50 mx-auto"
				>
					<div className="mb-3 ">
						<h1>Payment Method</h1>
					</div>

					<Form.Group className="mb-3">
						<Form.Check
							type="radio"
							value="PayPal"
							name="paymentMethod"
							label="PayPal"
							id="PayPal"
							required
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Check
							type="radio"
							value="Stripe"
							name="paymentMethod"
							label="Stripe"
							id="Stripe"
							required
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
					</Form.Group>

					<Button variant="warning" className="w-100" type="submit">
						Continue
					</Button>
				</Form>
			</Container>
		</div>
	);
}

export default PaymentScreen;
