import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";



ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
document.getElementById("root")
);
serviceWorkerRegistration.register();
