import React, { useMemo } from "react";
import { createPopper } from "@popperjs/core";
import { logout } from "../../Services/Apiauth";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner'

const UserDropdown = ({user}) => {
  const history = useHistory();

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

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

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

            {user && user.image_user ? (
              <img
                // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                alt="UserImage"
                className="w-full rounded-full align-middle border-none shadow-lg"
                src={`http://localhost:5000/images/Users/${user.image_user}`}
                style={{ width: "80px", height: "80px" }}
              />
            ) : (
              <div>
                <RotatingLines
                  visible={true}
                  height="96"
                  width="96"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
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
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={() => {
            if (user.role === 'client') {
              console.log(user)
              console.log(user.preferences)
              if (user.preferences === undefined) {
                history.push("/First");
              } else {
                history.push("/First/UpdatePreferences");
              }
            }

            if (user.role === 'centre') {
              if (!user.xp) {
                history.push("/First");
              }            }
          }}
        >
          Paramètre
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
