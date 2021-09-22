import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/UserActions";
import { useSelector } from "react-redux";

function SignInScreen(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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
			dispatch(signin(email, password));
		}
	};

	const redirect = props.location.search
		? props.location.search.split("=")[1]
		: "/";

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

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
						<h1>Sign In</h1>
					</div>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="email">Email address</Form.Label>
						<Form.Control
							type="email"
							id="email"
							placeholder="Enter email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
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
						<Form.Control.Feedback type="invalid">
							Password should be a 4 digit number.
						</Form.Control.Feedback>
					</Form.Group>

					<Button variant="warning" className="w-100" type="submit">
						Sign In
					</Button>
					<div>
						<label />
						<div>
							New customer?{" "}
							<Link
								className="text-decoration-none text-warning"
								to={`/register?redirect=${redirect}`}
							>
								Create account
							</Link>{" "}
						</div>
					</div>
				</Form>
			</Container>
		</div>
	);
}

export default SignInScreen;
