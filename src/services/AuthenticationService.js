import Axios from "axios";


class AuthenticationService {

    login() {
        return Axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
    }
}

export default new AuthenticationService();