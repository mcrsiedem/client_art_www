import React from "react";
import {  useEffect,useState,useContext  } from "react";
import style from '../Panel/Panel.module.css';
import logoutIcon from 'assets/logout.png'
import userOnline from 'assets/user_offline.svg'
import userOffline from 'assets/user_offline.svg'
import iconZamowienia from 'assets/iconZamowienia.svg'
import iconTechnolgie from 'assets/iconTechnologie.svg'
import iconHistoria from 'assets/iconHistoria.svg'
import iconUstawienia from 'assets/iconUstawienia.svg'
import iconMagazyn from 'assets/iconMagazyn.svg'
import iconCTP from 'assets/iconCTP.svg'
import iconProcesy from 'assets/iconProcesy.svg'
import iconLock from 'assets/iconLock.svg'
import iconKalendarz from 'assets/iconKalendarz.svg'

import DecodeToken from "pages/Login/DecodeToken";
import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "hooks/useOnlieStatus";

function Panel({user,setUser}){
        const navigate = useNavigate();
        const isOnline = useOnlineStatus();
    useEffect(() => {
        window.onbeforeunload = function() { alert("STOP") };
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
                            
                            
                                        <div className={style.kafle} onClick={() => { navigate("/Zamowienia") }}>
                                        <img className={style.icon } src={iconZamowienia} alt="Zamówienia" />
                                              <p>ZAMÓWIENIA</p>  
                                                </div>

             
                                        <div className={style.kafle}  onClick={() => { navigate("/Technologie") } }><img className={style.icon } src={iconTechnolgie} alt="Technologie" /><p>TECHNOLOGIE</p></div>
                                        <div className={style.kafle} onClick={() => { navigate("/ProcesyView") }} ><img className={style.icon } src={iconProcesy} alt="Zamówienia" /><p>PROCESY</p> </div> 
                                        <div className={style.kafle} ><img className={style.icon } src={iconCTP} alt="CTP" /> <p>CTP</p></div>
                                        <div className={style.kafle} ><img className={style.icon } src={iconMagazyn} alt="Magazyn" /><p>MAGAZYN</p> </div>
                                        <div className={style.kafle} ><img className={style.icon } src={iconKalendarz} alt="Ustawienia" /><p>KALENDARZ</p><img className={style.iconLock } src={iconLock} alt="Zamówienia" /></div>
                                        <div className={style.kafle} ><img className={style.icon } src={iconUstawienia} alt="Ustawienia" /><p>USTAWIENIA</p></div>
                                        <div className={style.kafle} ><img className={style.icon } src={iconHistoria} alt="Zamówienia" /><p>HISTORIA</p><img className={style.iconLock } src={iconLock} alt="Zamówienia" /></div>
                                        {/* <div className={style.kafle} ></div> */}
                                        
              
                        
                        </div>


        
                        
    
        </div>
    </>);
}

export default Panel;