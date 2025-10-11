import DecodeToken from 'pages/Login/DecodeToken';
import React, { createContext, useContext, useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { IP_SOCKET } from 'utils/Host';

// --- Stałe konfiguracyjne ---
// const IP_SOCKET = IP_SOCKET; 
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

// --- Funkcja do dekodowania (PRZYKŁADOWA) ---
// W rzeczywistej aplikacji powinieneś użyć biblioteki JWT lub uzyskać ID z kontekstu.


// --- Główny Dostawca Kontekstu Socket.IO ---
export const SocketProvider = ({ children }) => {
    const [usersIO, setUsersIO] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
    // 🔑 NOWY STAN: Przechowuje ID użytkownika po autoryzacji
    const [currentUserId, setCurrentUserId] = useState(); 
    
    // --- Refy dla śledzenia aktywności ---
    const idleTimerRef = useRef(null);
    const isThrottledRef = useRef(false);
    const currentStatusRef = useRef('Aktywny'); 

    const updateAuthStatus = (status, token = null) => {
        if (status && token) {
            setToken(token);
            // Ustaw ID po otrzymaniu tokenu
            setCurrentUserId(DecodeToken(sessionStorage.getItem("token")).id); 
        } else if (!status) {
            removeToken();
            // Wyczyść ID po wylogowaniu
            setCurrentUserId(null); 
        }
        setIsAuthenticated(status);
    };

    // -----------------------------------------------------------------------
    // SEKCJA 1: Zarządzanie Logiką Aktywności (Zależna od ID)
    // -----------------------------------------------------------------------
    
    const sendActivity = useCallback((status) => {
        // 🔑 NOWA KONTROLA: Wymagaj zarówno socket, jak i currentUserId
        if (!socket || !currentUserId || currentStatusRef.current === status) { 
            return; 
        }
        
        socket.emit('userActivity', { userId: currentUserId, status }); // Użyj currentUserId
        currentStatusRef.current = status; 
        
    }, [socket, currentUserId]); // Zależność od obiektu socket i currentUserId

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
  
    useEffect(() => {
        const token = getToken();
        
        // 🔑 WARUNEK POŁĄCZENIA: Wymagany jest ID użytkownika i token
        if (!isAuthenticated || !token || !currentUserId) {
            // Jeśli brakuje ID (np. token się zmienił lub jest pusty), wstrzymaj połączenie
            return; 
        }

        const newSocket = io(IP_SOCKET, {
            auth: { token: token },
            transports: ['websocket'],
            reconnection: true,
        });

        setSocket(newSocket);
        
        // ... (standardowe listenery Socket.IO: connect, disconnect, onlineUsers, connect_error) ...
        newSocket.on('connect', () => setIsConnected(true));
        newSocket.on('disconnect', () => setIsConnected(false));
        newSocket.on('onlineUsers', setUsersIO);
        newSocket.on('connect_error', (err) => {
            console.error('Błąd połączenia Socket.IO (autoryzacja):', err.message);
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
        
    }, [isAuthenticated, currentUserId]); // Zależność również od currentUserId
    
    // -----------------------------------------------------------------------
    // SEKCJA 3: Efekt zarządzający Listenerami DOM (Śledzenie Aktywności)
    // -----------------------------------------------------------------------
    
    useEffect(() => {
        // 🔑 WARUNEK AKTYWNOŚCI: Uruchamiamy śledzenie tylko, gdy gniazdo i ID są gotowe
        if (!socket || !currentUserId) {
            clearTimeout(idleTimerRef.current);
            return;
        }

        // Uruchomienie początkowe
        sendActivity('Aktywny');
        resetIdleTimer();

        // 1. Rejestracja zdarzeń DOM
        const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        activityEvents.forEach(event => window.addEventListener(event, handleActivity));

        // ... (implementacja handleVisibility) ...
        const handleVisibility = () => {
            if (document.hidden) {
                sendActivity('Ukryty'); 
                clearTimeout(idleTimerRef.current);
            } else {
                handleActivity();
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);

        // 2. Logika czyszczenia DOM
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
        currentUserId // Opcjonalnie udostępnij ID w kontekście
    }), [socket, isConnected, isAuthenticated, usersIO, currentUserId]);
    
    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};