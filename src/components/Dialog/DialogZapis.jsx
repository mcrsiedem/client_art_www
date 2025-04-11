import React, { useState, forwardRef, useImperativeHandle } from "react";
import style from "../Dialog/DialogZapis.module.css"
import iconOK from "../../assets/ok.svg";

export default function DialogZapis({dialogBox})  {
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
      }, 2000);
    },
    showOK() {
      setShowOK(true);
    }

  }));
if(showSnackbar){
    return (
    // <div className={ stylowanie.join(' ') } >
    <div className={style.grayScaleBackground} >
    <div className={style.window} >

    <p className={style.title}>Zapis zamówienia...</p>
    {showOK ?  <img
      className={style.ok_icon}
      src={iconOK}
      alt="Procesy"
    /> : <></>}
   
      
    </div>
    </div>
  );
}

};

