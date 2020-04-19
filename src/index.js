import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import firebase from 'firebase/app'
import 'firebase/storage';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBL24ZtqU4rMN31CMRsPjXclYmGh7I63Jc",
  authDomain: "healthstore-c6913.firebaseapp.com",
  databaseURL: "https://healthstore-c6913.firebaseio.com",
  projectId: "healthstore-c6913",
  storageBucket: "healthstore-c6913.appspot.com",
  messagingSenderId: "573549732453",
  appId: "1:573549732453:web:03ecedc440fadd21479c8c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);