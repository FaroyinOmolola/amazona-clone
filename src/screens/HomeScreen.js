import React, { useEffect } from "react";
import LoadngBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Row, Container } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Product } from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/ProductActions";

function HomeScreen() {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadngBox />
      ) : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
      ) : (
        <Container>
          <Row className="p-3">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default HomeScreen;
