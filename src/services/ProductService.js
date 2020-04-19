import Axios from "axios";
import { URL } from "../Constants"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'


class ProductService {

    constructor() {
        Axios.interceptors.request.use(
            (config) => {
                console.log('in axios request.use')
                if (this.isUserLoggedIn()) {
                    const tokeny = sessionStorage.getItem('jwt');
                    config.headers.authorization = tokeny
                }
                return config
            }
        )
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return (user === null) ? false : true
    }


    fetchAllStock() {
        return Axios.get(URL + '/admin/all')
    }


}

export default new ProductService();