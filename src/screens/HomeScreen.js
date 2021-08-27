import React from 'react';
import data from "../components/data"
import { Row, Container } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Product} from "../components/Product"

function HomeScreen(props){
  return (
    <div>
    	<Container>
        <Row className="p-3">
         {
          data.products.map(product=>( 
            <Product key={product.id} product={product}/>
          )) }
        </Row>
        </Container>
    </div>
  )
}

export default HomeScreen;