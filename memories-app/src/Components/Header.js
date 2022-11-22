import logo from "../logo.png";
import "../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img class="logo" src={logo} alt="LOGO" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/memoryCard">Album</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Navbar.Text className="justify-content-end">Sign in</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Header;
