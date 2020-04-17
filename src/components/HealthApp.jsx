import React from "react";
import LoginComponent from "./loggedoutComponents/LoginComponent";
import SignUpComponent from "./loggedoutComponents/SignUpComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./customerComponents/HomePage";
import AuthenticatedRoute from "../services/AuthenticatedRoute"

class HealthApp extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/signup" component={SignUpComponent} />
          <AuthenticatedRoute path="/homepage" component={HomePage} />
        </Router>
      </div>
    );
  }
}

export default HealthApp;
