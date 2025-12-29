import React, { useState, forwardRef, useImperativeHandle, useEffect, useContext } from "react";
import style from "./DialogAlert.module.css"
import iconOK from "assets/error.svg"
import iconH from "assets/hip.svg"
import axios from "axios";

import { IP } from "utils/Host";
import { AppContext } from "context/AppContext";
import { useZamowienia } from "hooks/useZamowienia";
export default function DiaglogAlert()  {
  const [show, setShow] = useState(false);
    const contextApp = useContext(AppContext);
    const sortowanieZamowieniaEtap= contextApp.sortowanieZamowieniaEtap;
    const setSortowanieZamowieniaEtap= contextApp.setSortowanieZamowieniaEtap;
      const zestawZamowienia= contextApp.zestawZamowienia;
       const setIsLoading= contextApp.setIsLoading;
       const {refreshZamowienia} = useZamowienia();
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
    <div 
    onClick={()=>{
                    const promiseA = new Promise((resolve, reject) => {
            setIsLoading(true)
            setSortowanieZamowieniaEtap("Oddane")
            zestawZamowienia.current= "Oddane"
  
                      resolve(777);
                    })

                            promiseA.then(res => {

          refreshZamowienia();
        })
     }}
    className={style.window} >

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

