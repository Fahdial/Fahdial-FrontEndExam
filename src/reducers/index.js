import {combineReducers} from 'redux'


const init = {
    id: '',
    username: ''
}

const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            // Akan menyalin property di state untuk kemudian di ubah 'id' dan 'username'
            return {...state,id: action.payload.id, username: action.payload.username }

            // Hilangkan id dan username
        case 'LOGOUT_SUCCESS':
            return {...state,id: '', username: '' }

        default:
            return state
    }
}

const reducers = combineReducers(
    {
        auth: AuthReducer
    }
)

export default reducers







// Pertama kali app running, reducer akan menjalankan kode yang ada di 'default'
// pada default kita akan return 'state' yang berisi object 'init' sebagai data awal


// urutan di line 3 harus (state - action)
// state harus memiliki data awal
// Pertama kali running reducer apa yang ada didalam default, dan didalam default harus mereturn,
// makan akan mereturn stat yaitu init sebagai data awal
// untuk menciptakan lacinya kita menggunakan sebuah tools combineReducer
// agar bisa mengaksese dia kita harus mengexport dia line 28