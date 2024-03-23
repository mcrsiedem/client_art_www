import React from "react";
import {  useEffect,useState,useContext  } from "react";
import style from '../Panel/Panel.module.css';
import logoutIcon from 'assets/logout.png'
import { useNavigate } from "react-router-dom";

function Panel({user,setUser}){
        const navigate = useNavigate();
   
    useEffect(() => {
        // document.getElementById("header").style.display = "none";
      }, []);

      const logout = () => {
        navigate("/Login") 
        sessionStorage.setItem("token", "logout")
      }

    return(<>

        <div className={style.main}>
                <div className={style.header}>
                <p>Maciej Romiszewski</p>
                <button className={style.btnWyloguj} onClick={()=>logout()}>Wyloguj</button>
                </div>
                        <div className={style.kafleContainer} >

                                <div className={style.row}>
                                        <div className={style.kafle} onClick={() => { navigate("/Zamowienia") }}>Zamówienia</div>
                                        <div className={style.kafle}  onClick={() => { navigate("/Technologie") } }>Zlecenia</div>
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
                                        <div className={style.kafle} onClick={() => { navigate("/info") }}>Info</div>
                                        
                                </div>
                        
                        </div>
    
        </div>
    </>);
}

export default Panel;