// import komponen react bootstrap
import { Container, Nav, Navbar, NavDropdown, Dropdown } from "react-bootstrap";
// import fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
// import gambar logo
import logo from "../../assets/logo.png";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Api from "../../api";
import toast from "react-hot-toast";

const NavbarComponent = ({ isLoggedIn }) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Api.get("customer/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      if(res.data.status == 'berhasil')
      {
        toast.success(res.data.message, {
          duration: 3000,
          position: "top-center"
        })
        Cookies.remove('token');
        Cookies.remove('name');
        Cookies.remove('role');
        Cookies.remove('phone');
        navigate('/')
      }
    })
  };

  return (
    <>
      <Navbar expand="lg" fixed="top" bg="white">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex align-items-center">
              <Nav.Link href="/">Beranda</Nav.Link>
              <NavDropdown title="Ruangan" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/ruangan/ruang-meeting">
                  Ruangan Meeting
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ruangan/ruang-acara">
                  Ruang Acara
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/ruangan/ruang-coworking">Coworking</Nav.Link>

              {isLoggedIn ? (
                <>
                  <Nav.Link href="/order">Pesanan</Nav.Link>
                  <Dropdown>
                    <Dropdown.Toggle>
                      <FontAwesomeIcon icon={faCircleUser} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item type="button" onClick={handleLogout}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Link to="/login" className="btn btn-teal">
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
