import React, { useMemo } from 'react'

// components

import ListUsers from "../admin/ListUsers";
// import CardTable from "../../components/Cards/CardTable";
import Cookies from 'js-cookie'
import { getUserAuth } from '../../Services/ApiUser'

export default function Tables() {
  // const navigate = useNavigate()

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
      <div className="flex flex-wrap mt-4">
        {/*<div className="w-full mb-12 px-4">*/}
        {/*  <CardTable />*/}
        {/*</div>*/}
        <div className="w-full mb-12 px-4">
          <ListUsers color="dark" />
        </div>
      </div>
    </>
  );
}
