/*eslint-disable*/
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Navbar from '../../../components/Navbars/Navbar.js'
import Footer from '../../../components/Footers/FooterSmall.js'
import Cookies from 'js-cookie'
import { getUserAuth } from '../../../Services/Apiauth'
import { getFormationById } from '../../../Services/ApiFormation'
import { GiMoneyStack } from 'react-icons/gi'

export default function Index () {
  const [user, setUser] = useState(null)
  const jwt_token = Cookies.get('jwt_token')
  const history = useHistory()
  const param = useParams()

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (jwt_token) {
          const config = {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          }
          const res = await getUserAuth(config)
          setUser(() => {
            if (res.data.user.role === 'admin') {
              history.replace('/admin/')
            }
            return res.data.user
          })
        } else {
          history.replace('/')
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [history, jwt_token]) // Inclure history et jwt_token dans le tableau de dépendances

  const [formation, setFormation] = useState([])

  const loadFormations = useCallback(async () => {
    try {
      const res = await getFormationById(param.id, config)
      setFormation(res.data.formation)
      console.log(res)
    } catch (error) {
      console.error('Error loading formations:', error)
    }
  }, [config])

  useEffect(() => {
    loadFormations()
  }, [loadFormations])

  return (
    <>
      <Navbar user={user}/>
      <section className="py-20 bg-bleu-500 overflow-hidden">
        <div className="container mx-auto pb-6">
          <div className="flex flex-wrap justify-center">
          </div>
        </div>
      </section>
      <div className="container mx-auto ">
        <div className="flex flex-wrap items-center">
          <div className="w-13/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-bleu-500">
              {formation && formation.image_Formation ? (
                <img
                  alt="..."
                  src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                  style={{ width: "450px", height: "320px" }}
                  className="w-full align-middle rounded-t-lg"
                />
              ) : (
                <div>
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                </div>
              )}

              <blockquote className="relative p-4 mb-6">
                <h4 className="text-xl font-bold text-white">
                  <span
                    className="inline-block text-center w-full">{formation.titre}</span> {/* Ajoutez une classe pour augmenter la largeur */}
                </h4>
                <p className="text-md font-light mt-2 text-white">
                  {formation.description}
                </p>
              </blockquote>
            </div>
          </div>


          <div className="w-full md:w-6/12 px-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 px-4">
                <div className="relative flex flex-col mt-4">
                  <div className="px-4 py-5 flex-auto">
                    <div
                      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <GiMoneyStack style={{ fontSize: '50px' }}
                      />
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">
                      Prix
                    </h6>
                    <p className="mb-4 text-blueGray-500">
                      {formation.Prix}
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0">
                  <div className="px-4 py-5 flex-auto">
                    <div
                      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <i className="fas fa-drafting-compass"></i>
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">
                      JavaScript Components
                    </h6>
                    <p className="mb-4 text-blueGray-500">
                      We also feature many dynamic components for React,
                      NextJS, Vue and Angular.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 mt-4">
                  <div className="px-4 py-5 flex-auto">
                    <div
                      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <i className="fas fa-newspaper"></i>
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">Pages</h6>
                    <p className="mb-4 text-blueGray-500">
                      This extension also comes with 3 sample pages. They are
                      fully coded so you can start working instantly.
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0">
                  <div className="px-4 py-5 flex-auto">
                    <div
                      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">
                      Documentation
                    </h6>
                    <p className="mb-4 text-blueGray-500">
                      Built by developers for developers. You will love how
                      easy is to to work with Notus React.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer absolute/>
    </>
  )
}
