import React, { useEffect, useMemo, useState } from "react";
import { createPopper } from "@popperjs/core";
import { getUserAuth, logout } from "../../Services/Apiauth";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
// import { useHistory } from 'react-router-dom';

const UserDropdown = () => {
  const [user, setUser] = useState([]);
  const history = useHistory();

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  // const history = useHistory();
  //cookies
  const jwt_token = Cookies.get("jwt_token");

  if (!Cookies.get("jwt_token")) {
    window.location.replace("/login-page");
  }

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  ////////
  useEffect(() => {
    const getAuthUser = async (config) => {
      await getUserAuth(config)
        .then((res) => {
          setUser(res.data.user);
          // console.log(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAuthUser(config);
    const interval = setInterval(() => {
      getAuthUser(config); // appel répété toutes les 10 secondes
    }, 300000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, [config]);
  const log = async (config, user) => {
    try {
      logout(config, user._id)
        .then(() => {
          // console.log(res.data.user);
          window.location.replace(`/login/`);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            {user.image_user ? (
              <img
                // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                alt="UserImage"
                className="w-full rounded-full align-middle border-none shadow-lg"
                src={`http://localhost:5000/images/${user.image_user}`}
                style={{ width: "80px", height: "80px" }}
              />
            ) : (
              <div>
                <img
                  alt="UserImage"
                  className="w-full rounded-full align-middle border-none shadow-lg"
                  src={require("assets/img/images.png").default}
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
            )}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          onClick={() => history.push("/profile")}
        >
          Profile
        </button>
        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </button>
        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </button>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => log(config, user)}
        >
          Se déconnecter
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
