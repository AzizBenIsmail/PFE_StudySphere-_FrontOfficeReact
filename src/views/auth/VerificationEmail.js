import { React } from 'react'
import { Link, } from 'react-router-dom'

export default function VerificationEmail () {

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <img
                  src={require('assets/img/EmailVerification.png').default}
                  alt="..."
                />
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                {/*<Link to="/auth/registerEmail?message=1" className="text-blueGray-200">*/}
                  <small> .</small>
                {/*</Link>*/}
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/login" className="text-blueGray-200">
                  <small> Se connecter </small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
