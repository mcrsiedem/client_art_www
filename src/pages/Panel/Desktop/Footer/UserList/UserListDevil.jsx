// UserList.js
import React, { useContext } from 'react';
import style from './UserListDevil.module.css';
import { Calendar, BarChart3, Clock, CheckCircle2, Ban } from 'lucide-react';


// Przykładowy obrazek (zastąp własnym)
import userOnline from 'assets/user_offline.svg'; 
import userOnline2 from 'assets/user_wiedzmin.svg'; 
import { useSocket } from 'context/SocketContext';
import DecodeToken from 'pages/Login/DecodeToken';
import { AppContext } from 'context/AppContext';


const OnlineIcon = ({status}) => {
  if(status=="Aktywny") {
  return( <span className={style.onlineIcon} title="Online" />);
};
}

// Przykładowe dane


/**
 * Komponent wyświetlający poziomą listę użytkowników.
 * Używa CSS Grid do elastycznego rozmieszczenia i dopasowania do szerokości rodzica.
 */
// const UserList = ({ usersIO = dummyUsers }) => {
const UserListDevil = () => {
   const appcontext = useContext(AppContext);
      
      const pokazUzytkownikowOnline = appcontext.pokazUzytkownikowOnline;
      const setPokazUzytkownikowOnline = appcontext.setPokazUzytkownikowOnline;
   const { socket, isConnected, isAuthenticated, updateAuthStatus,usersIO } = useSocket()
  return (
    // Kontener główny, który zajmie 100% szerokości rodzica
    <div className={style.userListContainer}>
      {/* Używamy CSS Grid, aby umieścić użytkowników w jednym rzędzie 
          i automatycznie dopasować ich liczbę oraz rozmiar */}
      <div className={style.usersGrid}>
        { DecodeToken(sessionStorage.getItem("token")).id ==1 && usersIO
          .filter(
            (user) =>
              // user.userId != DecodeToken(sessionStorage.getItem("token")).id
              user.userId ==1
          )
          .map((user, i) => (
            // Pojedynczy element użytkownika
            <div
              title={`${user.imie} ${user.nazwisko}\nZalogowano: ${user.zalogowany}\nOstatnio aktywny: ${user.ostatnia_aktywnosc}\nSocket ID: ${user.socketId}`}
              key={user.socketId || i}
              className={
                user.status == "Aktywny" ? style.userCardActive : style.userCard
              }
            >
              <OnlineIcon status={user.status} />
                                  
              <Ban size={35} style={{marginTop:'10px', color:'#ffffff57'}}/> 
       
              {/* Ikona użytkownika */}
              {/* <img
                className={style.userIcon}
                src={user.imageUrl || userOnline2} // Użyj obrazka z danych lub domyślnego
                alt={`Avatar użytkownika ${user.imie}`}
              /> */}

            </div>
          ))}

      </div>
    </div>
  );
};

export default UserListDevil;