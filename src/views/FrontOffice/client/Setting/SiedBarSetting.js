import React, { useEffect, useMemo, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdOutlineSecurity, MdRoomPreferences } from 'react-icons/md'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { SiOpslevel } from 'react-icons/si'
import { BiSolidUserAccount } from 'react-icons/bi'
import Cookies from 'js-cookie'
import { useHistory, useParams } from 'react-router-dom'
import { getUserAuth } from '../../../../Services/Apiauth'

const Tabs = ({code}) => {
  const [openTab, setOpenTab] = React.useState(code)
  console.log(code)
  const jwt_token = Cookies.get('jwt_token')
  const history = useHistory()

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  //session
  if (Cookies.get('jwt_token')) {
    const fetchData = async () => {
      try {
        await getUserAuth(config).then((res) => {
          if (res.data.user.role === 'admin') {
            window.location.replace(`/admin/`)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  } else {
    window.location.replace(`/`)
  }

  const param = useParams()

  const [User, setUser] = useState({})

  useEffect(() => {

    const getUser = async (config) => {
      await getUserAuth(config).then((res) => {
        setUser(res.data.user)
        console.log(res.data.user)
      }).catch((err) => {
        console.log(err)
      })
    }

    getUser(config)

    const interval = setInterval(() => {}, 1000000)

    return () => clearInterval(interval)
  }, [config, param.id])

  return (
    <>
      <div className="w-1/4 ml-8">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <ul
              className="list-none flex-wrap pt-3 pb-4  "
              role="tablist"
            >
              <li className=" mr-2 last:mr-0 flex-auto">
                <a
                  className={
                    'text-xs px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (openTab === "1"
                      ? 'text-lightBlue-600 '
                      : 'text-lightBlue-800 ')
                  }
                  onClick={e => {
                    e.preventDefault()
                    console.log(code)
                    setOpenTab(code)
                    console.log(openTab)
                    history.push(`/GestionCompte/edit/${User._id}?u=${User.role.toLowerCase()}`)

                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  <div className="px-6 flex py-1">
                    <FaRegUserCircle style={{ fontSize: '25px' }} className="mt-1"/>
                    <div className="ml-2">
                      <h3 className="text-1xl mt-2">
                        Informations personnelles
                      </h3>
                    </div>
                  </div>
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto ">
                <a
                  className={
                    'text-xs px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (openTab === "2"
                      ? 'text-lightBlue-600'
                      : 'text-lightBlue-800')
                  }
                  onClick={e => {
                    e.preventDefault()
                    setOpenTab(code)
                    if (User.role === 'client') {
                      if (User.preferences === undefined) {
                        history.push("/First");
                      } else {
                        history.push("/First/UpdatePreferences");
                      }
                    }

                    if (User.role === 'centre') {
                      if (User.preferences === undefined) {
                        history.push("/First/announcementCenter");
                      } else {
                        history.push("/First/UpdatePreferencesCenter");
                      }
                    }
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  <div className="px-6 flex py-1">
                    <MdRoomPreferences style={{ fontSize: '25px' }} className="mt-1"/>
                    <div className="ml-2">
                      <h3 className="text-1xl mt-2">
                        Préférences
                      </h3>
                    </div>
                  </div>
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto ">
                <a
                  className={
                    'text-xs px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (openTab === "3"
                      ? 'text-lightBlue-600'
                      : 'text-lightBlue-800')
                  }
                  onClick={e => {
                    e.preventDefault()
                    console.log(code)
                    setOpenTab(code)
                    console.log(openTab)
                    history.push("/GestionCompte/updatePassword");
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <div className="px-6 flex py-1">
                    <MdOutlineSecurity style={{ fontSize: '25px' }} className="mt-1"/>
                    <div className="ml-2">
                      <h3 className="text-1xl mt-2">
                        Sécurité
                      </h3>
                    </div>
                  </div>
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto ">
                <a
                  className={
                    'text-xs px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (openTab ==="4"
                      ? 'text-lightBlue-600'
                      : 'text-lightBlue-800')
                  }
                  onClick={e => {
                    e.preventDefault()
                    setOpenTab(code)
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <div className="px-6 flex py-1">
                    <IoMdNotificationsOutline style={{ fontSize: '25px' }} className="mt-1"/>
                    <div className="ml-2">
                      <h3 className="text-1xl mt-2">
                        Notifications par e-mail
                      </h3>
                    </div>
                  </div>
                </a>
              </li><li className="-mb-px mr-2 last:mr-0 flex-auto ">
              <a
                className={
                  'text-xs px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === "5"
                    ? 'text-lightBlue-600'
                    : 'text-lightBlue-800')
                }
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(code)
                  history.push("/GestionCompte/BadgesNiveauXp");
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <div className="px-6 flex py-1">
                  <SiOpslevel  style={{ fontSize: '25px' }} className="mt-1"/>
                  <div className="ml-2">
                    <h3 className="text-1xl mt-2">
                      Niveau , Badge et Point Xp
                    </h3>
                  </div>
                </div>
              </a>
            </li><li className="-mb-px mr-2 last:mr-0 flex-auto ">
              <a
                className={
                  'text-xs px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === "6"
                    ? 'text-lightBlue-600'
                    : 'text-lightBlue-800')
                }
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(code)
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <div className="px-6 flex py-1">
                  <BiSolidUserAccount style={{ fontSize: '25px' }} className="mt-1"/>
                  <div className="ml-2">
                    <h3 className="text-1xl mt-2">
                      Confientialiter
                    </h3>
                  </div>
                </div>
              </a>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tabs
