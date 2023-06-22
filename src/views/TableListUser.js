import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { getUsers, deleteUser, downgrade, upgrade } from "../Service/apiUser";
import Cookies from "js-cookie";
import moment from "moment";
import { FaUserAltSlash, FaUserCog } from "react-icons/fa";
import { GiUpgrade } from "react-icons/gi";
import {
  AiOutlineMail,
  AiOutlineFieldTime,
  AiOutlinePhone,
  AiFillSetting,
  AiOutlineUser,
} from "react-icons/ai";
// import { FaUserCheck, FaUserMinus } from "react-icons/fa";
import { SiVerizon, SiVexxhost, SiCriticalrole } from "react-icons/si";
import { BiShowAlt, BiRename } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import { GiWideArrowDunk } from "react-icons/gi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import { getUserAuth } from "../Service/apiUser";
function TableListUser() {
  const navigate = useNavigate();

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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers(config);

    const interval = setInterval(() => {
      getAllUsers(config);
    }, 60000);

    return () => clearInterval(interval);
  }, [getAllUsers, config]);

  const deleteAuser = async (user, config) => {
    const result = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ? " + user.username + "?"
    );
    if (result) {
      //console.log(user);
      deleteUser(user._id, config);
      getAllUsers(config);
    }
  };

  const upgradeAuser = async (user, config) => {
    upgrade(user._id, config);
    setTimeout(() => {
      getAllUsers(config);
    }, 1000); // Appeler getAllUsers(config) après un délai de 2 secondes
  };

  const downgradeAuser = async (user, config) => {
    downgrade(user._id, config);
    setTimeout(() => {
      getAllUsers(config);
    }, 1000); // Appeler getAllUsers(config) après un délai de 2 secondes
  };
  function getFirstTenWords(str) {
    const splittedWord = str.split("@"); // Diviser le mot en fonction du caractère "@"
    const firstPart = splittedWord[0]; // Récupérer la première partie du mot (avant "@")

    return firstPart;
  }
  function getUserTypeAbbreviation(userType) {
    if (userType === "admin") {
      return <RiAdminFill className="mr-2" style={{ fontSize: "24px" }} />;
    } else if (userType === "user") {
      return <AiOutlineUser className="mr-2" style={{ fontSize: "24px" }} />;
    } else {
      return ""; // Valeur par défaut si le type d'utilisateur n'est ni "admin" ni "user"
    }
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Liste des utilisateur </CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>
                        Img
                        <BsImageFill
                          className="ml-2"
                          style={{ fontSize: "15px" }}
                        />
                      </th>
                      <th>
                        SurNom
                        <BiRename
                          className="ml-2"
                          style={{ fontSize: "15px" }}
                        />
                      </th>
                      <th>
                        Nom
                        <MdOutlineDriveFileRenameOutline
                          className="ml-2"
                          style={{ fontSize: "15px" }}
                        />
                      </th>
                      <th>
                        Prenom
                        <MdOutlineDriveFileRenameOutline
                          className="ml-2"
                          style={{ fontSize: "15px" }}
                        />
                      </th>
                      <th>
                        Email
                        <AiOutlineMail
                          className="ml-2"
                          style={{ fontSize: "15px" }}
                        />
                      </th>
                      <th>
                        Cree_At
                        <AiOutlineFieldTime
                          className="ml-2"
                          style={{ fontSize: "15px" }}
                        />
                      </th>
                      <th>
                        Modifier_AT
                        <AiOutlineFieldTime
                          className="ml-2"
                          style={{ fontSize: "15px" }}
                        />
                      </th>
                      <th>
                        Role
                        <SiCriticalrole
                          className="ml-2"
                          style={{ fontSize: "15px" }}
                        />
                      </th>
                      <th>
                        Verif
                        <GoVerified
                          className="ml-2"
                          style={{ fontSize: "15px" }}
                        />
                      </th>
                      <th>
                        tel
                        <AiOutlinePhone
                          className="ml-2"
                          style={{ fontSize: "15px" }}
                        />
                      </th>
                      <th>
                        Action
                        <AiFillSetting
                          className="ml-2"
                          style={{ fontSize: "15px" }}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <Media className="align-items-center">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              src={`http://localhost:5000/images/${user.image_user}`}
                              style={{ width: "80px", height: "80px" }}
                            />
                          </a>
                        </Media>
                        <td>
                          {user.username ? (
                            user.username
                          ) : (
                            <SiVexxhost
                              className="mr-2"
                              style={{ fontSize: "24px" }}
                            />
                          )}
                        </td>
                        <td>
                          {user.first_Name ? (
                            user.first_Name
                          ) : (
                            <SiVexxhost
                              className="mr-2"
                              style={{ fontSize: "24px" }}
                            />
                          )}
                        </td>
                        <td>
                          {user.last_Name ? (
                            user.last_Name
                          ) : (
                            <SiVexxhost
                              className="mr-2"
                              style={{ fontSize: "24px" }}
                            />
                          )}
                        </td>
                        <td>
                          <botton
                            onClick={(e) =>
                              navigate(`/admin/UserDetails/${user._id}`)
                            }
                          >
                            {getFirstTenWords(user.email)}

                            <i class="fa fa-sort-desc" aria-hidden="true"></i>
                          </botton>
                        </td>
                        <td>
                          {moment(user.createdAt).format("YYYY-MM-DD HH:mm")}
                        </td>
                        <td>
                          {moment(user.updatedAt).format("YYYY-MM-DD HH:mm")}
                        </td>
                        <td>{getUserTypeAbbreviation(user.userType)}</td>
                        <td>
                          {user.enabled ? (
                            <SiVerizon
                              className="mr-2"
                              style={{ fontSize: "24px" }}
                            />
                          ) : (
                            <SiVexxhost
                              className="mr-2"
                              style={{ fontSize: "24px" }}
                            />
                          )}
                        </td>
                        <td>
                          {user.phoneNumber ? (
                            user.phoneNumber
                          ) : (
                            <SiVexxhost
                              className="mr-2"
                              style={{ fontSize: "24px" }}
                            />
                          )}
                        </td>
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
                                onClick={(e) => deleteAuser(user, config)}
                              >
                                <FaUserAltSlash
                                  className=" mr-2"
                                  style={{ fontSize: "20px" }}
                                />
                                Supprimer
                              </DropdownItem>
                              <DropdownItem
                                href=""
                                // onClick={(e) => Modifier(user)}
                              >
                                <FaUserCog
                                  className=" mr-2"
                                  style={{ fontSize: "20px" }}
                                />
                                Modifier
                              </DropdownItem>
                              <DropdownItem
                                href=""
                                onClick={(e) => upgradeAuser(user, config)}
                              >
                                <GiUpgrade
                                  className=" mr-2"
                                  style={{ fontSize: "20px" }}
                                />
                                mise à niveau vers administrateur
                              </DropdownItem>
                              <DropdownItem
                                href=""
                                onClick={(e) => downgradeAuser(user, config)}
                              >
                                <GiWideArrowDunk
                                  className=" mr-2"
                                  style={{ fontSize: "20px" }}
                                />
                                mise à niveau vers un simple utilisateur
                              </DropdownItem>
                              <DropdownItem
                                href=""
                                onClick={(e) =>
                                  navigate(`/admin/UserDetails/${user._id}`)
                                }
                              >
                                <BiShowAlt
                                  className=" mr-2"
                                  style={{ fontSize: "20px" }}
                                />
                                Details
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

export default TableListUser;
