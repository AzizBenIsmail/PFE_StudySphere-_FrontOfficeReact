// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import Routes from './Routes';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/styles/tailwind.css";



// ReactDOM.render(
//   <BrowserRouter>
//     <Routes />
//   </BrowserRouter>,
// document.getElementById("root")
// );
// serviceWorkerRegistration.register();


import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import { AuthContextProvider } from './views/chat/context/AuthContext'; 
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {SocketContextProvider} from './views/chat/context/SocketContext'




import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider> {/* Wrap Routes with AuthContextProvider */}
    <SocketContextProvider>
      <Routes />
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
