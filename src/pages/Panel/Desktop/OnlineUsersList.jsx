import React from 'react';
// Importujemy style z pliku CSS Modules
import style from './OnlineUsersList.module.css';
import { useSocket } from 'context/SocketContext';
// Komponent ikony online (używany tylko dla estetyki)
const OnlineIcon = () => (
  <span className={style.onlineIcon} title="Online" />
);

/**
 * Komponent wyświetlający listę użytkowników online z wykorzystaniem
 * nazewnictwa 'usersIO' i stylów z CSS Modules.
 * * @param {object} props
 * @param {Array<{id: number, imie: string, nazwisko: string, zalogowany: string}>} props.usersIO - Lista użytkowników online.
 */
const OnlineUsersList = () => {
 const { socket, isConnected, isAuthenticated, updateAuthStatus,usersIO } = useSocket()
  // Sprawdzenie, czy lista jest pusta
  if (usersIO.length === 0) {
    return (
      <div className={style.container}>
        <h2 className={style.header}>Użytkownicy Online (0)</h2>
        <p className={style.emptyMessage}>Brak użytkowników online. :(</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h2 className={style.header}>
        Użytkownicy Online ({usersIO.length})
      </h2>
      
      <div className={style.listWrapper}>
        {/* Zastosowanie Twojej struktury mapowania */}
        {usersIO.map((user, i) => (
          // Używamy tagu 'div' zamiast 'p', bo p nie powinien zawierać blokowych elementów (jak 'span')
          <div key={user.id || i} className={style.users}>
            <OnlineIcon />
            {/* Wyświetlamy imię i nazwisko dla pełniejszej informacji */}
            <span className={style.userName}>{user.imie} {user.nazwisko}</span>
            
            {user.zalogowany && (
                <span className={style.loginTime}>
                    {/* Formatujemy datę/czas, jeśli jest dostępna */}
                    Zalogowano: {user.zalogowany}
                </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsersList;