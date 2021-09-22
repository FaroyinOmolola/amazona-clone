import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/OrderAction";
import { ORDER_CREATE_RESET } from "../constants/OrderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function OrderScreen(props) {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	if (!cart.paymentMethod) {
		props.history.push("./payment");
	}

	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, error, order } = orderCreate;
	const toPrice = (num) => Number(num.toFixed(2));

	cart.itemsPrice = toPrice(
		cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
	);

	cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(100) : toPrice(10);

	cart.taxPrice = toPrice(0.15 * cart.itemsPrice);

	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	const dispatch = useDispatch();
	const placeOrderHandler = () => {
		dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
	};

	useEffect(() => {
		if (success) {
			props.history.push(`/order`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [success, props.history, dispatch]);

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />

			<Row>
				<Col sm={8}>
					<ul className="p-3">
						<li className="list-unstyled mb-3">
							<Card>
								<Card.Header>Shipping</Card.Header>
								<Card.Body>
									<Card.Text>
										<strong>Name: </strong>
										{cart.shippingAddress.fullname}
									</Card.Text>
									<Card.Text>
										<strong>Address: </strong>
										{cart.shippingAddress.address},{" "}
										{cart.shippingAddress.city},{" "}
										{cart.shippingAddress.postalCode},{" "}
										{cart.shippingAddress.country}
									</Card.Text>
								</Card.Body>
							</Card>
						</li>
						<li className="list-unstyled mb-3">
							<Card>
								<Card.Header>Payment</Card.Header>
								<Card.Body>
									<Card.Text>
										<strong>Method: </strong>
										{cart.paymentMethod}
									</Card.Text>
								</Card.Body>
							</Card>
						</li>
						<li className="list-unstyled mb-3">
							<Card>
								<Card.Header>Ordered Items</Card.Header>
								<Card.Body>
									<Card.Text>
										{cartItems.length === 0 ? (
											<div>
												Cart is empty.{" "}
												<Link
													to="/"
													className="text-decoration-none "
												>
													{" "}
													Go Shopping{" "}
												</Link>
											</div>
										) : (
											<ul className="p-0">
												{cartItems.map((item) => (
													<>
														<li
															key={item.product}
															className="list-unstyled "
														>
															<Row className="p-0">
																<Col className="my-2">
																	<img
																		style={{
																			maxWidth:
																				"5rem",
																			width: "100%",
																		}}
																		src={
																			item.image
																		}
																		alt={
																			item.name
																		}
																		className="img-fluid img-thumbnail"
																	/>
																</Col>
																<Col className="my-2">
																	<small>
																		<Link
																			to={`/product/${item.product}`}
																			className="text-decoration-none"
																		>
																			{
																				item.name
																			}
																		</Link>
																	</small>
																</Col>
																<Col className="my-2">
																	<small>
																		{
																			item.qty
																		}{" "}
																		x{" "}
																		<span className="naira">
																			N
																		</span>{" "}
																		{
																			item.price
																		}{" "}
																		={" "}
																		{item.price *
																			item.qty}
																	</small>
																</Col>
															</Row>
														</li>
													</>
												))}
											</ul>
										)}
									</Card.Text>
								</Card.Body>
							</Card>
						</li>
					</ul>
				</Col>
				<Col sm={4}>
					<ul className="p-3">
						<li className="list-unstyled mb-3">
							<Card className="mb-3">
								<Card.Header>Order Summary</Card.Header>
								<Card.Body>
									<Card.Text>
										<Row>
											<Col>Items price</Col>
											<Col>
												<small>
													<span className="naira">
														N
													</span>{" "}
													{cart.itemsPrice.toFixed(2)}
												</small>
											</Col>
										</Row>
									</Card.Text>
									<Card.Text>
										<Row>
											<Col>Shipping price</Col>
											<Col>
												<small>
													<span className="naira">
														N
													</span>{" "}
													{cart.shippingPrice.toFixed(
														2
													)}
												</small>
											</Col>
										</Row>
									</Card.Text>
									<Card.Text>
										<Row>
											<Col>Tax</Col>
											<Col>
												<small>
													<span className="naira">
														N
													</span>{" "}
													{cart.taxPrice.toFixed(2)}
												</small>
											</Col>
										</Row>
									</Card.Text>
								</Card.Body>
								<Card.Footer>
									<Row>
										<Col>
											{" "}
											<strong>Total</strong>
										</Col>
										<Col>
											<strong>
												<small>
													<span className="naira">
														N
													</span>{" "}
													{cart.totalPrice.toFixed(2)}
												</small>
											</strong>
										</Col>
									</Row>
								</Card.Footer>
							</Card>
						</li>
						<li className="list-unstyled mb-3">
							<Button
								type="button"
								variant="warning"
								onClick={placeOrderHandler}
								disable={cart.cartItems.length === 0}
								className="w-100"
							>
								Place Order
							</Button>
						</li>
						{loading && <LoadingBox></LoadingBox>}
						{error && <MessageBox> {error}</MessageBox>}
					</ul>
				</Col>
			</Row>
		</div>
	);
}

export default OrderScreen;
