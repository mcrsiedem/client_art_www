import React from "react";
import { useState,createContext,useContext } from "react";

import style from '../artapp/Login.modules.css';
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import {ip} from "../Host";
import TokenContext from "./tokenContext";
import { useCookies } from 'react-cookie';



function Login(){
    const token = useContext(TokenContext);
    const [cookies, setCookie] = useCookies(['']);


    const [values, setValues] = useState({
        login: '',
        haslo:''
    })

 //   axios.defaults.withCredentials= true;
    
    const navigate = useNavigate();


   const handleSubmit = (event) =>{
   
event.preventDefault();
axios.get(ip + 'users/'+values.login+'/'+values.haslo).then(res =>{  
    if(res.data.length > 0){

    //    token.setToken(res.data);
    //    localStorage.setItem('token', res.data)
       setCookie('token', res.data, { path: '/' });



       navigate('/ArtApp');

    }else{
        console.log("Błąd");
    }
   // console.log(res);
    
    }
   
     );





    }
        return (
            <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>

                <div className='bg-white p-3 rounded w-25 border ' >


                    <form onSubmit={handleSubmit} >
                        <div className='mb-3'>
                          
                            <input type="text" name='login' placeholder="Login" 
                            onChange={e => setValues({...values, login: e.target.value})}
                            className="from-control rounded-0" />
                        </div>

                        <div className='mb-3'>
                       
                            <input type="password" name='haslo' placeholder="Hasło"
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