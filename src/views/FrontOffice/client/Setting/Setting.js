import React, { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'

import Navbar from "../../../../components/Navbars/Navbar.js";
import Footer from "../../../../components/Footers/FooterSmall.js";
import { getUserAuth } from '../../../../Services/Apiauth'
import { useHistory, useParams } from 'react-router-dom'
  // import { FaUserCog } from 'react-icons/fa'
  // import { getUserByID } from '../Services/ApiUser'
import { FaRegUserCircle } from "react-icons/fa";


export default function Profile() {
  const jwt_token = Cookies.get('jwt_token')
  const history = useHistory();

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
  }else{
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
              <div className="px-6 flex py-3"> {/* Changé items-center en items-start */}
                <FaRegUserCircle  style={{ fontSize: '50px' }} className="mt-3" /> {/* Ajouté style pour définir la taille de l'icône */}
                <div className="ml-4 leading-parametre mt-2"> {/* Ajouté une marge à gauche pour séparer l'icône du texte */}
                  <h3 className="text-2xl font-semibold  text-blueGray-700">
                    Informations personnelles
                  </h3>
                  <h3 className="text-1xl font-normal text-blueGray-600">
                    Informations personnelles
                  </h3>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4">
              <div className="px-6">
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-parametre mb-2 text-blueGray-700 mb-2">
                    Préférences
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative py-1 bg-blueGray-200">
          <div className="container mx-auto  flex justify-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4">
              <div className="px-6">
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-parametre mb-2 text-blueGray-700 mb-2">
                    Sécurité
                  </h3>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4">
              <div className="px-6">
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-parametre mb-2 text-blueGray-700 mb-2">
                    Notifications par e-mail
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative py-1 bg-blueGray-200">
          <div className="container mx-auto  flex justify-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4">
              <div className="px-6">
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-parametre mb-2 text-blueGray-700 mb-2">
                    Prefrence
                  </h3>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-2 mr-2 shadow-xl rounded-lg -mt-4">
              <div className="px-6">
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-parametre mb-2 text-blueGray-700 mb-2">
                    Prefrence
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer absolute />
      </main>
    </>

  );
}
