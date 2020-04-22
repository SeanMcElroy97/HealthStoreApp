import React from 'react'
import AuthenticationService from "../../services/AuthenticationService"


class AdminHomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.logOut = this.logOut.bind(this)
    }

    render() {
        return <div>
            <div>ADMIN HOME PAGE</div>
            <button onClick={() => this.logOut()}>Logout</button>
            <button onClick={() => this.props.history.push('/adminproducts')}>Products</button>
            <button onClick={() => this.props.history.push('/adminCustomers')}>Customers</button>
        </div>

    }

    logOut() {
        AuthenticationService.logUserOut();
        this.props.history.push('/login')
    }

    componentDidMount() {
        AuthenticationService.checkAdminMethod()
            .then(response => console.log(response))
        console.log('home page mounting')
    }
}

export default AdminHomePage