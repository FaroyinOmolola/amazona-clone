import React, { useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AddToCart, removeFromCart } from "../actions/CartAction";
import { useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(AddToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div>
      <h1 className="px-3">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <MessageBox>
          Cart is empty.{" "}
          <Link to="/" className="text-decoration-none ">
            {" "}
            Go Shopping{" "}
          </Link>
        </MessageBox>
      ) : (
        <>
          <Row>
            <Col sm={8}>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.product} className="list-unstyled ">
                    <Row>
                      <Col className="my-2">
                        <img
                          style={{ maxWidth: "5rem", width: "100%" }}
                          src={item.image}
                          alt={item.name}
                          className="img-fluid img-thumbnail"
                        />
                      </Col>
                      <Col className="my-2">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-decoration-none"
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col className="my-2">
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              AddToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col className="my-2">
                        <span className="naira">N</span> {item.price}
                      </Col>
                      <Col className="my-2">
                        <Button
                          className="btn-warning"
                          onClick={() => removeHandler(item.product)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </li>
                ))}
              </ul>
            </Col>

            <Col>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  Subtotal ({cartItems?.reduce((a, c) => a + c.qty, 0)}
                  ):{" "}
                  <span>
                    <span className="naira">N</span>{" "}
                    {cartItems?.reduce((a, c) => a + c.price * c.qty, 0)}
                  </span>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Button
                      variant="warning"
                      className="w-100"
                      onClick={checkoutHandler}
                      disabled={cartItems?.length === 0}
                    >
                      Check Out
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="text-center ">
            <Link
              to="/"
              className="text-decoration-none p-2 m-4 btn btn-primary text-center "
            >
              {" "}
              Continue Shopping{" "}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartScreen;
