// UserList.js
import React, { useContext } from 'react';
import style from './UserList.module.css';

// Przykładowy obrazek (zastąp własnym)
import userOnline from 'assets/user_offline.svg'; 
import { useSocket } from 'context/SocketContext';
import DecodeToken from 'pages/Login/DecodeToken';
import { AppContext } from 'context/AppContext';


const OnlineIcon = ({status}) => {
  if(status=="Aktywny") {
  return( <span className={style.onlineIcon} title="Online" />);
};
}

// Przykładowe dane
const dummyUsers = [
  { id: 1, imie: 'Anna', nazwisko: 'Kowalska', zalogowany: '14:30', imageUrl: userOnline },
  { id: 2, imie: 'Piotr', nazwisko: 'Nowak', zalogowany: '14:35', imageUrl: userOnline },
  { id: 3, imie: 'Krzysztof', nazwisko: 'Wójcik', zalogowany: '14:40', imageUrl: userOnline },
  { id: 5, imie: 'Barbara ', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  { id: 6, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  { id: 7, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  { id: 8, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  { id: 9, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  { id: 10, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  { id: 11, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // { id: 12, imie: 'Ewa', nazwisko: 'Zielińska', zalogowany: '14:45', imageUrl: userOnline },
  // Dodaj więcej, aby przetestować przepełnienie
];

/**
 * Komponent wyświetlający poziomą listę użytkowników.
 * Używa CSS Grid do elastycznego rozmieszczenia i dopasowania do szerokości rodzica.
 */
// const UserList = ({ usersIO = dummyUsers }) => {
const UserList = () => {
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
        {usersIO
          // .filter(
          //   (user) =>
          //     user.userId != DecodeToken(sessionStorage.getItem("token")).id
          // )
          .map((user, i) => (
            // Pojedynczy element użytkownika
            <div
              title={`${user.imie} ${user.socketId}\nZalogowano: ${user.zalogowany}\nOstatnio aktywny: ${user.ostatnia_aktywnosc}`}
              key={user.socketId || i}
              className={
                user.status == "Aktywny" ? style.userCardActive : style.userCard
              }
            >
              <OnlineIcon status={user.status} />
              {/* Ikona użytkownika */}
              <img
                className={style.userIcon}
                src={user.imageUrl || userOnline} // Użyj obrazka z danych lub domyślnego
                alt={`Avatar użytkownika ${user.imie}`}
              />

              {/* Imię (skracane w CSS) */}
              <span className={style.userName}>{user.imie} </span>

              {/* Nazwisko (skracane w CSS) */}
              <span className={style.userSurname}>{user.nazwisko}</span>

              {/* Data/czas zalogowania */}
              {/* {user.zalogowany && (
              <span className={style.loginTime}>
                Zalogowano: {user.zalogowany}
              </span>
            )} */}
            </div>
          ))}

        {usersIO.length > 1 ? (
          <div 
          onClick={()=>{setPokazUzytkownikowOnline(!pokazUzytkownikowOnline)}}
          title={`Użytkownicy zalogowani`} className={style.userCardInfo}>
          
            <span className={style.info}>{usersIO.length}</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserList;