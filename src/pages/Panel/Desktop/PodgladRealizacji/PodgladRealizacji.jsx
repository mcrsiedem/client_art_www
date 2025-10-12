import React, { useContext, useEffect, useRef } from 'react';
// Importujemy style z pliku CSS Modules
import style from './PodgladRealizacji.module.css';
import { useSocket } from 'context/SocketContext';
import { AppContext } from 'context/AppContext';
import iconClose2 from "assets/x2.svg";
// Komponent ikony online (używany tylko dla estetyki)
// const OnlineIcon = () => (
//   <span className={style.onlineIcon} title="Online" />
// );

const OnlineIcon = ({status}) => {
  if(status=="Aktywny") {
  return( <span className={style.onlineIcon} title="Online" />);
}else{
  return( <span className={style.offlineIcon} title="Nieaktywny" />);
};
}
/**
 * Komponent wyświetlający listę użytkowników online z wykorzystaniem
 * nazewnictwa 'usersIO' i stylów z CSS Modules.
 * * @param {object} props
 * @param {Array<{id: number, imie: string, nazwisko: string, zalogowany: string}>} props.usersIO - Lista użytkowników online.
 */
export default function PodgladRealizacji(){
   const appcontext = useContext(AppContext);
          const podgladTableRef2 = useRef(null);
    
    const pokazUzytkownikowOnline = appcontext.pokazUzytkownikowOnline;
    const setPokazUzytkownikowOnline = appcontext.setPokazUzytkownikowOnline;
 const { podgladRealizacji } = useSocket()
useEffect(() => {
    // Sprawdzamy, czy dane istnieją i czy ref istnieje
    if (podgladRealizacji && podgladTableRef2.current) {
        // Użycie setTimeout(..., 0) jest tutaj wciąż dobrym zabezpieczeniem
        setTimeout(() => {
            podgladTableRef2.current.scrollTo({ top: 30000, behavior: "auto" });
        }, 0);
    }
}, [podgladRealizacji]);

    return (
    <div className={style.container}>
      <h2 className={style.header}>
       Ostatnie realizacje... ({podgladRealizacji.length})
               {/* <img
          className={style.icon2}
          src={iconClose2}
          onClick={() => {
            setPokazUzytkownikowOnline(false)
          }}
          alt="React Logo"
        /> */}
      </h2>
      
      <div ref={podgladTableRef2} className={style.listWrapper}>
        {/* Zastosowanie Twojej struktury mapowania */}
        {podgladRealizacji?.map((user, i) => (
          // Używamy tagu 'div' zamiast 'p', bo p nie powinien zawierać blokowych elementów (jak 'span')
          <div key={user.id || i} className={style.users}>
            {/* <OnlineIcon status={user.status}/> */}
            {/* Wyświetlamy imię i nazwisko dla pełniejszej informacji */}
           
            
                       <div className={style.nameContainer}>
    <span className={style.userName}>{user.dodal} {user.nazwisko}</span>
                      <span className={style.nazwa}>
                    {/* Formatujemy datę/czas, jeśli jest dostępna */}
                  {user.nazwa}      
                </span>
              </div>



                            <div className={style.klientContainer}>
                    <span className={style.loginTime}>
                    {/* Formatujemy datę/czas, jeśli jest dostępna */}
                     {user.nr} {user.rok} {user.klient}
                </span>
                      <span className={style.loginTime}>
                    {/* Formatujemy datę/czas, jeśli jest dostępna */}
             {user.tytul} 
                </span>
              </div>



              
              <div className={style.loginTimeContainer}>
                    <span className={style.loginTime}>
                    {/* Formatujemy datę/czas, jeśli jest dostępna */}
                    Utworzono: {user.utworzono}
                </span>
                      <span className={style.loginTime}>
                    {/* Formatujemy datę/czas, jeśli jest dostępna */}
             Ark.  {user.nr_arkusza}   -   Przeloty: {user.zrealizowano} ark
                </span>
              </div>
          
                
          
          </div>
        ))}
      </div>
    </div>
  );


};

