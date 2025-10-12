import React, { useContext } from 'react';
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
    
    const pokazUzytkownikowOnline = appcontext.pokazUzytkownikowOnline;
    const setPokazUzytkownikowOnline = appcontext.setPokazUzytkownikowOnline;
 const { socket, isConnected, isAuthenticated, updateAuthStatus,usersIO } = useSocket()

    return (
    <div className={style.container}>
      <h2 className={style.header}>
        Realizacje z dziś ({usersIO.length})
               {/* <img
          className={style.icon2}
          src={iconClose2}
          onClick={() => {
            setPokazUzytkownikowOnline(false)
          }}
          alt="React Logo"
        /> */}
      </h2>
      
      <div className={style.listWrapper}>
        {/* Zastosowanie Twojej struktury mapowania */}
        {usersIO.map((user, i) => (
          // Używamy tagu 'div' zamiast 'p', bo p nie powinien zawierać blokowych elementów (jak 'span')
          <div key={user.id || i} className={style.users}>
            {/* <OnlineIcon status={user.status}/> */}
            {/* Wyświetlamy imię i nazwisko dla pełniejszej informacji */}
            <span className={style.userName}>{user.imie} {user.nazwisko}</span>
            
            {user.zalogowany && (
              <div className={style.loginTimeContainer}>
                    <span className={style.loginTime}>
                    {/* Formatujemy datę/czas, jeśli jest dostępna */}
                    Zalogowany: {user.zalogowany}
                </span>
                      <span className={style.loginTime}>
                    {/* Formatujemy datę/czas, jeśli jest dostępna */}
                    Aktywny: {user.ostatnia_aktywnosc}
                </span>
              </div>
          
                
            )}
          </div>
        ))}
      </div>
    </div>
  );


};

