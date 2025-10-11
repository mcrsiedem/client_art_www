import React, { useRef } from "react";
import { useEffect, useState, useContext } from "react";
import style from "./PanelDesktopFooter.module.css";
import userOnline from "assets/user_offline.svg";
import userOffline from "assets/user_offline.svg";
import axios from "axios";
import DecodeToken from "pages/Login/DecodeToken";
import { AppContext } from "context/AppContext";
import { IP } from "utils/Host";
import { zabezpiecz } from "actions/zabezpiecz";
import { useSocket } from "context/SocketContext";
import UserList from "./UserList";

export default function PanelDesktopFooter({ isOnline, navigate, logout }) {
  const dropdownRef = useRef(null);
  const appcontext = useContext(AppContext);
  const { socket, isConnected, isAuthenticated, updateAuthStatus, usersIO } =
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
  
      <UserList/>
    </div>
  );
}
