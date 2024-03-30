import React, { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'

import Navbar from '../../../../components/Navbars/Navbar.js'
import Footer from '../../../../components/Footers/FooterSmall.js'
import { getUserAuth } from '../../../../Services/Apiauth'
import { useHistory, useParams } from 'react-router-dom'
// import { FaUserCog } from 'react-icons/fa'
// import { getUserByID } from '../Services/ApiUser'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdOutlineSecurity, MdRoomPreferences } from 'react-icons/md'
import { IoIosCard, IoMdNotificationsOutline } from 'react-icons/io'
import { BiSolidUserAccount } from 'react-icons/bi'

export default function Profile () {
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
      <Navbar user={User}/>
      <main className="profile-page">
        <section className="relative block h-70-px">
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <span id="blackOverlay" className="w-full h-full absolute opacity-100 bg-bleu-500"></span>
          </div>
        </section>
        <section className="relative bg-blueGray-200">
          <div className="container relative mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 py-4a text-left"> {/* Retiré ml-auto et mr-auto */}
                <div className="pr-12 pt-12 mt-2">
                  <h1 className="text-black font-bold text-5xl">
                    Paramètres du compte
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-500">
                    Gérez votre expérience sur ForMe.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto flex justify-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4">
              <div className="px-6 flex py-3" onClick={() => {
                if (User.role === 'client') {
                  console.log(User)
                  console.log(User.preferences)
                  if (User.preferences === undefined) {
                    history.push("/First");
                  } else {
                    history.push("/First/UpdatePreferences");
                  }
                }

                if (User.role === 'centre') {
                  if (!User.xp) {
                    history.push("/First");
                  }
                }
              }}>
                <FaRegUserCircle style={{ fontSize: '50px' }} className="mt-3" />
                <div className="ml-4 leading-parametre mt-2">
                  <h3 className="text-2xl font-semibold text-blueGray-700">
                    Informations personnelles
                    <span className="text-blue-500 text-xs ml-1"> (cliquable)</span> {/* Indication de clicabilité */}
                  </h3>
                  <h3 className="text-1xl font-normal text-blueGray-600">
                    Informations personnelles
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4"
              >
              <div className="px-6 flex py-3">
                <MdRoomPreferences style={{ fontSize: '50px' }} className="mt-3"/>
                <div className=" ml-4 leading-parametre mt-2">
                  <h3 className="text-2xl font-semibold text-blueGray-700 ">
                    Préférences
                  </h3>
                  <h3 className="text-1xl font-normal mb-2 text-blueGray-600 ">
                    Modifiez votre Preference, votre devise et vos exigences en matière d'accessibilité.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative py-1 bg-blueGray-200">
          <div className="container mx-auto flex justify-center">
            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4">
              <div className="px-6 flex py-3">
                <MdOutlineSecurity style={{ fontSize: '50px' }} className="mt-3"/>
                <div className="ml-4 leading-parametre mt-2">
                  <h3 className="text-2xl font-semibold text-blueGray-700">
                    Sécurité
                  </h3>
                  <h3 className="text-1xl font-normal mb-2 text-blueGray-600">
                    Modifiez vos paramètres de sécurité, configurez une authentification sécurisée ou supprimez votre
                    compte </h3>
                </div>
              </div>
            </div>
            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4">
              <div className="px-6 flex py-6">
                <IoMdNotificationsOutline style={{ fontSize: '50px' }} className="mt-3"/>
                <div className="ml-4 leading-parametre mt-2 ">
                  <h3 className="text-2xl font-semibold text-blueGray-700 ">
                    Notifications par e-mail
                  </h3>
                  <h3 className="text-1xl font-normal text-blueGray-600">
                    Choisisser les notification que vous recevrez et desabonner-bous des autres.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative py-1 bg-blueGray-200">
          <div className="container mx-auto  flex justify-center">
            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4">
              <div className="px-6 flex py-6">
                <IoIosCard style={{ fontSize: '50px' }} className="mt-3"/>
                <div className="ml-4 leading-parametre mt-2">
                  <h3 className="text-2xl font-semibold text-blueGray-700 ">
                    Information de paiement
                  </h3>
                  <h3 className="text-1xl font-normal mb-2 text-blueGray-600 ">
                    Ajouter ou Supprimer vos moyens de paiment en toute securite
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4">
              <div className="px-6 flex py-6">
                <BiSolidUserAccount style={{ fontSize: '50px' }} className="mt-3"/>
                <div className="ml-4 leading-parametre mt-2">
                  <h3 className="text-2xl font-semibold mb-2 text-blueGray-700 ">
                    Confientialiter
                  </h3>
                  <h3 className="text-1xl font-normal mb-2 text-blueGray-600">
                    Exercez vos droits relatifs a la protection de la confidentialite et controler la maniere dont vos
                    donnees sont utilisees
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*<Footer absolute />*/}
        <Footer/>
      </main>
    </>

  )
}
