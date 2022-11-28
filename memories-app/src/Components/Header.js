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
            <Nav.Link href="/album">Album</Nav.Link>
            <Nav.Link href="/inputMemory"> Create </Nav.Link>
            <Nav.Link href="/search"> Search</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
export default Header;
