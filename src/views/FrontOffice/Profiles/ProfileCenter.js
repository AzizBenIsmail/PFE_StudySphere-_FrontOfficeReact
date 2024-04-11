import React, { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'

import { useParams } from 'react-router-dom'
import { getUserByID } from '../../../Services/ApiUser'
import { MdShareLocation } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { HiLanguage } from "react-icons/hi2";
import { GoGoal } from "react-icons/go";
import { GiGiftOfKnowledge } from "react-icons/gi";


export default function Profile() {
  const jwt_token = Cookies.get('jwt_token')

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  const param = useParams()

  const [User, setUser] = useState({})

  useEffect(() => {
    const getUser = async (config) => {
      await getUserByID(param.id, config).then((res) => {
        setUser(res.data.user);
        console.log(res.data.user);
      }).catch((err) => {
        console.log(err);
      });
    };

    getUser(config);

    const interval = setInterval(() => {}, 1000000);

    return () => clearInterval(interval);
  }, [config,param.id ]);

  return (
    <>
        <section className="relative py-15 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      {User && User.image_user ? (
                        <img
                          alt="UserImage"
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          src={`http://localhost:5000/images/Users/${User.image_user}`}
                        />
                      ) : (
                        <div>
                          <img
                            alt="..."
                            src={require("../../../assets/img/client.png").default}
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-2">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {User && User.Formations ? ( User.Formations.length ) : ("Pas de formation") }
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Formation
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          feedbacks
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-4xl  font-semibold leading-normal ml-2 text-blueGray-700 mb-2">
                    {User.nom}
                  </h3>
                  {/*<div className="flex items-center">*/}
                  {/*  <h3 className="text-1 xl font-bold leading-normal text-blueGray-700 mr-2">Email </h3>*/}
                  {/*  <MdMarkEmailRead className="mr-2 text-blueGray-400" style={{ fontSize: '25px' }}  />*/}
                  {/*  <div className="text-sm leading-normal  text-blueGray-400 font-bold uppercase">{User.email}</div>*/}

                  {/*<div className="text-sm leading-normal ml-4 text-blueGray-400 font-bold uppercase flex items-center">*/}
                  {/*  <h3 className="text-1 xl font-bold leading-normal text-blueGray-700 mr-2">Localisation :</h3>*/}
                  {/*  <MdEmail  className="mr-2" style={{ fontSize: '25px' }}  />*/}
                  {/*  {User && User.preferences && User.preferences.emplacement_actuelle ? (*/}
                  {/*      User.preferences.emplacement_actuelle*/}
                  {/*  ) : (*/}
                  {/*    "Non saisire"*/}
                  {/*  )}*/}
                  {/*</div>*/}
                  {/*</div>*/}
                  <div className="flex flex-wrap mt-12 justify-center">
                    <div className="w-full lg:w-2/12 px-4 text-center">
                      <h6 className="text-xl mt-5 font-semibold flex items-center ml-8 ">
                        <MdEmail className="mr-2"  style={{ fontSize: '25px' }}  />
                        Email
                      </h6>
                      <p className="mt-2 mb-4 text-blueGray-400">
                        {User.email}
                      </p>
                    </div>
                    <div className="w-full lg:w-2/12 px-4 text-center">
                      <h6 className="text-xl mt-5 font-semibold flex items-center ml-8">
                        <MdShareLocation className="mr-2" style={{ fontSize: '25px' }}  />
                        Localisation
                      </h6>
                      <p className="mt-2 mb-4 text-blueGray-400">
                        {User && User.preferences && User.preferences.emplacement_actuelle ? (
                          User.preferences.emplacement_actuelle
                        ) : (
                          "Non saisire"
                        )}
                      </p>
                    </div>
                    <div className="w-full lg:w-2/12 px-4 text-center">
                      <h5 className="text-xl font-semibold flex items-center ml-8">
                        <HiLanguage className="mr-2" style={{ fontSize: '50px' }}  />
                        préférences linguistiques
                      </h5>
                      <p className="mt-2 mb-4 text-blueGray-400">
                        {User && User.preferences && User.preferences.preferences_linguistiques ? (
                          User.preferences.preferences_linguistiques
                        ) : (
                          "Non saisire"
                        )}
                      </p>
                    </div>
                    <div className="w-full lg:w-2/12 px-4 text-center">
                      <h5 className="text-xl mt-5 font-semibold flex items-center ml-8">
                        <GoGoal className="mr-2" style={{ fontSize: '25px' }}  />
                        Domaine
                      </h5>
                      <p className="mt-2 mb-4 text-blueGray-400">
                        {User && User.preferences && User.preferences.domaine_actuelle ? (
                          User.preferences.domaine_actuelle
                        ) : (
                          "Non saisire"
                        )}
                      </p>
                    </div>
                    <div className="w-full lg:w-2/12 px-4 text-center">
                      <h5 className="text-xl font-semibold flex items-center ">
                        <GiGiftOfKnowledge style={{ fontSize: '50px' }}  />

                        compétences d'intérêt
                      </h5>
                      <p className="mt-2 mb-4 text-blueGray-400">
                        {User && User.preferences && User.preferences.competences_dinteret ? (
                          User.preferences.competences_dinteret
                        ) : (
                          "Non saisire"
                        )}
                      </p>
                    </div>
                  </div>
                  {/*<div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">*/}
                  {/*  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}*/}
                  {/*  {User.etat ? (*/}
                  {/*    <div className="flex items-center"  >*/}
                  {/*      <SiVerizon className="" style={{ fontSize: '18px' }} />*/}
                  {/*      <div className=" leading-normal uppercase text-lg">Compte Active</div>*/}
                  {/*    </div>*/}
                  {/*  ) : (*/}
                  {/*    <div className="flex items-center "  style={{ fontSize: '18px' }}>*/}
                  {/*      <SiVexxhost className="" />*/}
                  {/*      "<div className="leading-normal uppercase text-lg">"Compte Desactive</div>*/}
                  {/*    </div>*/}
                  {/*  )}*/}
                  {/*</div>*/}
                  {/*<div className="mb-2 text-blueGray-600 mt-10">*/}
                  {/*  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>*/}
                  {/*  Solution Manager - Creative Tim Officer*/}
                  {/*</div>*/}
                  {/*<div className="mb-2 text-blueGray-600">*/}
                  {/*  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>*/}
                  {/*  University of Computer Science*/}
                  {/*</div>*/}
                </div>
                {/*<div className="mt-10 py-10 border-t border-blueGray-200 text-center">*/}
                {/*  <div className="flex flex-wrap justify-center">*/}
                {/*    <div className="w-full lg:w-9/12 px-4">*/}
                {/*      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">*/}
                {/*        An artist of considerable range, Jenna the name taken by*/}
                {/*        Melbourne-raised, Brooklyn-based Nick Murphy writes,*/}
                {/*        performs and records all of his own music, giving it a*/}
                {/*        warm, intimate feel with a solid groove structure. An*/}
                {/*        artist of considerable range.*/}
                {/*      </p>*/}
                {/*      <a*/}
                {/*        href="#pablo"*/}
                {/*        className="font-normal text-lightBlue-500"*/}
                {/*        onClick={(e) => e.preventDefault()}*/}
                {/*      >*/}
                {/*        Show more*/}
                {/*      </a>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
