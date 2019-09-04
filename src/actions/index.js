// Action creator
// A.C = function biasa yang dia terhubung dengan reducer melalui connect
// Harus return object yang memiliki property 'type'

import axios from 'axios'
import Swal from 'sweetalert2'

export const onLoginUser = (USERNAME, PASSWORD) => {
    
    return (dispatch) => {
        // Cek di database untuk ketersediaan data username dan password
    axios.get(
        'http://localhost:2018/users',
        {
            params: {
                username: USERNAME,
                password: PASSWORD
            }
        }
    ).then((res) => {
        // Periksa apakah terdapat respon berupa user yang ditemukan
        if(res.data.length === 0){
            console.log('User tidak ditemukan')
            // Swal.fire({
            //     position: 'center',
            //     type: 'error',
            //     title: 'User tidak ditemukan',
            //     showConfirmButton: false,
            //     timer: 1500
            //   })

        } else {
            let {id, username} = res.data[0]
        
            // Menyimpan data di local storage
            localStorage.setItem(
                'userData',
                JSON.stringify({id, username})
            )

            // Meyimpan / mengirim data di redux state
            dispatch(
                {
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        id, username
                    }
                }
            )

        }
    })
    }

}



export const onLogoutUser = () => {
    // Menghapus data di local storage
    localStorage.removeItem('userData')

    // Menghapus data di redux, tidak memerlukan payload
    return {
        type: 'LOGOUT_SUCCESS'
    }
}












/*
kenapa export tanpa default?
- ketika memakai default maka pada saaat di import tidak perlu memakai kurung kurawal
- ketika tanpa default, maka pakai kurung kurawal pada saat import

HANYA ADA SATU 'export default' DALAM SATU FILE

urutan Action Creaator:
 - export
 - diterima atau import di header
 - hubungakan dia dengan reducer dengan meggunakan connect ( harus ada disebelah kanan dan dikurung dalma sebuah objek)
 


*/