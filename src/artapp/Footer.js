import React from "react";
import style from '../artapp/Footer.module.css';
import Searchbar from "./Searchbar";

function Footer(props){

    const giveMeJobsXL = () => {
        props.giveMeJobsXL()

      }

      const giveMeJobsSM = () => {
        props.giveMeJobsSM()

      }

        return (
            <footer className={style.body}>
           <button className={style.button} onClick={()=>giveMeJobsSM()}>H1</button>
           <button className={style.button} onClick={()=>giveMeJobsXL()}>XL</button>
           <button className={style.button} onClick={()=>giveMeJobsSM()}>H3</button>
        
            </footer>
        );
    
}

export default Footer;