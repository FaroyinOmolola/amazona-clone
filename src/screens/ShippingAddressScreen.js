import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/CartAction";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingAddressScreen(props) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	if (!userInfo) {
		props.history.push("/signin");
	}
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [fullname, setFullname] = useState(shippingAddress?.fullname);
	const [address, setAddress] = useState(shippingAddress?.address);
	const [city, setCity] = useState(shippingAddress?.city);
	const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
	const [country, setCountry] = useState(shippingAddress?.country);
	const [validated, setValidated] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			setValidated(true);
			setShowValidation(true);
			e.stopPropagation();
		} else {
			setValidated(true);
			setShowValidation(false);
			dispatch(
				saveShippingAddress({ fullname, address, city, postalCode, country })
			);
			props.history.push("/payment");
		}
	};

	return (
		<div>
			<CheckoutSteps step1 step2 />
			<Container>
				<Form
					onSubmit={submitHandler}
					noValidate
					validated={validated}
					className="w-md-50 w-75  mx-auto"
				>
					<div className="mb-3 ">
						<h1>Shipping Address</h1>
					</div>

					{showValidation && (
						<Alert
							variant="danger"
							className=""
							onClose={() => setShowValidation(false)}
							dismissible
						>
							<small>please fill all fields correctly</small>
						</Alert>
					)}

					<Form.Group className="mb-3">
						<Form.Label htmlFor="fullname">Full Name</Form.Label>
						<Form.Control
							type="text"
							id="fullname"
							value={fullname}
							placeholder="Enter name"
							required
							onChange={(e) => setFullname(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label htmlFor="address"> Address</Form.Label>
						<Form.Control
							type="text"
							id="address"
							value={address}
							placeholder="Enter address"
							required
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label htmlFor="city">City</Form.Label>
						<Form.Control
							type="text"
							id="city"
							value={city}
							placeholder="Enter city"
							required
							onChange={(e) => setCity(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label htmlFor="postalCode">Postal Code</Form.Label>
						<Form.Control
							type="text"
							id="postalCode"
							value={postalCode}
							pattern="(?=.*\d).{6}"
							placeholder="Enter postal code"
							required
							onChange={(e) => setPostalCode(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label htmlFor="country">Country</Form.Label>
						<Form.Control
							type="text"
							id="country"
							value={country}
							placeholder="Enter country"
							required
							onChange={(e) => setCountry(e.target.value)}
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

export default ShippingAddressScreen;
