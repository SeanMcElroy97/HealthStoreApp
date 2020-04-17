import React from 'react'
import AuthenticationService from './AuthenticationService'
import { Route, Redirect } from 'react-router-dom'

class AuthenticatedRoute extends React.Component {

    // Pass props from authenticated Route into Route
    //With use of spread operator
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }
    }
}
export default AuthenticatedRoute