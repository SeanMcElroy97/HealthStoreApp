import React from "react";
import LoginComponent from "./loggedoutComponents/LoginComponent";
import SignUpComponent from "./loggedoutComponents/SignUpComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";

class HealthApp extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/signup" component={SignUpComponent} />
        </Router>
      </div>
    );
  }
}

export default HealthApp;
