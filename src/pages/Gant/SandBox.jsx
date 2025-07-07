import React, { useRef } from "react";
import {  useEffect,useState,useContext  } from "react";
import style from './SandBox.module.css';
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
import { AppContext } from "context/AppContext";
import { getNadkomplety } from "actions/getNadkomplety";
import { getClients } from "actions/getClients";
import DraggableResizableDiv from "./DraggableResizableDiv";


export default function SandBox({ user, setUser }) {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const appcontext = useContext(AppContext);
  const setNadkomplety = appcontext.setNadkomplety;
  const setClients = appcontext.setClients;
  const setClientsWyszukiwarka = appcontext.setClientsWyszukiwarka;

  useEffect(() => {
    // window.onbeforeunload = function () {
    //   alert("STOP");
    // };
    
    getNadkomplety(setNadkomplety)
    getClients(setClients,setClientsWyszukiwarka )

  }, []);

  const logout = () => {
    navigate("/Login");
    sessionStorage.removeItem("token");
  };

  if (window.innerWidth > 900) {
    return (
      <>
        <PanelDesktop isOnline={isOnline} navigate={navigate} logout={logout} />
      </>
    );
  } else
    return (
      <>
        
      </>
    );
}






const PanelDesktop = ({isOnline,navigate,logout}) => {
     const containerRef = useRef(null);
     
  if(DecodeToken(sessionStorage.getItem("token")).wersja_max==1){

    return(<>
                <div className={style.main}>
                        <div className={style.header}>
                
        
                                                        {isOnline ? (     <div className={style.user}> 
                                                                        <img className={style.userIcon } src={userOnline} alt="Procesy" onClick={()=>{console.log(DecodeToken(sessionStorage.getItem("token")).nazwisko)}}/>
                                                                        <p className={style.menu_txt}>{DecodeToken(sessionStorage.getItem("token")).imie} {DecodeToken(sessionStorage.getItem("token")).nazwisko}</p>
                                                                </div>) : (     <div className={style.user}> 
                                                                        <img className={style.userIcon } src={userOffline} alt="Procesy" />
                                                                        <p>{DecodeToken(sessionStorage.getItem("token")).imie} {DecodeToken(sessionStorage.getItem("token")).nazwisko} </p>
                                                                        
                                                                </div>) }
                                                        
                                                { isOnline && (<button className={style.btnWyloguj} onClick={()=>logout()}>Wyloguj</button> )}
                        </div>
        
                                <div className={style.container} >
                       <div className="app-container">
            
            <div
                ref={containerRef}
                className="draggable-container"
                style={{
                    position: 'relative', // Ważne dla pozycjonowania 'absolute' dziecka
                    background: 'transparent',
                    width: '80vw',
                    height: '600px',
                    border: '1px dashed grey',
                    margin: '50px auto',
                    overflow: 'hidden', // Zapobiega wyjściu elementu poza kontener
                }}
            >
                <DraggableResizableDiv containerRef={containerRef} />
                <DraggableResizableDiv containerRef={containerRef} />
                <DraggableResizableDiv containerRef={containerRef} />
                {/* Możesz dodać więcej instancji DraggableResizableDiv */}
                {/* <DraggableResizableDiv containerRef={containerRef} /> */}
            </div>
        </div>
                                </div>
            
                </div>
            </>);
  }
  else{
        return(<>
                <div className={style.main}>
                        <div className={style.header}>
                
        
                                                        {isOnline ? (     <div className={style.user}> 
                                                                        <img className={style.userIcon } src={userOnline} alt="Procesy" />
                                                                        <p className={style.menu_txt}>{DecodeToken(sessionStorage.getItem("token")).imie} {DecodeToken(sessionStorage.getItem("token")).nazwisko}</p>
                                                                </div>) : (     <div className={style.user}> 
                                                                        <img className={style.userIcon } src={userOffline} alt="Procesy" />
                                                                        <p>{DecodeToken(sessionStorage.getItem("token")).imie} {DecodeToken(sessionStorage.getItem("token")).nazwisko} </p>
                                                                        
                                                                </div>) }
                                                        
                                                { isOnline && (<button className={style.btnWyloguj} onClick={()=>logout()}>Wyloguj</button> )}
                        </div>
        
                                <div className={style.container} >
          
                                </div>
            
                </div>
            </>);
  }
        
}
