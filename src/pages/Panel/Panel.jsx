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
const ACTIVITY_INTERVAL = 5000;      // 5 sekund (Throttling dla statusu 'Aktywny')
const IDLE_TIMEOUT = 60000;          // 60 sekund (1 minuta - czas do statusu 'Nieaktywny')

function useActivityTracker(userId) {
  const idleTimerRef = useRef(null);
  const isThrottledRef = useRef(false);
  // Ref do śledzenia OSTATNIO WYSŁANEGO statusu
  const currentStatusRef = useRef('Aktywny'); 

  // --- Funkcje pomocnicze ---

  // Funkcja wysyłająca status do serwera (kontrola jednorazowej wysyłki)
  const sendActivity = useCallback((status) => {

      if (!socket) { 
        console.warn("Socket jest NULL. Nie można wysłać aktywności.");
        return; 
    }
    // Sprawdzenie: Jeśli status się nie zmienił, nie wysyłaj nic
    if (currentStatusRef.current === status) {
      return; 
    }
    
    // Wysyłka statusu do Socket.IO
    socket.emit('userActivity', { userId, status });
    // Aktualizacja ostatnio wysłanego statusu
    currentStatusRef.current = status; 
    
  }, [userId]);

  // Funkcja resetująca Timer Bezczynności
  const resetIdleTimer = useCallback(() => {
    // Zawsze anuluj poprzedni timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    
    // Ustaw nowy timer, który po 60 sekundach spróbuje wysłać 'Nieaktywny'
    idleTimerRef.current = setTimeout(() => {
      // Wywołanie sendActivity('Nieaktywny')
      // Zostanie wysłane TYLKO, jeśli currentStatusRef.current jest różne od 'Nieaktywny'
      sendActivity('Nieaktywny');
    }, IDLE_TIMEOUT);
  }, [sendActivity]);

  // Funkcja obsługująca każdą wykrytą aktywność
  const handleActivity = useCallback(() => {
    // 🔑 KROK 1: Resetuje timer bezczynności (przedłuża status 'Aktywny')
    resetIdleTimer();

    // KROK 2: Throttling (ograniczenie liczby wiadomości)
    if (isThrottledRef.current) {
      return;
    }

    // Wywołanie sendActivity('Aktywny')
    // Zostanie wysłane TYLKO, jeśli obecny status to np. 'Nieaktywny' lub 'Ukryty'
    sendActivity('Aktywny');
    
    isThrottledRef.current = true;

    // Usuń flagę throttling po zdefiniowanym interwale (5 sekund)
    setTimeout(() => {
      isThrottledRef.current = false;
    }, ACTIVITY_INTERVAL);
    
  }, [resetIdleTimer, sendActivity]);

  // --- Efekty (Lifecycle) ---

  useEffect(() => {
    // Ustawienie początkowe
    sendActivity('Aktywny');
    resetIdleTimer();
    
    // Rejestracja zdarzeń aktywności
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach(event => window.addEventListener(event, handleActivity));

    // Obsługa zmiany widoczności karty ('hidden' dla minimalizacji/przełączenia karty)
    const handleVisibility = () => {
      if (document.hidden) {
        sendActivity('Ukryty'); // Możesz użyć "Ukryty" lub "Nieaktywny"
        clearTimeout(idleTimerRef.current); // Zatrzymaj timer, bo 'Ukryty' ma wyższy priorytet
      } else {
        handleActivity(); // Powrót na kartę => 'Aktywny' i reset timera
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    // Czyszczenie (cleanup) po odmontowaniu komponentu
    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, handleActivity));
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(idleTimerRef.current);
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






