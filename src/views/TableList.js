import React, { useState, useEffect, useCallback , useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Media,
  Row,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Col,
} from "reactstrap";
import { getUsers } from "../Service/apiUser";
import Cookies from "js-cookie";
import moment from 'moment';

function Tables() {
  //session
  if (!Cookies.get("jwt_token")) {
    window.location.replace("/login-page");
  }

  const getAllUsers = useCallback(async (config) => {
    await getUsers(config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const jwt_token = Cookies.get("jwt_token");

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers(config);

    const interval = setInterval(() => {
      getAllUsers(config);
    }, 60000);

    return () => clearInterval(interval);
  }, [getAllUsers, config]);
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
                                  className="fa fa-user-times"
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
        </Row>
      </div>
    </>
  );
}

export default Tables;
