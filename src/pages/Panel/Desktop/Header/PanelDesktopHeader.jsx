import React, { useRef } from "react";
import { useEffect, useState, useContext } from "react";
import style from "./PanelDesktopHeader.module.css";
import userOnline from "assets/user_offline.svg";
import userOffline from "assets/user_offline.svg";
import axios from "axios";
import DecodeToken from "pages/Login/DecodeToken";
import { AppContext } from "context/AppContext";
import { IP } from "utils/Host";
import { zabezpiecz } from "actions/zabezpiecz";
import { useSocket } from "context/SocketContext";


export default function PanelDesktopHeader({ isOnline, navigate, logout }) {
  const dropdownRef = useRef(null);
  const appcontext = useContext(AppContext);
  const { socket, isConnected, isAuthenticated, updateAuthStatus, usersIO,logoutIO } =
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

    // Funkcja czyszcząca: usuń nasłuchiwacz zdarzeń, gdy komponent się odmontowuje
    // lub gdy isOpen zmienia się na false (menu się zamyka)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={style.header}>
      {isOnline ? (
        <div className={style.user}>
          {isOpen && (
            <ul className={style.dropdown_menu} ref={dropdownRef}>
              <li
                onClick={() => {
                  if (socket) {
                    socket.emit("ktotam");
                  }

                  setIsOpen(false);
                }}
              >
                Kto tam?
              </li>

              <li>Dodaj Asystenta</li>
              <li
                onClick={() => {
                  zabezpiecz();
                  setIsOpen(false);
                }}
              >
                Pobierz uprawnienia
              </li>

              <li>Ustawienia</li>

              {DecodeToken(sessionStorage.getItem("token")).id == 1 ? (
                <li
                  onClick={async () => {
                    const res = await axios.get(
                      IP + "backup/" + sessionStorage.getItem("token")
                    );
                    setIsOpen(false);
                  }}
                >
                  Ewakuacja bazy
                </li>
              ) : (
                <></>
              )}

              <li
                onClick={() => {
                  window.location.reload(true);
                  setIsOpen(false);
                }}
              >
                Odśwież
              </li>

              <li
                onClick={() => {
                  logout();
logoutIO()
                  setIsOpen(false);
                }}
              >
                Wyloguj
              </li>
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
