import React, { useContext, useEffect, useRef } from "react";
// Importujemy style z pliku CSS Modules
import style from "./PodgladRealizacji.module.css";
import { useSocket } from "context/SocketContext";
import { AppContext } from "context/AppContext";
import iconClose2 from "assets/x2.svg";
// Komponent ikony online (używany tylko dla estetyki)
// const OnlineIcon = () => (
//   <span className={style.onlineIcon} title="Online" />
// );


export default function Oprawa({podglad,i}) {

 return( <div key={podglad.global_id || i} className={style.users}>
            {/* <OnlineIcon status={podglad.status}/> */}
            {/* Wyświetlamy imię i nazwisko dla pełniejszej informacji */}

            <div className={style.nameContainer}>
              <span className={style.userName}>
                {podglad.dodal} {podglad.nazwisko}
              </span>
              <span className={style.nazwa}>
                {/* Formatujemy datę/czas, jeśli jest dostępna */}
                {podglad.nazwa}Oprawa
              </span>
            </div>

            <div className={style.klientContainer}>
              <span className={style.loginTime}>
                {/* Formatujemy datę/czas, jeśli jest dostępna */}
                {podglad.nr} {podglad.rok} {podglad.klient}
              </span>
              <span className={style.loginTime}>
                {/* Formatujemy datę/czas, jeśli jest dostępna */}
                {podglad.tytul}
              </span>
            </div>

            <div className={style.loginTimeContainer}>
              <span className={style.loginTime}>
                {/* Formatujemy datę/czas, jeśli jest dostępna */}
                Utworzono: {podglad.utworzono}
              </span>
              <span className={style.loginTime}>
                {/* Formatujemy datę/czas, jeśli jest dostępna */}
                 Nakład: {podglad.naklad} szt.
              </span>
            </div>
          </div>)
      }

        
   