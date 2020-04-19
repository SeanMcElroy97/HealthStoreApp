import React from 'react'

export default class AdminProductComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            productTitle: '',
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
        console.log(event.target.files[0])
    }

    render() {
        return <div>
            Product Title: <input type="text" name="title" defaultValue={this.state.productTitle} onChange={this.handleInputChange} />
            Manufacturer: <input type="text" name="manufacturer" defaultValue={this.state.manufacturer} onChange={this.handleInputChange} />
            Price: <input type="number" name="price" defaultValue={this.state.price} onChange={this.handleInputChange} />
            Category: <input type="text" name="category" defaultValue={this.state.category} onChange={this.handleInputChange} />
            Quantity: <input type="number" name="qtyHeld" defaultValue={this.state.qtyHeld} onChange={this.handleInputChange} />
            Image: <input type="file" onChange={this.handleImageFileSelected} />
        </div>
    }


    componentDidMount() {
        if (this.state.id != -1) {
            // make api request to retrieve stockItem
        }
    }
}