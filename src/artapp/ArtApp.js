import React, { useEffect } from "react";
import style from '../artapp/ArtApp.module.css';
import Header from "./Header/Header";
import Menu from "./Menu";
import Jobs from "./Jobs";
import Searchbar from "./Searchbar";

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
      {/* <Footer giveMeJobs={(maszyna) => giveMeJobs(maszyna)} /> */}

      <footer className={style.footer}>
            <div className={style.lefContener}></div>
            <div className={style.centerContener}>
                          <button className={style.myButton} onClick={() => giveMeJobs("H1")}>
              H1
            </button>
            <button className={style.myButton} onClick={() => giveMeJobs("XL")}>
              XL
            </button>
            <button className={style.myButton} onClick={() => giveMeJobs("H3")}>
              H3
            </button>
            </div>
            <div className={style.rightContener}>
               <Searchbar />
            </div>

            {/* <button className={style.myButton} onClick={()=>{fullScrean()}}>FullScrean</button>
           <button className={style.myButton} onClick={()=>{navigate('/Login')}}>Zaloguj</button> */}
           
          </footer>
    </div>
  );

}
export default ArtApp;