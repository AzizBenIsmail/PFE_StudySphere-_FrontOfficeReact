import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Media,
  Row,  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Col,
} from "reactstrap";
import { getUsers } from "../Service/apiUser";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import moment from 'moment';

function Tables() {
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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();

    const interval = setInterval(() => {
      getAllUsers(); // appel répété toutes les 10 secondes
    }, 30000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, []);

  const getAllUsers = async () => {
    const res = await getUsers(config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Image</th>
                      <th>Surnom</th>
                      <th>Nom</th>
                      <th>Prenom</th>
                      <th>email</th>
                      <th>cree_At</th>
                      <th>modifier_AT</th>
                      <th>Role</th>
                      <th>verificarion</th>
                      <th>numero telephone</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <Media className="align-items-center">
                          <a
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={`http://localhost:5000/images/${user.image_user}`}
                              style={{ width: "80px", height: "80px" }}
                            />
                          </a>
                        </Media>
                        <td>{user.username}</td>
                        <td>{user.first_Name}</td>
                        <td>{user.last_Name}</td>
                        <td>{user.email}</td>
                        <td>{moment(user.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                        <td>{moment(user.updatedAt).format('YYYY-MM-DD HH:mm')}</td>
                        <td>{user.userType}</td>
                        <td>{user.enabled ? 'Active' : 'N/A'}</td>
                        <td>{user.phoneNumber}</td>
                        <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href=""
                              // onClick={(e) => deleteAUser(user)}
                            >
                              <i
                                class="fa fa-user-times"
                                aria-hidden="true"
                              ></i>
                              Supprimer
                            </DropdownItem>
                            <DropdownItem
                              href=""
                              // onClick={(e) => Modifier(user)}
                            >
                              Modifier
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="category">Here is a subtitle for this table</p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-center">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-center">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-center">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-center">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-center">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-center">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
