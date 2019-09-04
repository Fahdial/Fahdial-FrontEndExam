import React, { Component } from 'react'
import axios from 'axios'

class ProductDetail extends Component {

    state = {
        product: null
    }

    componentDidMount() {
        axios.get(
            `http://localhost:2018/products/${this.props.match.params.id}` 

        ).then(res => {
            // res.data = {id, name, price, description, picture}
            this.setState({product: res.data})

        })
    }
    

    render() {
        // Ketika product bukan null
        if(this.state.product){
            return (
                <div className='card col-5 my-5 mx-auto'>
                    <div className='card-header mt-2'>
                        <h2>{this.state.product.name}</h2>
                    </div>
                    <div className='card-body'>
                        <img className='card-img-top' src={this.state.product.picture}/>
                        <h3>Name: {this.state.product.name}</h3>
                        <p>Description : {this.state.product.description}</p>
                        <p>Harga : Rp.{this.state.product.price}</p>
                    </div>
                    <form><input className='form-control' type='text'/></form>
                    <button className='btn btn-outline-secondary mt-2'>Add To Cart</button>
                </div>
            )
        } else {
            return <div><h1 className='text-center'>Loading</h1></div>
        }
    }
}

export default ProductDetail


// false
// '', 0, null, undefined

/*
- state untuk menyimpan hasil setiap kali ada axious 
- .then kalau data berhasil didapatkan kita taro di state
- this.state state dibuah productnya dari res.data
- kalo ragu coba di console log
*/