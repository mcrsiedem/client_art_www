import React, { useCallback, useRef } from "react";
import {  useEffect,useState,useContext  } from "react";
import DecodeToken from "pages/Login/DecodeToken";
import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "hooks/useOnlieStatus";
import { AppContext } from "context/AppContext";
import { getNadkomplety } from "actions/getNadkomplety";
import { getClients } from "actions/getClients";
import PanelMini from "./Mini/PanelMini";
import PanelDesktop from "./Desktop/PanelDesktop";
import { useSocket } from "context/SocketContext";

export default function Panel({ user, setUser }) {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const appcontext = useContext(AppContext);
  const setNadkomplety = appcontext.setNadkomplety;
  const setClients = appcontext.setClients;
  const setClientsWyszukiwarka = appcontext.setClientsWyszukiwarka;
 const { socket, isConnected, isAuthenticated, updateAuthStatus,usersIO } = useSocket()
  useEffect(() => {
    getNadkomplety(setNadkomplety)
    getClients(setClients,setClientsWyszukiwarka )

  }, []);

// Zaawansowane śledzenie aktywności użytkownika z throttlingiem i wykrywaniem bezczynności
// Wysyła sygnały "active" co 5 sekund podczas aktywności i "idle" po 60 sekundach bezczynności
// Dodatkowo wykrywa zmianę widoczności karty (np. przełączanie zakładek w przeglądarce)
const ACTIVITY_INTERVAL = 5000; // 5 sekund (częstotliwość wysyłania "active")
const IDLE_TIMEOUT = 10000;    // 60 sekund (definicja bezczynności)

function useActivityTracker(userId) {
  // Refy do przechowywania timerów i flagi, aby nie wywoływać ponownych renderów
  const idleTimerRef = useRef(null);
  const isThrottledRef = useRef(false);

  const sendActivity = useCallback((status) => {
    socket.emit('userActivity', { userId, status });
  }, [userId]);

  const resetIdleTimer = useCallback(() => {
    // 1. Zresetuj istniejący timer bezczynności
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    // 2. Ustaw nowy timer bezczynności
    idleTimerRef.current = setTimeout(() => {
      sendActivity('idle');
    }, IDLE_TIMEOUT);
  }, [sendActivity]);

  const handleActivity = useCallback(() => {
    // A. Zresetuj timer bezczynności, ponieważ wykryto aktywność
    resetIdleTimer();

    // B. Throttling: jeśli sygnał jest już "w kolejce" lub niedawno wysłany, pomiń
    if (isThrottledRef.current) {
      return;
    }

    // C. Wyślij sygnał "active" i ustaw flagę throttling
    sendActivity('active');
    isThrottledRef.current = true;

    // D. Usuń flagę throttling po zdefiniowanym interwale
    setTimeout(() => {
      isThrottledRef.current = false;
    }, ACTIVITY_INTERVAL);

  }, [resetIdleTimer, sendActivity]);

  useEffect(() => {
    // Ustawienie początkowe
    sendActivity('active');
    resetIdleTimer();

    // Rejestracja zdarzeń aktywności
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach(event => window.addEventListener(event, handleActivity));

    // Dodatkowe wydajne sprawdzenie: Zmiana widoczności karty
    const handleVisibility = () => {
      if (document.hidden) {
        sendActivity('hidden');
      } else {
        // Natychmiastowe oznaczenie jako aktywnego po powrocie na kartę
        handleActivity(); // Używamy handleActivity, aby zresetować też throttling
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    // Czyszczenie (cleanup) po odmontowaniu komponentu
    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, handleActivity));
      document.removeEventListener('visibilitychange', handleVisibility);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      // Nie musimy czyścić timerów z throttlingu, bo zależą od handleActivity, które przestanie być wywoływane
    };
  }, [userId, handleActivity, resetIdleTimer, sendActivity]); 
}








  const logout = () => {
    navigate("/Login");
    sessionStorage.removeItem("token");
  };
useActivityTracker(DecodeToken(sessionStorage.getItem("token")).id);
  if (window.innerWidth > 900 && DecodeToken(sessionStorage.getItem("token")).wersja_max==1) {
    return (
      <>
        <PanelDesktop isOnline={isOnline} navigate={navigate} logout={logout} />
      </>
    );
  } else
    return (
      <>
        <PanelMini isOnline={isOnline} navigate={navigate} logout={logout} />
      </>
    );
}






