import React from 'react';
import { Col, Row, Card, Button} from 'react-bootstrap';
import {Link} from "react-router-dom"
import data from "../components/data"
import {Rating} from "../components/Product"


function ProductScreen (props) {
  const product = data.products.find((x)=> x.id === props.match.params.id)

console.log(product);
  return (
    <div>
    <Link  className="text-decoration-none px-2" to="/">Back to result</Link>
     <Row className="p-2">
       <Col xs={12} md={6} className="p-2">
         <img className="img-fluid img-thumbnail mx-auto"
          src={product.image} 
          alt={product.name} />
       </Col>
       <Col xs={12} md={3}className="p-2">
         <ul className="list-unstyled px-2" >
          <li><h5>{product.name}</h5></li>
          <li>
            <Rating rating={product.rating} numReview={product.numReview} />
          </li>
          <li> Price: <span className="naira">N</span> {product.price} </li>
          <li>Description: <p>{product.description}</p></li>
        </ul>
       </Col>

       <Col xs={12} md={3} className="p-2">
         <Card>
            <Card.Header className="d-flex justify-content-between" >
            <Card.Text className="mb-0">Price: </Card.Text>
            <Card.Text ><span className="naira">N</span> {product.price}</Card.Text>
            </Card.Header>
            <Card.Body>
            <div className="d-flex justify-content-between">
              <Card.Text>Status</Card.Text>
              <Card.Text>
              {product.countInStock >0 ? 
                <span className="text-success">In Stock</span> : 
                <span className="text-danger">Out of Stock</span>}
              </Card.Text>
              </div>
              <Button className="w-100" variant="warning">Add to Cart</Button>
            </Card.Body>
          </Card>
       </Col>
     </Row>
    </div>
  )
}

export default ProductScreen;