import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { Container } from "react-bootstrap";

function LoadingBox() {
  return (
    <Container>
      <span>
        <i className="fa fa-spinner fa-spin"></i>Loading...
      </span>
    </Container>
  );
}

export default LoadingBox;
