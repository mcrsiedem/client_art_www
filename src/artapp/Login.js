import React from "react";
import { useState,redirect } from "react";

import style from '../artapp/Login.modules.css';
//import { useNavigate } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {ip} from "../Host";


function Login(){

    const [values, setValues] = useState({
        login: '',
        haslo:''
    })

    const [user,setUser] = useState([]);
  //  const navigate = useNavigate();
 const history = useHistory()

   const handleSubmit = (event) =>{
   
event.preventDefault();
axios.get(ip + 'users/'+values.login+'/'+values.haslo).then(res =>{  
    if(res.data.length > 0){
       setUser(res.data[0]);  
       console.log("Zalogowano");
     //  navigate('/xl');
     history.push('/ArtApp')
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