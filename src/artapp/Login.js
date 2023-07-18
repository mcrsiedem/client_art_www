import React from "react";
import { useState } from "react";
import style from '../artapp/Login.modules.css';
import 'bootstrap/dist/css/bootstrap.css'


function Login(){


        return (
            <div className='d-flex justify-content-center align-items-center vh-100'>

                <div className='bg-white p-3 rounded w-25 border'>

                    <h2>Zaloguj</h2>

                    <form>
                        <div className='mb-3'>
                            <label for="login">Login:</label>
                            <input type="text" name='login' className="from-control rounded-0" />
                        </div>

                        <div className='mb-3'>
                            <label for="password">Hasło:</label>
                            <input type="password" name='haslo' className="from-control rounded-0" />
                        </div>

                        <button type='submit' className='btn btn-success w-100 rounded-0'> Zaloguj</button>
               
                    </form>

                </div>

                
            </div>
        );
    
}

export default Login;