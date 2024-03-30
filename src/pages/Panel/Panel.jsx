import React from "react";
import {  useEffect,useState,useContext  } from "react";
import style from '../Panel/Panel.module.css';
import logoutIcon from 'assets/logout.png'
import userIcon from 'assets/user_m2.svg'
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
                                <img className={style.userIcon } src={userIcon} alt="Procesy" />
                                <p>{DecodeToken(sessionStorage.getItem("token")).imie}  {DecodeToken(sessionStorage.getItem("token")).nazwisko}</p>
                        </div>) : (     <div className={isOnline ? style.user : style.userOffline}> 
                              
                                <p>Offline</p>
                        </div>) }
                   
               { isOnline && (<button className={style.btnWyloguj} onClick={()=>logout()}>Wyloguj</button> )}
               
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