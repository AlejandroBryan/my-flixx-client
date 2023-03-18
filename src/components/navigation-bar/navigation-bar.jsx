
import { Fragment } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="primary" expand="lg" variant="light">
      <Container fluid>
        <LinkContainer to="/">
        <Navbar.Brand>Myflix App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/profile">
            <Nav.Link>Profile</Nav.Link>
            </LinkContainer>

            {
              user ?(
                <Fragment>
                   <LinkContainer onClick={onLoggedOut} to="/">
                   <Nav.Link>logout</Nav.Link>
                   </LinkContainer> 
                </Fragment>
              ):(
                <Fragment>
                  <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  </Fragment>
  
              )
            }
          </Nav>
          <Nav className="justify-content-end">
          {
              user ?(
                <Fragment>
                   <LinkContainer to="/profile">
                    
                   <Nav.Link>Hi {user.Username}</Nav.Link>
                   </LinkContainer> 
                </Fragment>
              ):(
                <Fragment>
                  <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                </Fragment>
              )
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;