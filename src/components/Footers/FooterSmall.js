import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-blueGray-800"
            : "relative ") + "pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-2 border-b-1 border-blueGray-600 " />
          <div className="flex flex-wrap items-center md:justify-between mb-2 justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.facebook.com/9antra.tn"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold "
                >
                  9antra Tim
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="https://www.linkedin.com/in/aziz-ben-ismail-a111ba19a/"
                    className="text-blueGray-500 hover:text-blueGray-300 text-sm font-semibold block  px-3"
                  >
                    Aziz Ben Ismail
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
