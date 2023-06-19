import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { logout ,getUserAuth } from "../../Service/apiUser";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function ExamplesNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [setColor] = React.useState("navbar-transparent");
  const [user, setUser] = useState([]);

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
  /////cookies
  if (!Cookies.get("jwt_token")) {
    window.location.replace("/login-page");
  }
  const jwt_token = Cookies.get("jwt_token");

  const config = {
    headers: {
      Authorization: `Bearer ${jwt_token}`,
    },
  };
  ////////
  const log = async () => {
    try {
      const res = logout(config)  .then((res) => {
        console.log(res.data.user);
        window.location.reload(); // Recharge la page
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(res.status);
      console.log("Valeur du cookie jwt_token :", jwt_token);
      // window.location.replace(`/login-page/`);
    } catch (error) {
      console.log(error);
    }
  };
  const getAuthUser = async () => {
    await getUserAuth(config)
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAuthUser();

    const interval = setInterval(() => {
      getAuthUser(); // appel répété toutes les 10 secondes
    }, 300000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, []);
  return (
    <Navbar className={"fixed-top "} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate mb-5 ">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>ABT• </span>
            Attijari Bank
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Attijari Bank
          </UncontrolledTooltip>
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
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  BLK•React
                </a>
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
          <Nav navbar>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/AttijariwafaB"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fab fa-twitter" />
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.attijaribank.com.tn/Fr/ "
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="tim-icons icon-world" />
                <p className="d-lg-none d-xl-none">WebSite</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/AttijariBankTunisie/"
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fab fa-facebook-square" />
                <p className="d-lg-none d-xl-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/attijari_bank_tunisie/?hl=fr"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fab fa-instagram" />
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <img
                alt="..."
                src={`http://localhost:5000/images/${user.image_user}`}
                style={{ width: "35px", height: "35px" }}
              />
            </NavItem>

            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="default"
                onClick={() => log()}
              >
                Quitter
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
