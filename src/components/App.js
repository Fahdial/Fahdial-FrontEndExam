import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import {connect} from  'react-redux'

import Register from './Register'
import Login from './Login'
import Home from './Home'
import Header from './Header'
import ManageProducts from './ManageProducts'
import ProductDetail from './ProductDetail'
import Cart from './Cart'


// Action Creator
const keepLogin = (objUser) => {
    
    // Action
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            username: objUser.username
        }
    }
}

class App extends Component {

    state = {
        check: false
    }

    componentDidMount() {
        // check local storage
        let userStorage = JSON.parse(localStorage.getItem('userData'))
        
        if(userStorage){
            // kirim ke redux
            this.props.keepLogin(userStorage)
        }

        this.setState({check: true})
    }
    

    render() {
        if(this.state.check){
            return (
                <BrowserRouter>
                    <Header/>
                    <Route path='/' exact component={Home}/>
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/manageproducts' component={ManageProducts} />
                    <Route path='/productdetail/:id' component={ProductDetail}/>
                    <Route path="/cart" component={Cart}/>
                </BrowserRouter>
            )
        } else {
            return <div><h1 className='text-center'>Loading</h1></div>
        }
    }
}

export default connect(null,{keepLogin})(App)

// cara mengeluarkan nilai dari suatu function adalah dengan return

// tampilang mobile dibikin 9 9
// line 58. apakah product name yang di lower mengandung input yang di lower
// hasil filter dari line 59 akan tersimpan dalam hasil filter kalau dia true, kalau false dibuang. maka akan muncul pada search product