import React from "react";
import { useState } from "react";
import style from '../artapp/Login.modules.css';
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import {ip} from "../Host";


function Login(){

    const [values, setValues] = useState({
        login: '',
        haslo:''
    })

    const [user,setUser] = useState([]);


   const handleSubmit = (event) =>{
event.preventDefault();
const r =axios.get(ip + 'users/'+values.login+'/'+values.haslo).then(res => console.log(res) );

console.log(r.data[0].imie);

    }
        return (
            <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>

                <div className='bg-white p-3 rounded w-25 border'>

                    <h2>Zaloguj</h2> 

                    <form onSubmit={handleSubmit} >
                        <div className='mb-3'>
                            <label for="login">Login:</label>
                            <input type="text" name='login' 
                            onChange={e => setValues({...values, login: e.target.value})}
                            className="from-control rounded-0" />
                        </div>

                        <div className='mb-3'>
                            <label for="password">Hasło:</label>
                            <input type="password" name='haslo' 
                            onChange={e => setValues({...values, haslo: e.target.value})}
                            className="from-control rounded-0" />
                        </div>

                        <button type='submit' className='btn btn-success w-100 rounded-0'> Zaloguj</button>
               
                    </form>

                </div>

                
            </div>
        );
    
}

export default Login;