import React from "react";
// reactstrap components
import {
  Button,
  Col,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  Row,
  //UncontrolledTooltip,
} from 'reactstrap'
import { useNavigate } from "react-router-dom";

export default function IndexNavbar() {
  const navigate = useNavigate();
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  const logoStyle = {
    width: "50px", // ajustez la largeur selon vos besoins
    height: "50px", // ajustez la hauteur selon vos besoins
    marginRight: "5px", // ajustez la marge droite selon vos besoins
  };
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate d-flex justify-content-between align-items-center">
          <NavbarBrand to="/" id="navbar-brand">
          <span>
            <img
              src={require("assets/img/favicon.png")}
              alt=" Company Sms Logo"
              className="logo-image"
              style={logoStyle}
            />
            SST•
          </span>
              StudySphere
          </NavbarBrand>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
              <span>
                <img
                  src={require("assets/img/favicon.png")}
                  alt=" Company Sms Logo"
                  className="logo-image"
                  style={logoStyle}
                />
                •
              </span>
                StudySphere
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar className="ml-auto">
            <NavItem>
              <Button
                 className="nav-link d-none d-lg-block mt-2"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom left, #3a4be2, #689dfa)",
                }}
                onClick={() => navigate(`/login-page`)}
              >
                <i className="fa fa-user-plus mr-1" />
                Connexion
                </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
