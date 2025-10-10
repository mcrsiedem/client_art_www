import React, { useRef } from "react";
import {  useEffect,useState,useContext  } from "react";
import style from './PanelDesktop.module.css';

import userOnline from 'assets/user_offline.svg'
import userOffline from 'assets/user_offline.svg'
import iconZamowienia from 'assets/iconZamowienia.svg'
import iconTechnolgie from 'assets/iconTechnologie.svg'
import iconHistoria from 'assets/iconHistoria.svg'
import iconUstawienia from 'assets/iconUstawienia.svg'
import iconMagazyn from 'assets/iconMagazyn.svg'
import iconCTP from 'assets/iconCTP.svg'
import iconDiagnostyka from 'assets/diagnostyka.svg'
import iconInspekcja from 'assets/inspekcja.svg'
import iconOddanie from 'assets/iconOddanie2.svg'
import iconProcesy from 'assets/iconProcesy.svg'

import iconKalendarz from 'assets/iconKalendarz.svg'
import axios from "axios";
import DecodeToken from "pages/Login/DecodeToken";

import { AppContext } from "context/AppContext";

import { IP } from "utils/Host";
import { zabezpiecz } from "actions/zabezpiecz";
import { SocketContext, useSocket } from "context/SocketContext";
import OnlineUsersList from "./OnlineUsersList";
import NawigacjaBTN from "./Nawigacja/NawigacjaBTN";

export default function PanelDesktop ({isOnline,navigate,logout})  {
  const dropdownRef = useRef(null);
  const appcontext = useContext(AppContext);
 const { socket, isConnected, isAuthenticated, updateAuthStatus,usersIO } = useSocket()

   const [isOpen, setIsOpen] = useState(false); // Stan do kontrolowania widoczności menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Zmienia stan na przeciwny (otwiera/zamyka menu)
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // Jeśli kliknięto poza kontenerem menu, zamknij menu
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Dodaj nasłuchiwacz zdarzeń, gdy menu jest otwarte
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Funkcja czyszcząca: usuń nasłuchiwacz zdarzeń, gdy komponent się odmontowuje
    // lub gdy isOpen zmienia się na false (menu się zamyka)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


    return(<>
                <div  onDoubleClick={ ()=>{ console.log(usersIO)}}className={style.main} >
                        <div className={style.header}>
                
        
                                                        {isOnline ? (     <div className={style.user}> 
                                                                                                                                        {isOpen && (
        <ul className={style.dropdown_menu } ref={dropdownRef}>
          
                    <li           onClick={() => {
                        if(socket){
                           socket.emit("ktotam");   
                        }
                 
     setIsOpen(false)
          }}>Kto tam?</li>
          
          
          
          <li>Dodaj Asystenta</li>
          <li           onClick={() => {
zabezpiecz()
     setIsOpen(false)
          }}>Pobierz uprawnienia</li>


          <li >Ustawienia</li>
       

{     DecodeToken(sessionStorage.getItem("token")).id==1?     <li onClick={async()=>{

    const res = await axios.get(IP + "backup/" + sessionStorage.getItem("token"))
      setIsOpen(false)
        }
            }>Ewakuacja bazy</li>:<></>}





                      <li onClick={()=>{
            window.location.reload(true)
            setIsOpen(false)
          }
            }>Odśwież</li>

                                  <li onClick={()=>{
                                    logout()
        
            setIsOpen(false)
          }
            }>Wyloguj</li>
        </ul>
      )}
                                                                        <img className={style.userIcon } src={userOnline} alt="Procesy" onClick={toggleMenu}/>

                                                                        <p className={style.menu_txt}>{DecodeToken(sessionStorage.getItem("token")).imie} {DecodeToken(sessionStorage.getItem("token")).nazwisko}</p>
                                                                </div>) : (     <div className={style.user}> 
                                                                        <img className={style.userIcon } src={userOffline} alt="Procesy" />
                                                                        <p>{DecodeToken(sessionStorage.getItem("token")).imie} {DecodeToken(sessionStorage.getItem("token")).nazwisko} </p>
                                                                        
                                                                </div>) }
                                                        
                        </div>
        
                                <div className={style.container} >
                                <div className={style.container_btn} >
                                        <NawigacjaBTN handler={() => navigate("/Zamowienia")} icon={iconZamowienia} nazwa={"ZAMÓWIENIA"} locked={false}/>
                                        <NawigacjaBTN handler={() => navigate("/faktury")} icon={iconTechnolgie} nazwa={"FAKTURY"} locked={false}/>
                                        <NawigacjaBTN handler={() => navigate("/ProcesyView")} icon={iconProcesy} nazwa={"PROCESY"} locked={false}/>
                                        <NawigacjaBTN handler={() => navigate("/OprawaView")} icon={iconMagazyn} nazwa={"OPRAWA"} locked={false}/>
                                        <NawigacjaBTN handler={() => navigate("/Oddania")} icon={iconOddanie} nazwa={"SPEDYCJA"} locked={false}/>
                                        <NawigacjaBTN handler={() => navigate("/kalendarz2")} icon={iconKalendarz} nazwa={"KALENDARZ"} locked={false}/>
                                        <NawigacjaBTN handler={() => navigate("/ustawienia")} icon={iconUstawienia} nazwa={"USTAWIENIA"} locked={false}/>
                                        <NawigacjaBTN handler={() => navigate("/Panel")} icon={iconHistoria} nazwa={"HISTORIA"} locked={true}/>
                                </div >

                                < div className={style.container_btn_prawy}> 
                                <OnlineUsersList />
                                </div>
                                </div>
                </div>
            </>);


};





