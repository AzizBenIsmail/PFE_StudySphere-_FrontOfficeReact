import React, { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'

import Navbar from '../../../components/Navbars/Navbar.js'
import Footer from '../../../components/Footers/FooterSmall.js'
import { getUserAuth } from '../../../Services/Apiauth'
import {  useHistory, useParams } from 'react-router-dom'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdOutlineSecurity, MdRoomPreferences } from 'react-icons/md'
import { MdFavoriteBorder } from "react-icons/md";
import { SiOpslevel } from "react-icons/si";
import { BiSolidUserAccount } from 'react-icons/bi'
import { MdOutlineClass } from "react-icons/md";

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
            <div className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4"
                 onClick={() => {
                   history.push(`/AccountManagement/edit/${User._id}?u=${User.role.toLowerCase()}`)
                 }} style={{ cursor: 'pointer', transition: 'box-shadow 0.3s' }}
                 onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                 onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <div className="px-6 flex py-3" >
                <FaRegUserCircle style={{ fontSize: '50px' }} className="mt-3"/>
                <div className="ml-4 leading-parametre mt-2">
                  <h3 className="text-2xl font-semibold text-blueGray-700">
                    Informations personnelles
                  </h3>
                  <h3 className="text-1xl font-normal text-blueGray-600">
                    Mettez à jour vos informations .
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4"
              onClick={() => {
                if (User.role === 'client') {
                  if (User.preferences === undefined) {
                    history.push("/First");
                  } else {
                    history.push("/First/UpdatePreferences");
                  }
                }

                if (User.role === 'formateur') {
                  if (User.preferences === undefined) {
                    history.push("/First/announcementFormateur");
                  } else {
                    history.push("/First/UpdatePreferenceFormateur");
                  }
                }

                if (User.role === 'centre') {
                  if (User.preferences === undefined) {
                    history.push("/First/announcementCenter");
                  } else {
                    history.push("/First/UpdatePreferencesCenter");
                  }
                }
              }} style={{ cursor: 'pointer', transition: 'box-shadow 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div className="px-6 flex py-3">
                <MdRoomPreferences style={{ fontSize: '50px' }} className="mt-3"/>
                <div className=" ml-4 leading-parametre mt-2">
                  <h3 className="text-2xl font-semibold text-blueGray-700 ">
                    Préférences
                  </h3>
                  <h3 className="text-1xl font-normal mb-2 text-blueGray-600 ">
                    Modifiez votre Preference .
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative py-1 bg-blueGray-200">
          <div className="container mx-auto flex justify-center">
            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4"
              onClick={() => {
                  history.push("AccountManagement/updatePassword");
            }} style={{ cursor: 'pointer', transition: 'box-shadow 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <div className="px-6 flex py-3">
                <MdOutlineSecurity style={{ fontSize: '50px' }} className="mt-3"/>
                <div className="ml-4 leading-parametre mt-2">
                  <h3 className="text-2xl font-semibold text-blueGray-700">
                    Sécurité
                  </h3>
                  <h3 className="text-1xl font-normal mb-2 text-blueGray-600">
                    Modifiez vos paramètres de sécurité ou supprimez votre compte </h3>
                </div>
              </div>
            </div>
            {User && (User.role === "centre" )  ? (
              <>
                <div
                  className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4"
                  onClick={() => {
                    history.push("/AccountManagement/createFormation");
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                  <div className="px-6 flex py-6">
                    <MdOutlineClass  style={{ fontSize: '50px' }} className="mt-3"/>
                    <div className="ml-4 leading-parametre mt-2 ">
                      <h3 className="text-2xl font-semibold text-blueGray-700 ">
                        Gére Les Formation
                      </h3>
                      <h3 className="text-1xl font-normal text-blueGray-600">
                        Ajouter , Modifiez vos Formation ou supprimez une Formation
                      </h3>
                    </div>
                  </div>
                </div>
              </>
            ) :
              <div
                className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4"
                onClick={() => {
                  if (User.role === 'client') {
                    console.log(User)
                    console.log(User.preferences)
                    if (User.preferences === undefined) {
                      history.push("/updatePassword");
                    } else {
                      history.push("/First/UpdatePreferences");
                    }
                  }
                }} style={{ cursor: 'pointer', transition: 'box-shadow 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div className="px-6 flex py-6">
                  <MdFavoriteBorder style={{ fontSize: '50px' }} className="mt-3"/>
                  <div className="ml-4 leading-parametre mt-2 ">
                    <h3 className="text-2xl font-semibold text-blueGray-700 ">
                      Liste favoris
                    </h3>
                    <h3 className="text-1xl font-normal text-blueGray-600">
                      Gere vos favoris ou personnaliser votre Liste .
                    </h3>
                  </div>
                </div>
              </div>
            }

          </div>
        </section>
        <section className="relative py-1 bg-blueGray-200 mb-3">
          <div className="container mx-auto  flex justify-center">
            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4"
              onClick={() => {
                  history.push("/AccountManagement/BadgesNiveauXp");
            }} style={{ cursor: 'pointer', transition: 'box-shadow 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <div className="px-6 flex py-6">
                <SiOpslevel  style={{ fontSize: '50px' }} className="mt-3"/>
                <div className="ml-4 leading-parametre mt-2">
                  <h3 className="text-2xl font-semibold text-blueGray-700 ">
                    Niveau , Badge et Point Xp
                  </h3>
                  <h3 className="text-1xl font-normal mb-2 text-blueGray-600 ">
                    Ajouter ou Supprimer vos moyens de paiment en toute securite
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4"
              onClick={() => {
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
            }} style={{ cursor: 'pointer', transition: 'box-shadow 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <div className="px-6 flex py-6">
                <BiSolidUserAccount style={{ fontSize: '50px' }} className="mt-3"/>
                <div className="ml-4 leading-parametre mt-2">
                  <h3 className="text-2xl font-semibold mb-2 text-blueGray-700 ">
                    Confientialiter
                  </h3>
                  <h3 className="text-1xl font-normal mb-2 text-blueGray-600">
                    Exercez vos droits relatifs a la protection de la confidentialite
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
