import React from 'react'
import Button from '@material-ui/core/Button';
import { storage } from 'firebase'
import ProductService from '../../services/ProductService';

export default class AdminProductComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            title: '',
            manufacturer: '',
            price: 0,
            category: '',
            selectedImageFile: '',
            productImageLink: '',
            qtyHeld: 1
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleImageFileSelected = this.handleImageFileSelected.bind(this)

    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleImageFileSelected(event) {
        this.setState({ selectedImageFile: event.target.files[0] })
    }

    //Firebase
    handleUpload = () => {

        console.log('handleUpload clicked' + this.state.selectedImageFile)
        if (this.state.selectedImageFile == '') {
            this.saveStockItem()
        } else {
            const { selectedImageFile } = this.state;
            const uploadTask = storage().ref(`images/${selectedImageFile.name}`).put(selectedImageFile)
            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => { console.log(error) },
                () => {
                    storage().ref('/images').child(`${selectedImageFile.name}`).getDownloadURL().then(url => {
                        this.setState({ productImageLink: url })
                        this.saveStockItem()
                    })
                });
        }
    }

    saveStockItem = () => {
        ProductService.addProductToStock(this.state.title, this.state.manufacturer, this.state.price, this.state.category, this.state.productImageLink, this.state.qtyHeld)
            .then(
                response => this.props.history.push('/adminproducts')
            )
    }

    render() {
        return <div>
            Product Title: <input type="text" name="title" defaultValue={this.state.title} onChange={this.handleInputChange} />
            Manufacturer: <input type="text" name="manufacturer" defaultValue={this.state.manufacturer} onChange={this.handleInputChange} />
            Price: <input type="number" name="price" defaultValue={this.state.price} onChange={this.handleInputChange} />
            Category: <input type="text" name="category" defaultValue={this.state.category} onChange={this.handleInputChange} />
            Quantity: <input type="number" name="qtyHeld" defaultValue={this.state.qtyHeld} onChange={this.handleInputChange} />
            Image: <input type="file" onChange={this.handleImageFileSelected} />

            <br />
            <div align="center">
                <Button variant="contained" color="primary" onClick={() => this.handleUpload()}>Create new Product</Button>
            </div>
        </div>
    }


    componentDidMount() {
        if (this.state.id != -1) {
            // make api request to retrieve stockItem
        }
    }
}