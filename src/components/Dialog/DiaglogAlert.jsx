import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import style from "./DialogAlert.module.css"
import iconOK from "assets/error.svg"
import iconH from "assets/hip.svg"
import axios from "axios";

import { IP } from "utils/Host";
export default function DiaglogAlert()  {
  const [show, setShow] = useState(false);
 const res= null
  useEffect(  () => {

const fetchData = async () => {
    try {
      const res = await axios.get( IP + "sprawdzNiezamknieteKoszty/" + sessionStorage.getItem("token"));
      res.data[0].ile ==0 ?  setShow(false) :  setShow(true)
      // console.log(res.data[0].ile);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    }
  };

  fetchData();

  }, []);


if(show){
    return (

    <div className={style.grayScaleBackground} >
    <div className={style.window} >

 <img
      className={style.ok_icon}
      src={iconH}
      alt="Procesy"
    /> 
    <p className={style.title}>Prośba o zamknięcie kosztów dodatkowych w oddanych zamówieniach...</p>
   
      
    </div>
    </div>
  );
}

};

