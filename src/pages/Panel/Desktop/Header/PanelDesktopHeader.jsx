import React, { useRef } from "react";
import { useEffect, useState, useContext } from "react";
import style from "./PanelDesktopHeader.module.css";
import userOnline from "assets/user_offline.svg";
import userOnline2 from "assets/user_wiedzmin.svg";

import userOffline from "assets/user_offline.svg";
import axios from "axios";
import DecodeToken from "pages/Login/DecodeToken";
import { AppContext } from "context/AppContext";
import { IP } from "utils/Host";
import { zabezpiecz } from "actions/zabezpiecz";
import { useSocket } from "context/SocketContext";
import { getCurrentBuildHash } from "actions/getCurrentBuildHash";
import DialogHipopotam from "components/DialogHipopotam/DialogHipopotam";
import Ktotam from "./Menu/Ktotam";
import DodajAsystenta from "./Menu/DodajAsystenta";
import PobierzUprawnienia from "./Menu/PobierzUprawnienia";
import Ustawienia from "./Menu/Ustawienia";
import EwakuacjaBazy from "./Menu/EwakuacjaBazy";
import PolaczeniaPuli from "./Menu/PolaczeniaPuli";
import Odswiez from "./Menu/Odswiez";
import Wyloguj from "./Menu/Wyloguj";
import DevilUserIcon from "../Footer/UserList/DevilUserIcon";



export default function PanelDesktopHeader({ isOnline, navigate, logout }) {
  const dropdownRef = useRef(null);
  const appcontext = useContext(AppContext);

    const hipopotemDialogBox = useRef(null);
  const { socket, isConnected, isAuthenticated, updateAuthStatus, usersIO,logoutIO,lokalizacja } =
    useSocket();

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
      document.addEventListener("mousedown", handleClickOutside);
    }


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
          onDoubleClick={()=>{
        console.log("Co widzę: "+lokalizacja.current )
        console.log("Hash: "+getCurrentBuildHash() )
        console.log("restart: "+appcontext.restart )

      }}
    className={style.header}>
  
      {isOnline ? (
        <div className={style.user}>
          {isOpen && (
            <ul className={style.dropdown_menu} ref={dropdownRef}>

              <Ktotam socket={socket} hipopotemDialogBox={hipopotemDialogBox} setIsOpen={setIsOpen}/>
              <DodajAsystenta socket={socket} hipopotemDialogBox={hipopotemDialogBox} setIsOpen={setIsOpen}/>
              <PobierzUprawnienia setIsOpen={setIsOpen}/>
              <Ustawienia socket={socket} hipopotemDialogBox={hipopotemDialogBox} setIsOpen={setIsOpen}/>
              <EwakuacjaBazy setIsOpen={setIsOpen}/>
              <PolaczeniaPuli setIsOpen={setIsOpen}/>
              <Odswiez setIsOpen={setIsOpen}/>
              <Wyloguj setIsOpen={setIsOpen}/>

            </ul>
          )}
          <img
            className={style.userIcon}
            src={userOnline}
            alt="Procesy"
            onClick={toggleMenu}
          />

          <p className={style.menu_txt}>
            {DecodeToken(sessionStorage.getItem("token")).imie}{" "}
            {DecodeToken(sessionStorage.getItem("token")).nazwisko}
          </p>
                <DialogHipopotam dialogBox={hipopotemDialogBox}/>
        </div>
      ) : (
        <div className={style.user}>
          <img className={style.userIcon} src={userOffline} alt="Procesy" />
          <p>
            {DecodeToken(sessionStorage.getItem("token")).imie}{" "}
            {DecodeToken(sessionStorage.getItem("token")).nazwisko}{" "}
          </p>
        </div>
      )}
    </div>
  );
}


