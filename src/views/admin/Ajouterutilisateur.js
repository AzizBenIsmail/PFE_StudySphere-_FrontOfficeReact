import React, { useMemo } from 'react'

// components
import Cookies from 'js-cookie'
import { getUserAuth } from '../../Services/Apiauth'

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Dashboard() {
  //cookies
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
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:mb-0 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-4 shadow-lg rounded bg-blueGray-700">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h2 className="text-white text-xl font-semibold">Ajouter Un Utilisateur</h2>
                </div>
              </div>
            </div>
            <div className="p-4 flex-auto">
              <br></br>

                <button
                  className="text-white bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-4 rounded outline-none focus:outline-none mr-4 mb-4 ease-linear transition-all duration-150 ml-6"
                >
                  Client
                </button>
                <button
                  className="text-white bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-4 rounded outline-none focus:outline-none mr-4 mb-4 ease-linear transition-all duration-150 ml-6"
                >
                  Centre de Formation
                </button>
                <button
                  className="text-white bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-4 rounded outline-none focus:outline-none mr-4 mb-4 ease-linear transition-all duration-150 ml-6"
                >
                  Formateur
                </button>
                <button
                  className="text-white bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-4 rounded outline-none focus:outline-none mr-4 mb-4 ease-linear transition-all duration-150 ml-6"
                >
                  Moderateur
                </button>
            </div>
            <br></br>
            <br></br>

          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

        </div>
      {/*  <div className="w-full xl:w-4/12 px-4">*/}
      {/*    /!*<CardBarChart />*!/*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="flex flex-wrap mt-4">*/}
      {/*  <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">*/}
      {/*    /!*<CardPageVisits />*!/*/}
      {/*  </div>*/}
      {/*  <div className="w-full xl:w-4/12 px-4">*/}
      {/*    /!*<CardSocialTraffic />*!/*/}
      {/*  </div>*/}
      </div>
    </>
  );
}
