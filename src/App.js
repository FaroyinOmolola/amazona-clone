
import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
import {Navbar, Nav,} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"

function App() {




  return (
    <BrowserRouter>
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
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/product/:id" component={ProductScreen} ></Route>
      </main>
      <footer className="bg text-white text-center p-2">
        <div>All rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;


