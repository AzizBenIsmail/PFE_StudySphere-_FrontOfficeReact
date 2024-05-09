import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";
import reportWebVitals from "./reportWebVitals";
import ContextWrapper from "./context/ContextWrapper";
ReactDOM.render(
  <React.StrictMode>
    <ContextWrapper>
      <Main />
    </ContextWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();
