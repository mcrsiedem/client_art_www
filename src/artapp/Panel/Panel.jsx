import React from "react";
import {  useEffect } from "react";
import style from '../Panel/Panel.module.css';

function Panel(){

    useEffect(() => {
        document.getElementById("header").style.display = "none";
      }, []);


    return(<>

    <div id="container" className={style.container} >

            <div className={style.row}>
                    <div className={style.kafle} >Zamówienia</div>
                    <div className={style.kafle} >Zlecenia</div>
                    <div className={style.kafle} >Druk</div>
                    
            </div>

            <div className={style.row}>
                    <div className={style.kafle} >CTP</div> 
                    <div className={style.kafle} >Falcowanie</div>
                    <div className={style.kafle} >Oprawa</div>
                 
            </div>

            <div className={style.row}>
                    <div className={style.kafle} >Info</div>
                    <div className={style.kafle} >Uszlachetnianie</div>
                    <div className={style.kafle} >Magazyn</div>
                    
            </div>
    
    </div>
    
    </>);
}

export default Panel;