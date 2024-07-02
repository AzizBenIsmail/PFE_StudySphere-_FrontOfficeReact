import React, { useEffect, useMemo, useState } from 'react'
import { getUserByID } from '../../Services/ApiUser'
import Cookies from 'js-cookie'
import { getUserAuth } from '../../Services/Apiauth'
import { useParams } from 'react-router-dom'
import { MdMarkEmailRead } from 'react-icons/md'
import { TbUserHexagon } from 'react-icons/tb'
import { FiWifiOff , FiWifi   } from 'react-icons/fi'
import { SiVerizon, SiVexxhost } from 'react-icons/si'
// import { FaArchive } from 'react-icons/fa'

// components

export default function Profile () {

  const jwt_token = Cookies.get('jwt_token')

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
          if (res.data.user.role === 'client') {
            window.location.replace(`/landing/`)
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
      await getUserByID(param.id, config).then((res) => {
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
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full flex justify-center">
                  <div className="relative">
                    {User.image_user ? (
                      <img
                        alt="..."
                        src={`http://localhost:5000/images/Users/${User.image_user}`}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    ) : (
                      <div>
                        <img
                          alt="UserImage"
                          src={require('assets/img/empty.png').default}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    )}

                  </div>
                </div>
                <div className="w-full px-4 text-left mt-20">
                  <div className="ml-800">
                    {User.statu === 'true' ? (
                      <div className="text-emerald-500 mr-2">
                        <FiWifi    style={{ fontSize: '24px' }} />
                        En_ligne
                      </div>
                    ) : (
                      <div className=" text-red-500 mr-2">
                        <FiWifiOff  style={{ fontSize: '24px' }} />
                        Hors_ligne
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide ml-4 text-blueGray-600">
                    {User.nom} {User.prenom}
                  </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center ml-800 "
                // style={{ marginLeft: '800px'}}
              >
                <div className="w-full px-4 text-right ">
                  <div className="flex justify-center lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    22
                  </span>
                      <span className="text-sm text-blueGray-400">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-left">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    10
                  </span>
                      <span className="text-sm text-blueGray-400">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-left">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    89
                  </span>
                      <span className="text-sm text-blueGray-400">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left mt-12 ml-3">
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <MdMarkEmailRead className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
                                   style={{ fontSize: '25px' }}/>
                  {User.email}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <TbUserHexagon className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
                                 style={{ fontSize: '25px' }}/>
                  {User.role}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {User.emplacement_actuelle === undefined ? (
                    "non saisire"
                  ) : (
                    User.emplacement_actuelle
                  )}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <div className="mr-2 text-lg text-blueGray-400">
                    {User.etat ? (
                      <div className="flex items-center"  style={{ fontSize: '18px' }}>
                        <SiVerizon className=""  />
                        <div className=" leading-normal uppercase text-lg">Compte Active</div>
                      </div>
                    ) : (
                      <div className="flex items-center "  style={{ fontSize: '18px' }}>
                        <SiVexxhost className="" />
                        "<div className="leading-normal uppercase text-lg">"Compte Desactive</div>
                      </div>
                    )}

                  </div></div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {User.archivage ? (
                    User.archivage.raison
                  ) : null}

                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  {User.visitsCount}

                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-left">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                      and records all of his own music, giving it a warm, intimate
                      feel with a solid groove structure. An artist of considerable
                      range.
                    </p>
                    <a
                      href="#pablo"
                      className="font-normal text-lightBlue-500"
                      onClick={(e) => e.preventDefault()}
                    >
                      Show more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
