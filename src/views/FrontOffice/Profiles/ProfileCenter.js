import React, { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'

import { useParams } from 'react-router-dom'
import { MdMarkEmailRead } from 'react-icons/md'
import { TbUserHexagon } from 'react-icons/tb'
import { SiVerizon, SiVexxhost } from 'react-icons/si'
import { getUserByID } from '../../../Services/ApiUser'

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
                      {/*<img*/}
                      {/*  alt="..."*/}
                      {/*  src={require("assets/img/team-2-800x800.jpg").default}*/}
                      {/*  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"*/}
                      {/*/>*/}
                      {User && User.image_user ? (
                        <img
                          // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                          alt="UserImage"
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          src={`http://localhost:5000/images/Users/${User.image_user}`}
                          // style={{ width: "80px", height: "80px" }}
                        />
                      ) : (
                        <div>
                          <img
                            alt="..."
                            src={require("../../../assets/img/client.png").default}
                            // style={{ maxWidth: '120%' }}
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
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Friends
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Photos
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
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {User.nom} {User.prenom}
                  </h3>
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
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                    {User.emplacement_actuelle === undefined ? (
                      "non saisire"
                    ) : (
                      User.emplacement_actuelle
                    )}                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
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
