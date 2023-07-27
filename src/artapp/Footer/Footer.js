import React from "react";
import { useState,useContext} from "react";
import style from './Footer.module.css';
import Searchbar from "../Searchbar";
import TokenContext from "../tokenContext";
import { useNavigate } from 'react-router-dom';

function Footer(props){
  const token = useContext(TokenContext);
  const navigate = useNavigate();


  //  const [maszyna,setMaszyna] = useState('test');
    const giveMeJobs = (maszyna) => {
  
        props.giveMeJobs(maszyna)

      }
        return (
          <footer className={style.body}>
           <button className={style.button} onClick={()=>giveMeJobs('H1')}>H1</button>
           <button className={style.button} onClick={()=>giveMeJobs('XL')}>XL</button>
           <button className={style.button} onClick={()=>giveMeJobs('H3')}>H3</button>
           <button className={style.button} onClick={()=>{console.log(token.token)}}>OK</button>
           <button className={style.button} onClick={()=>{navigate('/Login')}}>Zaloguj</button>
           </footer>
        );
    
}

export default Footer;