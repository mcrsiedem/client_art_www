import React, { useEffect } from "react";
import style from '../artapp/ArtApp.module.css';
import Header from "./Header/Header";
import Menu from "./Menu";
import Jobs from "./Jobs";
import Footer from "./Footer/Footer";
import { useState, useRef,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import TokenContext from "./tokenContext";
import { ip } from "../Host";

import axios from "axios";

import { useCookies } from "react-cookie";

function ArtApp(props) {
  const [cookies, setCookie] = useCookies();

  const [maszyna, setMaszyna] = useState("");
  const ChildRef = useRef();
  const navigate = useNavigate();
  const tokenContext = useContext(TokenContext);

  function giveMeJobs(maszyna) {
    setMaszyna(maszyna);
    ChildRef.current.callChildFunction(maszyna);
  }

  const refContainer = useRef();


  // const token_z_contextu = tokenContext.token;
  // const token_z_localStorge = localStorage.getItem('token');
  // const token_z_cookie = Cookies.get('token');


  useEffect(()=>{
   // console.log("Token z cookies 2: " + cookies.token);
  //  console.log("Token z contextu: " + tokenContext.token);
 // axios.get(ip + '/veryfiy/'+ tokenContext.token).
  //  axios.get(ip + '/islogged/'+ localStorage.getItem('token')).
    axios.get(ip + '/islogged/'+ cookies.token).
    then(res=> {
      if(res.data.Status === "Success"){

      } else{
    
        navigate('/Login')

      }
    })
  },[])



  return (
    <div id='grid-container' className={style.gridContainer}>
      
      <Jobs ref={ChildRef} maszyna={maszyna} />
      <Footer giveMeJobs={(maszyna) => giveMeJobs(maszyna)} />
    </div>
  );

}
export default ArtApp;