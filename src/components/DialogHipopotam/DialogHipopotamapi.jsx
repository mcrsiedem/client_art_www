import React, { useState, forwardRef, useImperativeHandle } from "react";
import style from "./DialogHipopotam.module.css"
// import iconOK from "../../assets/ok.svg";
import iconOK from "assets/hip.svg";
import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { SocketContext } from "context/SocketContext";

export default function DialogHipopotamapi()  {


      const {showHipopotamApi, setShowHipopotamApi} = useContext(SocketContext);
  



if(showHipopotamApi){
    return (
    // <div className={ stylowanie.join(' ') } >
    <div className={style.grayScaleBackground} >
    

 <img
      className={style.ok_icon}
      src={iconOK}
      alt="Procesy"
      onClick={()=>{setShowHipopotamApi(false)}}
    /> 
   
      
   
    </div>
  );
}

};

