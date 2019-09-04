import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'

import {onLoginUser} from '../actions/index'

class Login extends Component {

    onLoginClick = () => {
                
        // Mengambil data dari textbox
        let username = this.username.value
        let password = this.password.value

        // Memanggil Action Creator 'onLoginUser'
        this.props.onLoginUser(username, password)

        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 1500
          })
    }
    

    render() {
        // jika user belum login
        if(!this.props.user_name){
            return (
                <div>
                    <div className='col-sm-4 mx-auto card mt-5'>
                        <div className='card-body'>
    
                            <div className="card-title border-bottom border-secondary">
                                <h1>Login</h1>
                            </div>
                            
                            <form className='form-group'>
                                <div className="card-title ">
                                    <h4>Username</h4>
                                </div>
                                <input ref={(input) => {this.username = input}} type='text' className='form-control'/>
    
                                <div className="card-title ">
                                    <h4>Password</h4>
                                </div>
                                <input ref={(input) => {this.password = input}} type='password' className='form-control'/>
    
                            </form>
    
                            <button 
                                className="btn-block btn btn-outline-primary mt-2"
                                onClick={this.onLoginClick}
                            >Login</button>
                            
                        </div>
                    </div>
                </div>
            )
        } else {
            // jika sudah login, akan di arahkan ke halaman 'home'
            return <Redirect to='/'/>
        }
    }
}

// function yg akan mengambil data di redux state
const mapStateToProps = state => {
    return {
        user_name :state.auth.username
    }
}

export default connect(mapStateToProps,{onLoginUser})(Login)

// JSON.stringify akan mengubah bentuk object menjadi string

/*
- ada 2 function yaitu onLogin user dan in login click
- on login click untuk mendapatkan datan usernya
- onlogin user untuk membaawa datanya ke reducers

- line 33 jadi props karena dia ingin di konek

*/