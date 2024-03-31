import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../../../../components/Navbars/Navbar'
import Cookies from 'js-cookie'
import { getUserAuth } from '../../../../Services/Apiauth'
import Footer from '../../../../components/Footers/FooterSmall'

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="w-1/4 ml-8">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <ul
              className="list-none flex-wrap pt-3 pb-4  "
              role="tablist"
            >
              <li className=" mr-2 last:mr-0 flex-auto">
                <a
                  className={
                    "text-xs px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-lightBlue-600 "
                      : "text-lightBlue-800 ")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  <i className="fas fa-space-shuttle text-base ml-4"></i> Profile
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto ">
                <a
                  className={
                    "text-xs px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-lightBlue-600"
                      : "text-lightBlue-800")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  <i className="fas fa-cog text-base ml-4"></i>  Settings
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto ">
                <a
                  className={
                    "text-xs px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-lightBlue-600"
                      : "text-lightBlue-800")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <i className="fas fa-briefcase text-base ml-4"></i>  Options
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
