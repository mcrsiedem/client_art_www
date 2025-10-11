import DecodeToken from 'pages/Login/DecodeToken';
import React, { createContext, useContext, useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { IP_SOCKET } from 'utils/Host';


 let newSocket;
// --- Stałe konfiguracyjne ---
const STORAGE_TYPE = sessionStorage; 
const TOKEN_KEY = 'token';
const ACTIVITY_INTERVAL = 5000;  
const IDLE_TIMEOUT = 60000;      

// --- Zarządzanie Tokenem ---
const getToken = () => STORAGE_TYPE.getItem(TOKEN_KEY); 
const setToken = (token) => STORAGE_TYPE.setItem(TOKEN_KEY, token);
const removeToken = () => STORAGE_TYPE.removeItem(TOKEN_KEY);

// --- Kontekst ---
const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

// 🔑 KLUCZOWA ZMIANA: Funkcja do inicjalizacji stanu ID
const getInitialUserId = () => {
    const token = getToken();
    if (token) {
        try {
            // Bezpośrednie dekodowanie tokenu z sessionStorage, jeśli istnieje
            return DecodeToken(token).id; 
        } catch (e) {
            console.error("Błąd dekodowania tokenu podczas inicjalizacji:", e);
            removeToken(); // Usuń nieprawidłowy/uszkodzony token
            return null;
        }
    }
    return null;
};


// --- Główny Dostawca Kontekstu Socket.IO ---
export const SocketProvider = ({ children }) => {
    const [usersIO, setUsersIO] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
    
    // ✅ POPRAWKA: Inicjalizacja currentUserId na podstawie zdekodowanego tokenu
    const [currentUserId, setCurrentUserId] = useState(getInitialUserId()); 
    
    // --- Refy dla śledzenia aktywności ---
    const idleTimerRef = useRef(null);
    const isThrottledRef = useRef(false);
    const currentStatusRef = useRef('Aktywny'); 

    const updateAuthStatus = (status, token = null) => {
        if (status && token) {
            setToken(token);
            // Ustaw ID po otrzymaniu tokenu
            setCurrentUserId(DecodeToken(token).id); 
        } else if (!status) {
            removeToken();
            // Wyczyść ID po wylogowaniu
            setCurrentUserId(null); 
        }
        setIsAuthenticated(status);
    };

    // -----------------------------------------------------------------------
    // SEKCJA 1: Zarządzanie Logiką Aktywności (Bez zmian logiki)
    // -----------------------------------------------------------------------
    
    const sendActivity = useCallback((status) => {
        if (!socket || !currentUserId || currentStatusRef.current === status) { 
            return; 
        }
        
        socket.emit('userActivity', { userId: currentUserId, status }); 
        currentStatusRef.current = status; 
        
    }, [socket, currentUserId]); 

    const resetIdleTimer = useCallback(() => {
        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
        }
        idleTimerRef.current = setTimeout(() => {
            sendActivity('Nieaktywny');
        }, IDLE_TIMEOUT);
    }, [sendActivity]);

    const handleActivity = useCallback(() => {
        resetIdleTimer();
        if (isThrottledRef.current) {
            return;
        }
        sendActivity('Aktywny');
        isThrottledRef.current = true;
        setTimeout(() => {
            isThrottledRef.current = false;
        }, ACTIVITY_INTERVAL);
        
    }, [resetIdleTimer, sendActivity]);

    // -----------------------------------------------------------------------
    // SEKCJA 2: Efekt zarządzający Połączeniem Socket.IO
    // -----------------------------------------------------------------------
  

    const logoutIO=()=>{
        newSocket.emit("logout",{userId:currentUserId})
    }
    useEffect(() => {
        const token = getToken();
        
        // 🔑 NOWY WARUNEK POŁĄCZENIA: Użycie tokena zamiast isAuthenticated
        // Sprawdzenie, czy jest token I jest ID. Użycie tokena, aby było
        // zsynchronizowane z autoryzacją po stronie serwera.
        if (!token || !currentUserId) {
            // Jeśli brakuje tokenu lub ID, upewnij się, że rozłączamy stare gniazdo
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            return; 
        }

       newSocket = io(IP_SOCKET, {
            auth: { token: token },
            transports: ['websocket'],
            reconnection: true,
        });

        setSocket(newSocket);
        
        // ... (standardowe listenery Socket.IO) ...
        newSocket.on('connect', () => setIsConnected(true));
        newSocket.on('disconnect', () => setIsConnected(false));
        newSocket.on('onlineUsers', setUsersIO);
        newSocket.on('connect_error', (err) => {
            console.error('Błąd połączenia Socket.IO (autoryzacja):', err.message);
            // Ustawiamy stany na wylogowanie/brak ID
            removeToken(); 
            setIsAuthenticated(false);
            setCurrentUserId(null);
        });

        // Logika czyszcząca
        return () => {
            newSocket.off('connect');
            newSocket.off('disconnect');
            newSocket.off('connect_error');
            newSocket.off('onlineUsers');
            newSocket.disconnect(); 
            setSocket(null);
            setIsConnected(false);
        };
        // ✅ Zależności: React reaguje, gdy zmienia się currentUserId lub token
    }, [currentUserId]); // isAuthenticated jest teraz częściowo zbędny, skupiamy się na currentUserId
    
    // -----------------------------------------------------------------------
    // SEKCJA 3: Efekt zarządzający Listenerami DOM (Bez zmian logiki)
    // -----------------------------------------------------------------------
    
    useEffect(() => {
        if (!socket || !currentUserId) {
            clearTimeout(idleTimerRef.current);
            return;
        }

        sendActivity('Aktywny');
        resetIdleTimer();

        const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        activityEvents.forEach(event => window.addEventListener(event, handleActivity));

        const handleVisibility = () => {
            if (document.hidden) {
                sendActivity('Ukryty'); 
                clearTimeout(idleTimerRef.current);
            } else {
                handleActivity();
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            activityEvents.forEach(event => window.removeEventListener(event, handleActivity));
            document.removeEventListener('visibilitychange', handleVisibility);
            
            clearTimeout(idleTimerRef.current);
            currentStatusRef.current = 'Aktywny'; 
        };
    }, [socket, currentUserId, handleActivity, resetIdleTimer, sendActivity]); 

    // -----------------------------------------------------------------------
    // SEKCJA 4: Kontekst
    // -----------------------------------------------------------------------

    const contextValue = useMemo(() => ({
        socket,
        isConnected,
        isAuthenticated,
        updateAuthStatus,
        usersIO,
        currentUserId,
        logoutIO
    }), [socket, isConnected, isAuthenticated, usersIO, currentUserId]);
    
    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};