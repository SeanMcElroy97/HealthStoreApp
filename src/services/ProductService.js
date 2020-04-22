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


    //Admin
    fetchAllStock() {
        return Axios.get(URL + '/admin/all')
    }

    addProductToStock(title, manufacturer, price, category, productImageLink, qtyHeld) {

        // console.log(title)
        // console.log(manufacturer)
        // console.log(price)
        // console.log(category)
        // console.log(productImageLink)
        // console.log(qtyHeld)
        return Axios.post(URL + '/admin/add', { product: { title, manufacturer, price, category, productImageLink }, qtyHeld })

    }

    updateProductStock(stockArray) {
        return Axios.post(URL + '/admin/updateStock', stockArray)
    }



    //Customer

    fetchAllProductsAvailable() {
        return Axios.get(URL + '/customer/viewALLProducts')
    }

}

export default new ProductService();