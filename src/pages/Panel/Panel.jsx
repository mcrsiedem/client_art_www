import React from "react";
import {  useEffect,useState,useContext  } from "react";
import style from '../Panel/Panel.module.css';
import logoutIcon from 'assets/logout.png'
import userOnline from 'assets/user_offline.svg'
import userOffline from 'assets/user_offline.svg'

import DecodeToken from "pages/Login/DecodeToken";
import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "hooks/useOnlieStatus";

function Panel({user,setUser}){
        const navigate = useNavigate();
        const isOnline = useOnlineStatus();
    useEffect(() => {
        // document.getElementById("header").style.display = "none";
      }, []);

      const logout = () => {
        navigate("/Login") 
        sessionStorage.removeItem("token")
      }

    return(<>

        <div className={style.main}>
                <div className={style.header}>

                   {isOnline ? (     <div className={style.user}> 
                                <img className={style.userIcon } src={userOnline} alt="Procesy" />
                                <p className={style.imie }>{DecodeToken(sessionStorage.getItem("token")).imie} {DecodeToken(sessionStorage.getItem("token")).nazwisko}</p>
                        </div>) : (     <div className={style.user}> 
                                <img className={style.userIcon } src={userOffline} alt="Procesy" />
                                <p>{DecodeToken(sessionStorage.getItem("token")).imie} {DecodeToken(sessionStorage.getItem("token")).nazwisko}</p>
                        </div>) }
                   
               { isOnline && (<button className={style.btnWyloguj} onClick={()=>logout()}>Wyloguj</button> )}
               
                </div>
                        <div className={style.kafleContainer} >

                                        <div className={style.kafle} onClick={() => { navigate("/Zamowienia") }}>ZAMÓWIENIA</div>
                                        <div className={style.kafle}  onClick={() => { navigate("/Technologie") } }>TECHNOLOGIE</div>
                                        <div className={style.kafle} onClick={() => { navigate("/ProcesyView") }} >PROCESY </div> 
                                        <div className={style.kafle} >CTP</div>
                                        {/* <div className={style.kafle} >Falcowanie</div>
                                        <div className={style.kafle} >Oprawa</div>
                                        <div className={style.kafle} >Uszlachetnianie</div> */}
                                        <div className={style.kafle} > MAGAZYN</div>
                                        {/* <div className={style.kafle} onClick={() => { navigate("/info") }}>Info</div> */}
                                        <div className={style.kafle} >USTAWIENIA</div>
                                        <div className={style.kafle} >HISTORIA</div>
                                        {/* <div className={style.kafle} ></div> */}
                                        
              
                        
                        </div>


        
                        
    
        </div>
    </>);
}

export default Panel;