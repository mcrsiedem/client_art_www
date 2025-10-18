import React, { useState, forwardRef, useImperativeHandle } from "react";
import style from "./DialogHipopotam.module.css"
// import iconOK from "../../assets/ok.svg";
import iconOK from "assets/hip.svg";

export default function DialogHipopotam({dialogBox})  {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showOK, setShowOK] = useState(false);

  const stylowanie = [style.grayScaleBackground]
  useImperativeHandle(dialogBox, () => ({
    show() {
      setShowSnackbar(true);
    },
    hide(){
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
    showOK() {
      setShowOK(true);
    }

  }));
if(showSnackbar){
    return (
    // <div className={ stylowanie.join(' ') } >
    <div className={style.grayScaleBackground} >
    

 <img
      className={style.ok_icon}
      src={iconOK}
      alt="Procesy"
    /> 
   
      
   
    </div>
  );
}

};

