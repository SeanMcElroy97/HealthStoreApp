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

export default class AdminProductsComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            oldStockItems: [],
            stockItems: []
        }

        this.removesIteminList = this.removesIteminList.bind(this)
        this.updateIteminList = this.updateIteminList.bind(this)
        this.postUpdateofStock = this.postUpdateofStock.bind(this)
    }

    styles = {
        root: {
            justifyContent: 'center'
        }
    }

    removesIteminList(index) {
        console.log('hi' + index)
        const stockItemList = Object.assign([], this.state.stockItems);
        stockItemList.splice(index, 1);
        console.log(stockItemList.length)
        this.setState({ stockItems: stockItemList })
    }




    updateIteminList(id, qtyUpdated) {

        const index = this.state.stockItems.findIndex((item) => {
            return item.id == id
        })

        if (qtyUpdated < 1) {
            this.removesIteminList(index)
            return
        }

        const stockItemToBeEdited = Object.assign({}, this.state.stockItems[index])


        stockItemToBeEdited.qtyHeld = qtyUpdated

        const stockItemList = Object.assign([], this.state.stockItems);

        stockItemList[index] = stockItemToBeEdited;

        this.setState({ stockItems: stockItemList })


    }

    priceChange = (id, event) => {


        const index = this.state.stockItems.findIndex((item) => {
            return item.id == id
        })



        const stockItem = Object.assign({}, this.state.stockItems[index])

        //console.log(event.target.value)
        stockItem.product.price = event.target.value

        const stockItemList = Object.assign([], this.state.stockItems);

        stockItemList[index] = stockItem;

        this.setState({ stockItems: stockItemList })


    }

    render() {
        return (
            <div>
                <Container>
                    <div align="center">
                        <Button variant="contained" className='center_btn' style={{ color: '#FF8300' }} onClick={() => this.props.history.push('/adminhomepage')}>Go Home</Button>
                        <Button variant="contained" className='center_btn' color="primary" onClick={() => this.props.history.push('/adminproducts/-1')}>Add new Stock</Button>
                        {this.state.stockItems != this.state.oldStockItems && <Button variant="contained" className='center_btn' color="inherit" onClick={() => this.postUpdateofStock()}>UpdateStock</Button>}
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
                                    <TableCell >Adjust Stock</TableCell>
                                    <TableCell>Delete Item</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.stockItems.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell><img src={item.product.productImageLink} alt="product image" height="150px" width="150px"></img></TableCell>
                                        <TableCell>{item.product.title}</TableCell>
                                        <TableCell>{item.product.manufacturer}</TableCell>
                                        <TableCell><input type="text" defaultValue={item.product.price} style={{ width: "50px" }} onChange={this.priceChange.bind(this, item.id)} /></TableCell>
                                        <TableCell> {item.product.category}</TableCell>
                                        <TableCell>{item.qtyHeld}</TableCell>
                                        <TableCell>
                                            <Grid container direction="column">
                                                <Grid item> <Button onClick={() => this.updateIteminList(item.id, item.qtyHeld + 1)}> <AddIcon style={{ color: '#00D529', fontSize: 40 }} /></Button></Grid>
                                                <Grid item> <Button onClick={() => this.updateIteminList(item.id, item.qtyHeld - 1)}><RemoveIcon style={{ color: '#FF8300', fontSize: 40 }} /> </Button></Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell><Button onClick={() => this.removesIteminList(index)}><DeleteIcon color="secondary" style={{ fontSize: 40 }} /></Button></TableCell>
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
        ProductService.fetchAllStock().then(
            response => {
                this.setState({ stockItems: response.data, oldStockItems: response.data })
                console.log(response.data)
            }
        )

    }

    postUpdateofStock() {
        ProductService.updateProductStock(this.state.stockItems)
            .then(response => window.location.reload())

    }
} 