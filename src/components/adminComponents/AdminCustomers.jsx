import React from 'react'
import AuthenticationService from "../../services/AuthenticationService"
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';


import { TableRow } from '@material-ui/core';


export default class AdminCustomers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            customers: []
        }

    }

    render() {
        return <Container>
            <div align="center">
                <Button variant="contained" className='center_btn' style={{ color: '#FF8300' }} onClick={() => this.props.history.push('/adminhomepage')}>Go Home</Button>
                <h1>The health store has {this.state.customers.length} customers</h1>
            </div>

            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer email</TableCell>
                            <TableCell>Customer Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.customers.map((customer, index) => (
                            <TableRow key={customer.email}>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.shippingAddress}</TableCell>
                                <TableCell>{customer.orders.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    }


    componentDidMount() {
        AuthenticationService.fetchAllCustomers()
            .then(response => { this.setState({ customers: response.data }) })
    }
}