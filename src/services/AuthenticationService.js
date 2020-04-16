import Axios from "axios";
import { URL } from "../Constants"

class AuthenticationService {

    testAPI() {
        //return Axios.get('https://jsonplaceholder.typicode.com/todos/1')
        return Axios.get(URL)
    }

    loginUser(emailStr, passwordStr) {
        return Axios.post(URL + '/authenticate', { email: emailStr, password: passwordStr })
    }
}

export default new AuthenticationService();