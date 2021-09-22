import React from "react";
import { Container } from "react-bootstrap";

function MessageBox(props) {
  return (
    <Container>
      <div
        className="p-2 border border-dark rounded rounded-2
    bg-light text-danger"
      >
        {props.children}
      </div>
    </Container>
  );
}

export default MessageBox;
