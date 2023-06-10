import React from "react";
import style from '../artapp/ArtApp.module.css';
import Header from "./Header";
import Menu from "./Menu";
import Jobs from "./Jobs";
import Footer from "./Footer";
import { useState,useRef } from "react";
function ArtApp(props){

  const [maszyna, setMaszyna] = useState("");
  
  function giveMeJobs(maszyna)
  {
    setMaszyna(maszyna);
     console.log(maszyna);
     
 
  }

  const refContainer = useRef();

  
  return(
    <div className={style.gridContainer}>
       <Header/>
       <Jobs  maszyna={maszyna}/>
      
       <Footer giveMeJobs={(maszyna)=>giveMeJobs(maszyna)}/>
    
    </div>
  );
  

}
export default ArtApp;