import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'

class ProductItem extends Component {

    numberFormat = new Intl.NumberFormat(['ban', 'id'])

    addToCart = () => {
    let {id, name, price, picture, description} = this.props.barang
    let userId = this.props.id
    let qty = parseInt(this.qty.value)
    
        if (!userId) {
            alert('Login terlebih dahulu')
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
                            alert(`Jumlah telah diupdate menjadi ${qty + tambah}`)
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
                        }).then(res => Swal.fire({
                            position: 'center',
                            type: 'success',
                            title: 'Barang berhasil ditambahkan kedalam Cart',
                            showConfirmButton: false,
                            timer: 1500
                          }))
            
                }  else {
                    console.log('Tidak menambahkan item baru')
                }
            } ) 
        } else {
            alert('Masukan jumlah yang ingin dibeli')
        }
    }

    render() {
    let {id, name, price, picture, description} = this.props.barang

        return (
            <div className='card col-lg-5 mx-3 mb-4'>
                <img src={picture} alt="gambar" className='card-img-top mt-2'/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>{description}</p>
                    <p className='card-text'>Rp. {this.numberFormat.format(price)}</p>
                    <input className='form-control' type='number' ref={(input) => {this.qty = input}}/>
                    <Link to={'/productdetail/' + id}>
                        <button className='form-control btn btn-dark my-1'>Detail</button>
                    </Link>
                    <button className='form-control btn btn-primary' onClick={this.addToCart}>Add to Cart</button>
                </div>
            </div>
        )
    }
}

    const mapStateToProps = (state) => {
        return {
          id: state.auth.id
        }
    }

export default connect(mapStateToProps)(ProductItem)