import Axios from "axios";
import { URL } from "../Constants"

class AuthenticationService {

    //axios
    testAPI() {
        //return Axios.get('https://jsonplaceholder.typicode.com/todos/1')
        return Axios.get(URL)
    }

    loginUser(emailStr, passwordStr) {
        return Axios.post(URL + '/authenticate', { email: emailStr, password: passwordStr })
    }

    setupAxiosInterceptor(bearerToken) {
        Axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn) {
                    config.headers.authorization = bearerToken
                }
                return config
            }
        )
    }

    //Helpper meyhods
    successfulJWTLogin(token, email) {
        sessionStorage.setItem('authenticatedUser', email)
        this.setupAxiosInterceptor('Bearer ' + token)

    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser');
        return (user == null) ? false : true
    }


}

export default new AuthenticationService();