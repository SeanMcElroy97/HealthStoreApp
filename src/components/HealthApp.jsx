import React from "react";
import LoginComponent from "./loggedoutComponents/LoginComponent";
import SignUpComponent from "./loggedoutComponents/SignUpComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./customerComponents/HomePage";
import AdminHomePage from "./adminComponents/AdminHomePage"
import AuthenticatedRoute from "../services/AuthenticatedRoute"
import AdminProductsComponent from "./adminComponents/AdminProductsComponent"
import AdminProductComponent from "./adminComponents/AdminProductComponent"

class HealthApp extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={LoginComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/signup" component={SignUpComponent} />
            <AuthenticatedRoute path="/homepage" component={HomePage} />
            <AuthenticatedRoute path="/adminhomepage" component={AdminHomePage} />
            <AuthenticatedRoute path="/adminproducts/:id" component={AdminProductComponent} />
            <AuthenticatedRoute path="/adminproducts" exact component={AdminProductsComponent} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default HealthApp;
