import React, { Component } from 'react'
import axios from 'axios'

import Swal from 'sweetalert2'

class Register extends Component {

    state = {
        loading: false,
        error: '',
        success: ''
    }

    onRegisterClick = () => {
        this.setState({loading: true})

        // Ambil semua data dari text input
        let data_username = this.username.value
        let data_email = this.email.value
        let data_password = this.password.value

        // Check apa username sudah terpakai
        axios.get(
            'http://localhost:2018/users',
            {
                params: {
                    username: data_username
                }
            }
        ).then( (res) => {

            // Jika data di temukan berdasarkan username
            if(res.data.length > 0){

                // spinner akan jadi button, akan muncul pesan 'error
                this.setState({loading: false, error:'Username sudah digunakan'})

                // Menghapus pesan error setelah 3 detik
                setTimeout(
                    () => { this.setState({error: ''}) },
                    3000
                )


            } else {
                // Check apakah email sudah digunakan
                axios.get(
                    'http://localhost:2018/users',
                    {
                        params: {
                            email: data_email
                        }
                    }
                ).then( (res) => {

                    // Jika data ditemukan berdasarkan email
                    if(res.data.length > 0){
                        
                        // spinner jadi button, muncul pesan 'error'
                        this.setState({loading: false, error:'Email sudah digunakan'})
                    
                        // Menghapus pesan error setelah 3 detik
                        setTimeout(
                            () => { this.setState({error: ''})},
                            3000
                        )
                    
                    } else {
                        // POST DATA BARU
                        axios.post(
                            'http://localhost:2018/users',
                            {
                                username: data_username,
                                email: data_email,
                                password: data_password
                            }
                        ).then(() => {
                            
                            // spinner jadi button, muncul pesan 'success'
                            this.setState({loading: false, success:'Register berhasil'})
                        
                            // Menghapus pesan error setelah 3 detik
                            setTimeout(
                                () => { this.setState({error: ''})},
                                3000
                            )
                            
                        
                        })

                    }

                } )

            }

        } )

    }

    loadingButton = () => {
        if(this.state.loading){
            return (
                <div className='spinner-grow' role='status'>
                    <span className='sr-only'></span>
                </div>
            )

        }

        return (
            <button 
                className='btn-block btn btn-outline-primary mt-2'
                onClick={this.onRegisterClick}
            >Register</button>
        )

    }

    notification = () => {
        if(this.state.error){
            // notif error, danger
            return (
                <div className='alert alert-danger mt-4'>
                    {this.state.error}
                </div>
            )

        } else if(this.state.success){
            // notif success, success
            return (
                <div className='alert alert-success mt-4'>
                    {this.state.success}
                </div>
            )

        } else {
            return null
        }
    }

    render() {
        return (
            <div>
                <div className='col-sm-4 mx-auto card mt-5'>
                    <div className='card-body'>

                        <div className="card-title border-bottom border-secondary">
                            <h1>Register</h1>
                        </div>
                        
                        <form className='form-group'>
                            <div className="card-title ">
                                <h4>Username</h4>
                            </div>
                            <input ref={(input) => {this.username = input}} type='text' className='form-control'/>

                            <div className="card-title ">
                                <h4>Email</h4>
                            </div>
                            <input ref={(input) => {this.email = input}} type='text' className='form-control'/>

                            <div className="card-title ">
                                <h4>Password</h4>
                            </div>
                            <input ref={(input) => {this.password = input}} type='password' className='form-control'/>

                        </form>
                        
                        <div className='d-flex justify-content-center'>
                            {this.loadingButton()}
                        </div>

                        {this.notification()}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Register