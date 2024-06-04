import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import store from "./views/forum/utils/store";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import { AuthContextProvider } from './views/chat/context/AuthContext'; 
import {SocketContextProvider} from './views/chat/context/SocketContext'
import ContextWrapperCalendar  from "views/admin/calendar/context/ContextWrapper";
import ContextWrapper from "views/calendar/context/ContextWrapper";

ReactDOM.render(
  <BrowserRouter>
  <AuthContextProvider> {/* Wrap Routes with AuthContextProvider */}
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
