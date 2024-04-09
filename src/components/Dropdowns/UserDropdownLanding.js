import React, { useMemo } from "react";
import { createPopper } from "@popperjs/core";
import { logout } from "../../Services/Apiauth";
import Cookies from "js-cookie";
import { Link, useHistory } from 'react-router-dom'
import { AiOutlineFieldNumber } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";

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
      <div
        className="text-blueGray-500 block"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-orange-100 inline-flex items-center justify-center rounded-full">
            {user && user.image_user ? (
              <img
                // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                alt="UserImage"
                  className="w-full rounded-full align-middle border-none shadow-lg"
                src={`http://localhost:5000/images/Users/${user.image_user}`}
                style={{ width: "80px" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              />
            ) : (
              <div>
                <img
                  alt="..."
                  src={require("assets/img/client.png").default}
                  style={{ maxWidth: '120%' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  // className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
              </div>
            )}
          </span>
          <div className="ml-2 text-blueGray-200">
            {user && user.xp && typeof user.xp.pointsGagnes === 'number' && user.xp.niveauAtteint && (
              <>
                <div>{user.nom}</div>
                  {user && user.role === "centre" ? ( <>
                    <Link
                      to="/AccountManagement/BadgesNiveauXp"
                    >
                      <div className="flex text-xs font-normal text-orange-500">
                        <AiOutlineFieldNumber style={{ fontSize: '18px' }}/>
                        formation
                       </div>
                    </Link>
                  </> ) : ( <>
                    <Link
                      to="/AccountManagement/BadgesNiveauXp"
                    >
                <div className="text-xs font-normal text-orange-500"
                     onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                     onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  {user.xp.niveauAtteint.nom}
                  {user && user.xp && typeof user.xp.pointsGagnes === 'number' && user.xp.niveauAtteint && ` Xp : ${user.xp.pointsGagnes}`}
                </div>
                    </Link>
                      </>
                    )}
              </>
            )}
          </div>

        </div>
      </div>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <button
          className={
            "flex items-center text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          onClick={() => history.push("/profile")}
        >
          {user && user.image_user ? (
            <>
            <img
              // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
              alt="UserImage"
              className="shadow rounded-full max-w-full h-auto align-middle border-none"
              src={`http://localhost:5000/images/Users/${user.image_user}`}
              style={{ width: "40px" }}
            />
              <div className="ml-2 ">
                {user.nom}
              </div>
            </>
          ) : (
            <>
              <img
                alt="..."
                src={require("assets/img/client.png").default}
                style={{ maxWidth: '20%' }}
                className="shadow rounded-full max-w-full h-auto align-middle border-none"
              />
              <div className="ml-2 ">
               Profile
              </div>
            </>
          )}

        </button>
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />

        {/*<button*/}
        {/*  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"*/}
        {/*  onClick={() => {*/}
        {/*    if (user.role === 'client') {*/}
        {/*      console.log(user)*/}
        {/*      console.log(user.preferences)*/}
        {/*      if (user.preferences === undefined) {*/}
        {/*        history.push("/First");*/}
        {/*      } else {*/}
        {/*        history.push("/First/UpdatePreferences");*/}
        {/*      }*/}
        {/*    }*/}

        {/*    if (user.role === 'centre') {*/}
        {/*      if (!user.xp) {*/}
        {/*        history.push("/First");*/}
        {/*      }            }*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Preference*/}
        {/*</button>*/}

        <button
          className={
            "flex items-center text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => history.push("/Setting") }
        >
          <IoIosNotificationsOutline style={{ fontSize: '20px' }} className="mr-1"/>
          Gerer mon compte
        </button>
        <button
          className={
            "flex items-center text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => history.push("/landing/notification") }
        >
          <CiUser style={{ fontSize: '20px' }} className="mr-1"/>
          Mes Notification
        </button>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "flex items-center text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => log(config, user)}
        >
          <RiLogoutCircleLine style={{ fontSize: '20px' }} className="mr-1" />
          Se déconnecter
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
