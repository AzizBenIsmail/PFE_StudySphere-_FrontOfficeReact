import React from "react";
import { useState } from "react";
// reactstrap components
import { MdPassword, MdMarkEmailUnread } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../Service/apiUser";
import Cookies from 'js-cookie';
// core components
import Navbar from "components/Navbars/LoginNavbar";
import Footer from "components/Footer/Footer.js";

export default function LoginPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };
  const navigate = useNavigate();
  const [User, setUser] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
    console.log(User);
  };
  const Login = async (user) => {
    try {
      const res = await LoginUser(user);
      console.log("Login passe Normalement");
      console.log(res);
      // console.log(res.user);
      // console.log(res.session);
      console.log(res.status);
      const allCookies = Cookies.get();
    console.log('Cookies existants:', allCookies);
  
      // Continue avec le reste du code ici...
    } catch (error) {
      console.log(error.response.data);
    }
  };
  
  
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-2 ml-5" lg="5" md="6">
                  <div
                    className="square square-7 mr-2"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register ">
                    <CardHeader>
                      <CardImg
                        className="mt-1"
                        alt="..."
                        src={require("assets/img/square-purple-2.png")}
                      />
                      <CardTitle tag="h4" className="ml-5 mt-3">
                        Login
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form mt-2">
                        <Form.Group>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <MdMarkEmailUnread />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              placeholder="Email Address"
                              type="text"
                              name="email"
                              onChange={(e) => handlechange(e)}
                              label="Email"
                              aria-label="Email"
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <MdPassword />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              placeholder="Password"
                              type="text"
                              name="password"
                              onChange={(e) => handlechange(e)}
                              label="Password"
                              aria-label="Password"
                            />
                          </InputGroup>
                        </Form.Group>
                        <FormGroup check className="text-left">
                          <Label check>
                            <Input type="checkbox" />
                            <span className="form-check-sign" />I agree to the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              terms and conditions
                            </a>
                            .
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      {/* <Button
                        className="btn-round"
                        size="lg"
                        style={{  
                          backgroundImage:
                            "linear-gradient(to bottom left, #edae3c, #dc5949, #344675)",
                        }}
                      //   onClick={(user) => {
                      //     console.log(user);
                      //  // sendRequest();
                      //   Login(user);
                      //   }}
                      > <AiOutlineLogin className=" mr-2"/>
                        Get Started
                      </Button> */}
                      <Button
                        color="primary"
                        type="button"
                        onClick={() => Login(User)}
                      >
                        Sign in
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
