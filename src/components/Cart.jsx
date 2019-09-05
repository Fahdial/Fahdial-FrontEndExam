import React, { Component } from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'

class Cart extends Component {
  state = {
    cart: [],
    checkout: false,
  }

  numberFormat = new Intl.NumberFormat(['ban', 'id'])

  componentDidMount() {
    this.getData()
  }

  checkout = () => {
    if (this.state.checkout) {
      return (
        <div>
          <h3 className="display-4 text-left mt-5">Total</h3>
          <table className="table text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>QTY</th>
              <th>PRICE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
              {this.checkoutList()}
              <tr>
              <th colSpan="4">
                Total
              </th>
              {this.totalPrice()}
              </tr>
          </tbody>
        </table>
        </div>
      )
    }
  }

  totalPrice = () => {
    let total = 0
    let cart = this.state.cart.map(item => {
        return {
            userId: item.userId,
            price: item.price,
            qty: item.qty
        }
    })
    
    for (let i = 0; i < this.state.cart.length; i++) {
        if (cart[i].userId == this.props.id) {
        total += parseInt(cart[i].price * cart[i].qty)
        }
    }
    return <td>Rp. {this.numberFormat.format(total)}</td>
  }

  checkoutList = () => {
    let hasil = this.state.cart.map(item => {
      console.log(item)
      if (item.userId == this.props.id) {
      return (
        <tr key={item.id}>
          <td>{item.idCart}</td>
          <td>{item.name}</td>
          <td>{item.qty}</td>
          <td>Rp. {this.numberFormat.format(item.price)}</td>
          <td>Rp. {this.numberFormat.format(item.qty * parseInt(item.price))}</td>
        </tr>
      
        )
    }})
    return hasil;
  }

  onDeleteClick = (id) => {
    Axios.delete(
        `http://localhost:2018/Cart/${id}`
    ).then(res => this.getData())
  }

  getData = () => {
    Axios.get(`http://localhost:2018/Cart`).then(res => {
      this.setState({ cart: res.data });
    })
  };

  renderList = () => {
    this.state.cart.sort((a,b) => 
    {
      return a.idCart - b.idCart
    })

    let hasil = this.state.cart.map(item => {
      if (item.userId == this.props.id) {
      return (
        <tr key={item.id}>
          <td>{item.idCart}</td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>Rp. {this.numberFormat.format(item.price)}</td>
          <td>{item.qty}</td>
          <td>
            <img style={{ width: "50px" }} src={item.picture} alt={"Gambar"} />
          </td>
          <td>
            <button onClick={() => {this.onDeleteClick(item.id)}} className="btn btn-danger">Delete</button>
          </td>
        </tr>
      )
    }
  })
    return hasil;
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-4 text-left">Cart</h1>
        <table className="table text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>DESC</th>
              <th>PRICE</th>
              <th>QTY</th>
              <th>PICTURE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
        <hr />
        <div className="text-center">
        <button
          onClick={() => {this.setState({ checkout: true })}}
          className="btn btn-outline-primary">
              Checkout
        </button>
      </div>
          {this.checkout()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.id
  }
}

export default connect(mapStateToProps)(Cart)