import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import config, { env } from "./config";
import * as firebase from "firebase/app";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import NotificationProvider from "./components/providers/NotificationProvider";
import SessionProvider from "./components/providers/SessionProvider";

firebase.initializeApp(config.firebase);

if (env === "local") {
  window.firebase = firebase;
}

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
