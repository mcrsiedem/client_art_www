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

const OnlineIcon = ({ status }) => {
  if (status == "Aktywny") {
    return <span className={style.onlineIcon} title="Online" />;
  } else {
    return <span className={style.offlineIcon} title="Nieaktywny" />;
  }
};
/**
 * Komponent wyświetlający listę użytkowników online z wykorzystaniem
 * nazewnictwa 'usersIO' i stylów z CSS Modules.
 * * @param {object} props
 * @param {Array<{id: number, imie: string, nazwisko: string, zalogowany: string}>} props.usersIO - Lista użytkowników online.
 */
export default function Zamowienia({podglad,i}) {

 return( <div key={podglad.global_id || i} className={style.usersZamowienia}>
            {/* <OnlineIcon status={podglad.status}/> */}
            {/* Wyświetlamy imię i nazwisko dla pełniejszej informacji */}

            <div className={style.nameContainer}>
              <span className={style.userName}>
                {podglad.user}
              </span>
              <span className={style.nazwa}>
                {/* Formatujemy datę/czas, jeśli jest dostępna */}
                {podglad.dzial}
              </span>
            </div>

            <div className={style.klientContainer}>
                       <div className={style.klientContainer2}>
                    <span className={style.loginTime}>
                {/* Formatujemy datę/czas, jeśli jest dostępna */}
                 {podglad.klient}
              </span>
            <span className={style.loginTime}>
                {/* Formatujemy datę/czas, jeśli jest dostępna */}
                {podglad.nr} {podglad.rok} 
              </span>

              </div>
              <span className={style.loginTime}>
                {/* Formatujemy datę/czas, jeśli jest dostępna */}
                {podglad.event}
              </span>
            </div>

            <div className={style.loginTimeContainer}>
              <span className={style.loginTime}>
                {/* Formatujemy datę/czas, jeśli jest dostępna */}
                Utworzono: {podglad.utworzono}
              </span>
              <span className={style.loginTime}>
                {/* Formatujemy datę/czas, jeśli jest dostępna */}
          Historia zamówienia :  {podglad.kategoria} 
              </span>
            </div>
          </div>)
      }

        
   