import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Rating } from "../components/Product";
import { detailProduct } from "../actions/ProductActions";

function ProductScreen(props) {
  const productId = props.match.params.id;
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailProduct(productId));
  }, [dispatch, productId]);

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
      ) : (
        <div>
          <Link className="text-decoration-none px-2" to="/">
            Back to result
          </Link>
          <Row className="p-2">
            <Col xs={12} md={6} className="p-2">
              <img
                className="img-fluid img-thumbnail mx-auto"
                src={product.image}
                alt={product.name}
              />
            </Col>
            <Col xs={12} md={3} className="p-2">
              <ul className="list-unstyled px-2">
                <li>
                  <h5>{product.name}</h5>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReview={product.numReview}
                  />
                </li>
                <li>
                  {" "}
                  Price: <span className="naira">N</span> {product.price}{" "}
                </li>
                <li>
                  Description: <p>{product.description}</p>
                </li>
              </ul>
            </Col>

            <Col xs={12} md={3} className="p-2">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <Card.Text className="mb-0">Price: </Card.Text>
                  <Card.Text>
                    <span className="naira">N</span> {product.price}
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Text>Status</Card.Text>
                    <Card.Text>
                      {product.countInStock > 0 ? (
                        <span className="text-success">In Stock</span>
                      ) : (
                        <span className="text-danger">Out of Stock</span>
                      )}
                    </Card.Text>
                  </div>
                  {product.countInStock > 0 && (
                    <>
                      <Row className="mb-3">
                        <Col>Quantity</Col>
                        <Col className="d-flex justify-content-end">
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </Col>
                      </Row>
                      <Button
                        className="w-100"
                        variant="warning"
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
