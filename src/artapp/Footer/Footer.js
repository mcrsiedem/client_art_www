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

  const fullScrean = () => {

    document.querySelector("#grid-container").requestFullscreen()
      .then(function () {
      })
      .catch(function (error) {
        console.log(error.message);
      });

      }
        return (
          <footer className={style.body}>
           <button className={style.myButton} onClick={()=>giveMeJobs('H1')}>H1</button>
           <button className={style.myButton} onClick={()=>giveMeJobs('XL')}>XL</button>
           <button className={style.myButton} onClick={()=>giveMeJobs('H3')}>H3</button>
           <button className={style.myButton} onClick={()=>{fullScrean()}}>FullScrean</button>
           <button className={style.myButton} onClick={()=>{navigate('/Login')}}>Zaloguj</button>
           </footer>
        );
    
}

export default Footer;