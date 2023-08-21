import React, { useEffect } from "react";
import style from '../Print/Print.module.css';

import Jobs from "./Jobs";


import { useState, useRef,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import TokenContext from "../tokenContext";
import { ip } from "../../Host";

import axios from "axios";

import { useCookies } from "react-cookie";

function Print(props) {
  const [cookies, setCookie] = useCookies();

  const [maszyna, setMaszyna] = useState("");
  const ChildRef = useRef();
  const navigate = useNavigate();
  const tokenContext = useContext(TokenContext);

  function giveMeJobs(maszyna) {
    setMaszyna(maszyna);
    ChildRef.current.callChildFunction(maszyna);
  }




  // const token_z_contextu = tokenContext.token;
  // const token_z_localStorge = localStorage.getItem('token');
  // const token_z_cookie = Cookies.get('token');


  useEffect(()=>{
    
   // console.log("Token z cookies 2: " + cookies.token);
   console.log("Token z contextu: " + tokenContext.token);
 // axios.get(ip + '/veryfiy/'+ tokenContext.token).
  //  axios.get(ip + '/islogged/'+ localStorage.getItem('token')).
    axios.get(ip + '/islogged/'+ cookies.token)
    .then(res=> {
      if(res.data.Status === "Success"){

      } else{
    
        navigate('/Login')

      }
    })
  },[])



  return (
    <div id="grid-container" className={style.gridContainer}>
      <Jobs ref={ChildRef} maszyna={maszyna} />

      <footer className={style.footer}>
        <div className={style.lefContener}></div>
        <div className={style.centerContener}>
          <button className={style.myButton} onClick={() => giveMeJobs("H1")}>H1</button>
          <button className={style.myButton} onClick={() => giveMeJobs("XL")}>XL</button>
          <button className={style.myButton} onClick={() => giveMeJobs("H3")}>H3</button>
        </div>
        <div className={style.rightContener}>
          <div>
            <input
              className={style.search}
              type="tekst"
              placeholder="Szukaj..."
            />
          </div>
        </div>
      </footer>
    </div>
  );

}
export default Print;