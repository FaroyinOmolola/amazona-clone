
import './App.css';
import data from "./data"
import { Col, Row,
Navbar, Nav, Card, Container } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {




  return (
    <div className="App">
      <Navbar collapseOnSelect expand="md" fixed="top" className="p-3 d-flex bg justify-content-between">
          <Navbar.Brand href="/" className="text-white">amazona</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white" />
              <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0" >
                <Nav className="me-auto text-white">
                  <Nav.Link className="text-white" href="/cart">Cart</Nav.Link>
                  <Nav.Link className="text-white" href="/signin">Sign in</Nav.Link>
                  
                </Nav>
              </Navbar.Collapse>
        </Navbar>
      <main className="my-5 pt-5">
      <Container>
        <Row className="p-3">
         {
          data.products.map(product=>( 

            <Col key={product.id} className="p-3 mb-3" >
            <Card style={{ width: '18rem' }} className="mx-auto">
               <Card.Link href={`/products/${product.id}`} className="text-decoration-none text-dark">
                <Card.Img variant="top" src={product.image} alt={product.name}/>
                <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="m-0">
                  <i className="rating fa fa-star" />
                  <i className="rating fa fa-star" />
                  <i className="rating fa fa-star" />
                  <i className="rating fa fa-star-half-o" />
                  <i className="rating fa fa-star-o" />  
                </Card.Text>
                <Card.Text className="fw-bold m-0"><span className="naira">N</span> {product.price}</Card.Text>
                </Card.Body>
              </Card.Link>
            </Card>
          </Col>
            )

          )
        }
        </Row>
        </Container>
      </main>
      <footer className="bg text-white text-center p-2">
        <div>All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
