import React from 'react'
import Modal from 'react-modal'
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


export default class AdminProductsComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            stockItems: []
        }

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
                    <div align="center" margin>
                        <Button variant="contained" className='add_btn' color="primary">Add new Stock</Button>
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
                                    <TableCell >Stock Qty</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.stockItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>image link here</TableCell>
                                        <TableCell>{item.product.title}</TableCell>
                                        <TableCell>{item.product.manufacturer}</TableCell>
                                        <TableCell>{item.product.price}</TableCell>
                                        <TableCell> {item.product.category}</TableCell>
                                        <TableCell>{item.qtyHeld}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer >

                    <Modal></Modal>
                </Container>
            </div>
        );
    }

    componentDidMount() {
        ProductService.fetchAllStock().then(
            response => {
                this.setState({ stockItems: response.data })
                console.log(response.data)
            }
        )

    }
} 