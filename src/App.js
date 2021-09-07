import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { useSelector } from "react-redux";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <BrowserRouter>
      <div className="App my-5 pt-5">
        <Navbar
          collapseOnSelect
          expand="md"
          fixed="top"
          className="p-3 d-flex bg justify-content-between"
        >
          <Navbar.Brand href="/" className="text-white">
            amazona
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="bg-white"
          />
          <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
            <Nav className="me-auto text-white">
              <LinkContainer to="/cart">
                <Nav.Link className="text-white">
                  Cart
                  {cartItems.length > 0 && (
                    <span>
                      <Badge bg="danger" className="mx-1 rounded-circle">
                        {cartItems.length}
                      </Badge>
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signin">
                <Nav.Link className="text-white">Sign in</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <main className="">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/" component={CartScreen} />
        </main>
        <footer className="bg text-white text-center p-2">
          <div>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
