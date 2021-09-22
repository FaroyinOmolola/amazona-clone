import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Badge, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./actions/UserActions";
import { signoutCart } from "./actions/CartAction";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
    dispatch(signoutCart());
  };
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
                  {cartItems?.length > 0 && (
                    <span>
                      <Badge bg="danger" className="mx-1 rounded-circle">
                        {cartItems?.length}
                      </Badge>
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <Dropdown>
                  {/*<LinkContainer to="#">
                    <Nav.Link className="text-white">

                    </Nav.Link>
                  </LinkContainer>*/}
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <Link to="#" className="text-white text-decoration-none">
                      {userInfo[0]?.name}{" "}
                    </Link>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item to="/signin">
                      <Link
                        to="/signin"
                        className="text-dark text-decoration-none"
                        onClick={signoutHandler}
                      >
                        Signout
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <LinkContainer to="/signin">
                  <Nav.Link className="text-white">Sign in</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <main className="">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={SignInScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
        </main>
        <footer className="bg text-white text-center p-2">
          <div>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
