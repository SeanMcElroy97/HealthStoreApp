import Axios from "axios";
import { URL } from "../Constants"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const JWT_SESSION_TOKEN = 'Bearer '
// Axios.defaults.headers.common['Authorization'] = 'Bearer' + 'someToken'

class AuthenticationService {

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

    //axios
    testAPI() {
        //return Axios.get('https://jsonplaceholder.typicode.com/todos/1')
        return Axios.get(URL)
    }



    loginUser(emailStr, passwordStr) {
        return Axios.post(URL + '/authenticate', { email: emailStr, password: passwordStr })
    }

    signupUser(email, password, shippingAddress, cardNumber) {
        return Axios.post(URL + '/newcust', { email, password, shippingAddress, cardNumber })
    }


    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return (user === null) ? false : true
    }

    //Helpper meyhods
    successfulJWTLogin(token, email) {
        //console.log('in successful Jwt login')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, email)
        sessionStorage.setItem('jwt', 'Bearer ' + token)

        // JWT_SESSION_TOKEN = JWT_SESSION_TOKEN + token

        //this.setupAxiosInterceptor()

    }

    // setupAxiosInterceptor() {

    //     Axios.interceptors.request.use(
    //         (config) => {
    //             console.log('in axios request.use')
    //             if (this.isUserLoggedIn()) {
    //                 const tokeny = sessionStorage.getItem('jwt');
    //                 config.headers.authorization = tokeny
    //             }
    //             return config
    //         }
    //     )
    // }

    checkCustomerMethod() {
        return Axios.get(URL + '/customer')
    }

    checkAdminMethod() {
        return Axios.get(URL + '/admin')
    }

    fetchAllStock() {
        return Axios.get(URL + '/customer/viewALLProducts')
    }

    fetchAllStockAdmin() {
        return Axios.get(URL + '/admin/all')
    }

    logUserOut() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        sessionStorage.removeItem('jwt')
    }


    fetchAllCustomers() {
        return Axios.get(URL + '/admin/getAllCustomers')
    }

    findCustomerByID() {
        let email = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        return Axios.get(URL + `/customer/customerById/${email}`)
    }

    addItemToCart(product, quantity, customer) {

        console.log("Product " + product)
        console.log("quantity " + quantity)
        console.log("customer " + customer)

        let email = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)


        return Axios.post(URL + `/customer/addToBasket/${email}`, { product, quantity })

    }


    fetchCustomerShoppingBasket() {
        let email = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        return Axios.get(URL + `/customer/customerShoppingCart/${email}`)
    }


}

export default new AuthenticationService();