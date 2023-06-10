import React from "react";
import { useState } from "react";
import style from '../artapp/Footer.module.css';
import Searchbar from "./Searchbar";

function Footer(props){

  //  const [maszyna,setMaszyna] = useState('test');
    const giveMeJobs = (maszyna) => {
  
        props.giveMeJobs(maszyna)

      }



        return (
            <footer className={style.body}>
           <button className={style.button} onClick={()=>giveMeJobs('H1')}>H1</button>
           <button className={style.button} onClick={()=>giveMeJobs('XL')}>XL</button>
           <button className={style.button} onClick={()=>giveMeJobs('H3')}>H3</button>
        
            </footer>
        );
    
}

export default Footer;