import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class ProductDetail extends Component {

    state  = {
        product: null
    }

    toIDR = new Intl.NumberFormat(['ban', 'id'])

    addToCart = () => {
        let {id, name, price, picture, description} = this.state.product
        let userId = this.props.id
        let qty = parseInt(this.qty.value)
        
            if (!userId) {
                alert('Silahkan Login terlebih dahulu')
            } else if (qty) {
                axios.get(
                    `http://localhost:2018/Cart`,
                    {
                        params:
                            {
                                name, userId
                            }
                    }
                ).then(res => {
                    let flag = 0
                    console.log(res.data)
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].userId == userId) {
                            flag = 1
                        }
                    }
    
                    if (res.data.length !== 0) {
                        let tambah = res.data[0].qty
                        axios.patch(
                            `http://localhost:2018/Cart/${res.data[0].id}`,
                            {
                                qty: qty + tambah
                            }).then(res => {
                                flag = 1
                                alert(`Quantity telah diupdate menjadi ${qty + tambah}`)
                            })
                    }
    
                    if (flag == 0) {
                        axios.post(
                            `http://localhost:2018/Cart`,
                            {
                                    idCart: id,
                                    userId,
                                    name,
                                    price,
                                    qty,
                                    description,
                                    picture
                            }).then(res => alert('Barang ditambahkan ke dalam cart'))
                
                    }  else {
                        console.log('Tidak menambahkan item baru')
                    }
                } ) 
            } else {
                alert('Masukan angka')
            }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            'http://localhost:2018/products/' + this.props.match.params.id
        ).then((res) => {this.setState({product: res.data})})
    }

    render() {
        if (this.state.product) {
        let {name, price, picture, description} = this.state.product

            return (
                <div className='card col-4 mx-auto'>
                    <div className='card-header mt-2'>
                        <h2 className='text-center'>{name}</h2>
                    </div>
                    <div className='card-body mb-5'>
                        <img className='card-img-top' src={picture} alt='Gambar'/>
                        <h3>{this.state.product.name}</h3>
                        <p className='card-text'>{description}</p>
                        <p>Harga: Rp. {this.toIDR.format(price)}</p>
                    </div>
                    <form><input className='form-control mb-2' type='number' ref={(input) => {this.qty = input}}/></form>
                    <button className='btn btn-Primary mb-2' onClick={this.addToCart}>Add to Cart</button>
                </div>
            )
        } else {
            return <div><h1 className='text-center'>Loading</h1></div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
      id: state.auth.id
    }
}

export default connect(mapStateToProps) (ProductDetail)