import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../index.css";

function CheckoutSteps(props) {
	return (
		<div className="checkoutsteps">
			<Container>
				<Row>
					<Col className={props.step1 ? "actived" : "inactive"}>Sign In</Col>
					<Col className={props.step2 ? "actived" : "inactive"}>Shipping</Col>
					<Col className={props.step3 ? "actived" : "inactive"}>Payment</Col>
					<Col className={props.step4 ? "actived" : "inactive"}>
						Place Order
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default CheckoutSteps;
