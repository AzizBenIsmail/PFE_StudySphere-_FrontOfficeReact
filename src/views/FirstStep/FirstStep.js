import React from "react";
// import { Link } from 'react-router-dom'
import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
} from "react-icons/tb";
import { BiBeenHere, BiSolidBeenHere } from "react-icons/bi";
import { useLocation } from "react-router-dom";

export default function FirstStep() {
  const location = useLocation();
  const Step = new URLSearchParams(location.search).get("n");
  return (
    <>
      <div className=" container mx-auto px-1 h-full ">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-9/12 px-1 ">
            <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-blueGray-800 border-0">
              <div className="rounded-t  px-6 py-6">
                <div className="text-center ">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <div className="relative">
                    <div className="flex items-center">
                      {Step === "1" ? (
                        <BiSolidBeenHere
                          style={{ fontSize: "30px" }}
                          color="#4fa94d"
                        />
                      ) : Step === "2" ? (
                        <BiBeenHere
                          style={{ fontSize: "30px", marginLeft: "440px" }}
                          color="#4fa94d"
                        />
                      ) : (
                        <BiBeenHere
                          style={{ fontSize: "30px", marginLeft: "881px" }}
                          color="#4fa94d"
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between w-full">
                      {Step === "1" ? (
                        <>
                          <TbCircleNumber1
                            style={{ fontSize: "30px" }}
                            className="text-white "
                            color="#4fa94d"
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-200"
                            style={{ width: "50%" }}
                          ></div>
                          <TbCircleNumber2
                            style={{ fontSize: "30px" }}
                            className="text-white "
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-200 "
                            style={{ width: "50%" }}
                          ></div>
                          <TbCircleNumber3
                            style={{ fontSize: "30px" }}
                            className="text-white "
                          />
                        </>
                      ) : Step === "2" ? (
                        <>
                          <TbCircleNumber1
                            style={{ fontSize: "30px" }}
                            className="text-white "
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-500"
                            style={{ width: "50%" }}
                          ></div>
                          <TbCircleNumber2
                            style={{ fontSize: "30px" }}
                            color="#4fa94d"
                            className="text-white "
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-200 "
                            style={{ width: "50%" }}
                          ></div>
                          <TbCircleNumber3
                            style={{ fontSize: "30px" }}
                            className="text-white "
                          />
                        </>
                      ) : (
                        <>
                          <TbCircleNumber1
                            style={{ fontSize: "30px" }}
                            className="text-white "
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-500"
                            style={{ width: "50%" }}
                          ></div>
                          <TbCircleNumber2
                            style={{ fontSize: "30px" }}
                            className="text-white "
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-500 "
                            style={{ width: "50%" }}
                          ></div>
                          <TbCircleNumber3
                            style={{ fontSize: "30px" }}
                            color="#4fa94d"
                            className="text-white "
                          />
                        </>
                      )}


                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-4">
                    {/* <Link to="/landing"> */}
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      // onclick = {Login()}
                    >
                      Sign In
                    </button>
                    {/* </Link> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
