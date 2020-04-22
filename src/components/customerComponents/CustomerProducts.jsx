import React from 'react'
import ProductService from "../../services/ProductService"
import AuthenticationService from "../../services/AuthenticationService"

import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default class CustomerProducts extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            stockItems: [],
            cartItems: []

        }

        this.updateCart = this.updateCart.bind(this)
    }

    styles = {
        root: {
            justifyContent: 'center'
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <div align="center">
                        <Button variant="contained" className='center_btn' style={{ color: '#FF8300' }} onClick={() => this.props.history.push('/homepage')}>Go Home</Button>
                        <Button variant="contained" className='center_btn' style={{ color: '#20B2AA' }} onClick={() => this.props.history.push('/customershoppingcart')}>Go to Shopping Cart <ShoppingCartIcon color="primary" style={{ fontSize: 20 }} /></Button>
                    </div>
                    <TableContainer >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Image</TableCell>
                                    <TableCell >ProductTitle</TableCell>
                                    <TableCell >Manufacturer</TableCell>
                                    <TableCell >Price</TableCell>
                                    <TableCell >Category</TableCell>
                                    <TableCell >Add to cart</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.stockItems.map((item, index) => (

                                    // item.qtyToAddToBasket = 0,
                                    <TableRow key={item.id}>
                                        <TableCell><img src={item.product.productImageLink} alt="product image" height="150px" width="150px"></img></TableCell>
                                        <TableCell>{item.product.title}</TableCell>
                                        <TableCell>{item.product.manufacturer}</TableCell>
                                        <TableCell>{item.product.price}</TableCell>
                                        <TableCell> {item.product.category}</TableCell>
                                        <TableCell>
                                            <Grid container direction="column">
                                                <Grid item> <Button onClick={() => this.updateCart(index, 1)}> <AddIcon style={{ color: '#00D529', fontSize: 40 }} /></Button></Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer >
                </Container>
            </div >
        );
    }

    componentDidMount() {
        ProductService.fetchAllProductsAvailable().then(
            response => {
                this.setState({ stockItems: response.data })
                console.log(response.data)
            }
        )

    }

    updateCart(index, qtyAddedToBasket) {


        let StockItem = this.state.stockItems[index]
        let product = Object.assign({}, StockItem.product)
        // // let productName = this.state.stockItems[stockItemID].product.title
        // console.log(product.id + " : " + product.title + ' : ' + qtyAddedToBasket)





        let Customer = {}

        AuthenticationService.findCustomerByID()
            .then(response => Customer = response.data)

        AuthenticationService.addItemToCart(product, qtyAddedToBasket, Customer)


        // }

    }
} 