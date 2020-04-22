import React from 'react'
import AuthenticationService from '../../services/AuthenticationService'

import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RemoveIcon from '@material-ui/icons/Remove';


export default class CustomerShoppingCart extends React.Component {

    constructor(props) {
        super(props)

        this.state = { shoppingCart: [] }
    }

    render() {
        return (
            <Container>
                <div align="center">
                    <Button variant="contained" className='center_btn' style={{ color: '#FF8300' }} onClick={() => this.props.history.push('/homepage')}>Go Home</Button>
                    <Button variant="contained" className='center_btn' style={{ color: '#20B2AA' }} onClick={() => this.props.history.push('/customerproducts')}>View Products</Button>


                    {this.state.shoppingCart.length < 1 && <h1>You have no products in your basket</h1>}

                    <TableContainer >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Image</TableCell>
                                    <TableCell>ProductTitle</TableCell>
                                    <TableCell >Manufacturer</TableCell>
                                    <TableCell >Price</TableCell>
                                    <TableCell >Category</TableCell>
                                    <TableCell >Remove from cart</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.shoppingCart.map((item, index) => (

                                    // item.qtyToAddToBasket = 0,
                                    <TableRow key={item.id}>
                                        <TableCell><img src={item.product.productImageLink} alt="product image" height="150px" width="150px"></img></TableCell>
                                        <TableCell>{item.product.title}</TableCell>
                                        <TableCell>{item.product.manufacturer}</TableCell>
                                        <TableCell>{item.product.price}</TableCell>
                                        <TableCell> {item.product.category}</TableCell>
                                        <TableCell>
                                            <RemoveIcon style={{ color: '#FF8300', fontSize: 40 }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer >
                </div>
            </Container>
        )
    }


    componentDidMount() {
        AuthenticationService.fetchCustomerShoppingBasket()
            .then(response => {
                // this.setState({ shoppingCart: response.data })
                console.log(response.data)
            })
    }

}