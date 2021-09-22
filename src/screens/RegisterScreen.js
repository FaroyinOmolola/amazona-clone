import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/UserActions";

function RegisterScreen(props) {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validated, setValidated] = useState(false);
	const [show, setShow] = useState(false);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			setValidated(true);
			e.stopPropagation();
		} else {
			if (password !== confirmPassword) {
				setShow(true);
			} else {
				setValidated(true);
				dispatch(register(name, email, password, confirmPassword));
			}
		}
	};
	const redirect = props.location.search
		? props.location.search.split("=")[1]
		: "/";

	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [props.history, redirect, userInfo]);

	return (
		<div>
			<Container>
				<Form
					onSubmit={submitHandler}
					noValidate
					validated={validated}
					className="w-md-50 w-75  mx-auto"
				>
					<div className="mb-3 ">
						<h1>Create Account</h1>
					</div>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="name">Name</Form.Label>
						<Form.Control
							type="text"
							id="name"
							placeholder="Enter name"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Please enter a name
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label htmlFor="email">Email address</Form.Label>
						<Form.Control
							type="email"
							id="email"
							placeholder="Enter email"
							value={email}
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Please enter a valid email e.g. abc@example.com
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label htmlFor="password">Password</Form.Label>
						<Form.Control
							type="password"
							id="password"
							value={password}
							placeholder="Password"
							pattern="(?=.*\d).{4}"
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Form.Text className="text-muted">
							password should be a 4 digit number.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label htmlFor="confirmPassword"> Confirm Password</Form.Label>
						<Form.Control
							type="password"
							id="confirmPassword"
							value={confirmPassword}
							placeholder=" Confirm Password"
							pattern="(?=.*\d).{4}"
							required
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<Form.Text className="text-muted">
							should match password entered above.
						</Form.Text>
					</Form.Group>
					{show && (
						<Alert
							variant="danger"
							className=""
							onClose={() => setShow(false)}
							dismissible
						>
							<small>password and confirm password does not match</small>
						</Alert>
					)}

					<Button variant="warning" className="w-100" type="submit">
						Register
					</Button>
					<div>
						<label />
						<div>
							Already have an account?{" "}
							<Link
								className="text-decoration-none text-warning"
								to={`/signin?redirect=${redirect}`}
							>
								Sign In
							</Link>{" "}
						</div>
					</div>
				</Form>
			</Container>
		</div>
	);
}

export default RegisterScreen;
