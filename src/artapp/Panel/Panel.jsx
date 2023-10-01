import React from "react";
import {  useEffect } from "react";
import style from '../Panel/Panel.module.css';
import { useNavigate } from "react-router-dom";

function Panel(){
        const navigate = useNavigate();

    useEffect(() => {
        document.getElementById("header").style.display = "none";
      }, []);



    return(<>

    <div id="container" className={style.container} >

            <div className={style.row}>
                    <div className={style.kafle} onClick={() => { navigate("/Zamowienia") }}>Zamówienia</div>
                    <div className={style.kafle} >Zlecenia</div>
                    <div className={style.kafle} >CTP</div>
                    
            </div>

            <div className={style.row}>
                    <div className={style.kafle} onClick={() => { navigate("/Print") }} >Druk</div> 
                    <div className={style.kafle} >Falcowanie</div>
                    <div className={style.kafle} >Oprawa</div>
                 
            </div>

            <div className={style.row}>
                    <div className={style.kafle} >Uszlachetnianie</div>
                    <div className={style.kafle} >Magazyn</div>
                    <div className={style.kafle} >Info</div>
                    
            </div>
    
    </div>
    
    </>);
}

export default Panel;