import React from 'react'
import AuthenticationService from "../../services/AuthenticationService"



class HomePage extends React.Component {

    //AXIOS GLOBALS



    constructor(props) {
        super(props)
        this.state = {}
        this.logOut = this.logOut.bind(this)
        this.customerMethod2 = this.customerMethod2.bind(this)
    }

    render() {
        return <div>
            <div>IN HOME PAGE</div>
            <button onClick={() => this.logOut()}>Logout</button>
            <button onClick={() => this.customerMethod2()}>Customer method 2</button>
            <button onClick={() => this.props.history.push('/customerproducts')}> View products</button>
        </div>

    }

    logOut() {
        AuthenticationService.logUserOut();
        this.props.history.push('/login')
    }

    customerMethod2() {
        AuthenticationService.fetchAllStock()
            .then(response => console.log(response))
    }

    componentDidMount() {

        //AuthenticationService.setupAxiosInterceptor()
        AuthenticationService.checkCustomerMethod()
            .then(response => console.log(response))

    }
}

export default HomePage