import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import ContextWrapperCalendar  from "views/admin/calendar/context/ContextWrapper";
import ContextWrapper from "views/calendar/context/ContextWrapper";
import { AuthContextProvider } from './views/chat/context/AuthContext'; 
import {SocketContextProvider} from './views/chat/context/SocketContext'
import { Provider } from "react-redux";
import store from "./views/forum/utils/store";
ReactDOM.render(
  <BrowserRouter>
  <AuthContextProvider> 
    <SocketContextProvider>


    <Provider store={store}>
  <ContextWrapperCalendar>
  <ContextWrapper>
    <Routes />
  </ContextWrapper>
  </ContextWrapperCalendar>
  </Provider>


  </SocketContextProvider>
  </AuthContextProvider>

  </BrowserRouter>,
document.getElementById("root")
);
serviceWorkerRegistration.register();
