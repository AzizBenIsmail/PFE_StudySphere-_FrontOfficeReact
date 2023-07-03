import React, { useMemo } from "react";
import { useState } from "react";
import { AiOutlineUser, AiOutlineLogin } from "react-icons/ai";
import { MdPassword, MdMarkEmailUnread } from "react-icons/md";
import { register } from "../Service/apiUser";
import AddImage from "./examples/addImage";
import { getUserAuth } from "../Service/apiUser";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  Input,
  CardText,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  FormGroup,
  Col,
} from "reactstrap";
import { Button, Container, Form } from "react-bootstrap";
import Cookies from "js-cookie";
// core components

export default function AddUser() {
  //cookies
  const jwt_token = Cookies.get("jwt_token");

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  //session
  if (Cookies.get("jwt_token")) {
    const fetchData = async () => {
      try {
        await getUserAuth(config).then((res) => {
          if (res.data.user.userType === "user") {
            window.location.replace(`/landing-page/`);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  } else {
    window.location.replace(`/login-page/`);
  }

  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState(null);
  const [User, setUser] = useState({
    username: "",
    email: "",
    password: "",
    image_user: "",
  });
  const handleEvent = (croppedImageUrl, croppedImageBlob) => {
    setCroppedImage(croppedImageUrl);
    console.log(croppedImage);
    setImage(croppedImageBlob);
    console.log(croppedImageUrl);
    console.log(croppedImageBlob);
  };
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");

  const handlechange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
    console.log(User);
  };
  let formData = new FormData();
  const add = async (e) => {
    formData.append("username", User.username);
    formData.append("email", User.email);
    formData.append("password", User.password);
    formData.append("image_user", image, `${User.username}+.png`);
    const res = await register(formData)
      .then(window.location.replace(`/login-page/`))
      .catch((error) => {
        console.log(error.response.data);
      });
    console.log(res.data);
  };
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
  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <div className="content">
            <Container>
              <Row>
                <Col md="8">
                  <Card>
                    <CardHeader>
                      <h5 className="title">Ajouter un utlisateur </h5>
                    </CardHeader>
                    <CardBody>
                      <Form
                        className="form mt-2"
                        role="form"
                        encType="multipart/form-data"
                      >
                        <Row>
                          <Col className="pr-md-1" md="5">
                            <Form.Group>
                              <InputGroup className="input-group-alternative mb-2 mt-2">
                                <InputGroupAddon addonType="prepend">
                                  <label>SurNom</label>
                                </InputGroupAddon>
                              </InputGroup>
                              <Form.Control
                                placeholder="Username"
                                type="text"
                                name="username"
                                onChange={(e) => handlechange(e)}
                                label="Username"
                                aria-label="Username"
                              />
                            </Form.Group>
                          </Col>
                          <Col className="px-md-1" md="3">
                            <Form.Group>
                              <InputGroup className="input-group-alternative mb-2 mt-2">
                                <InputGroupAddon addonType="prepend">
                                  <label>Nom</label>
                                </InputGroupAddon>
                              </InputGroup>
                              {/* <Input
                                defaultValue="Aziz"
                                placeholder="Nom"
                                type="text"
                              /> */}
                              <Form.Control
                                defaultValue="BenIsamil"
                                placeholder="Nom"
                                type="text"
                                name="username"
                                onChange={(e) => handlechange(e)}
                                label="Username"
                                aria-label="Username"
                              />
                            </Form.Group>
                          </Col>
                          <Col className="pr-md-2" md="3">
                            <Form.Group>
                              <InputGroup className="input-group-alternative mb-2 mt-2">
                                <InputGroupAddon addonType="prepend">
                                  <label>Prenom</label>
                                </InputGroupAddon>
                              </InputGroup>
                              <Form.Control
                                defaultValue="Aziz"
                                placeholder="Prenom"
                                type="text"
                                name="username"
                                onChange={(e) => handlechange(e)}
                                label="Username"
                                aria-label="Username"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-md-1" md="6">
                            <Form.Group>
                              <InputGroup className="input-group-alternative mb-2 mt-2">
                                <InputGroupAddon addonType="prepend">
                                  <label>Email address</label>
                                </InputGroupAddon>
                              </InputGroup>
                              <Form.Control
                                placeholder="mike@email.com"
                                type="text"
                                name="email"
                                onChange={(e) => handlechange(e)}
                                label="Email"
                                aria-label="Email"
                              />
                            </Form.Group>
                          </Col>
                          <Col className="pl-md-1" md="6">
                            <Form.Group>
                              <InputGroup className="input-group-alternative mb-2 mt-2">
                                <InputGroupAddon addonType="prepend">
                                  <label>Mot de passe</label>
                                </InputGroupAddon>
                              </InputGroup>
                              <Form.Control
                                placeholder="Password"
                                type="text"
                                name="password"
                                onChange={(e) => handlechange(e)}
                                label="Password"
                                aria-label="Password"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <Form.Group>
                              <InputGroup className="input-group-alternative mb-2 mt-2">
                                <InputGroupAddon addonType="prepend">
                                  <label>Address</label>
                                </InputGroupAddon>
                              </InputGroup>
                              <Form.Control
                                placeholder="mike@email.com"
                                type="text"
                                name="email"
                                onChange={(e) => handlechange(e)}
                                label="Email"
                                aria-label="Email"
                              />
                              <Input
                                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                placeholder="Home Address"
                                type="text"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <Form.Group>
                              <InputGroup className="input-group-alternative mb-2 mt-2">
                                <InputGroupAddon addonType="prepend">
                                  <label>Image</label>
                                </InputGroupAddon>
                              </InputGroup>
                              <AddImage
                                className="input-group-alternative"
                                onEvent={handleEvent}
                                aspect={1 / 1}
                                holder={"add Profile Image"}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-fill"
                        color="primary"
                        type="submit"
                      >
                        Save
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-user">
                    <CardBody>
                      <CardText />
                      <div className="author">
                        <div className="block block-one" />
                        <div className="block block-four" />
                        <h5 className="title">° SurNom Doit etre unique </h5>
                        <h5 className="title">° Email Doit etre unique </h5>
                        <h5 className="title">
                          ° cette utilisateur a un role user{" "}
                        </h5>
                        <h5 className="title">
                          ° password Doit contenir un Maj , Min , chiffre{" "}
                        </h5>
                        <h5 className="title">° SurNom Doit etre unique </h5>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              {/* <Row>
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
                      <CardTitle tag="h4" className="ml-2 mt-3">
                        s'inscrire
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form
                        className="form mt-2"
                        role="form"
                        encType="multipart/form-data"
                      >
                        <Form.Group>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <AiOutlineUser />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              placeholder="Username"
                              type="text"
                              name="username"
                              onChange={(e) => handlechange(e)}
                              label="Username"
                              aria-label="Username"
                            />
                          </InputGroup>
                        </Form.Group>
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
                        <Form.Group>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText></InputGroupText>
                            </InputGroupAddon>
                            <AddImage
                              className="input-group-alternative"
                              onEvent={handleEvent}
                              aspect={1 / 1}
                              holder={"add Profile Image"}
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
                        </Form.Group>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        size="lg"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom left, #edae3c, #dc5949, #344675)",
                        }}
                        onClick={(e) => add(e)}
                      >
                        <AiOutlineLogin className=" mr-2" />
                        Commencer
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row> */}
              <div className="register-bg" />
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
