import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { io } from 'socket.io-client';
import { IP_SOCKET } from 'utils/Host';
import { AppContext } from './AppContext';
  
// const SERVER_URL = 'https://planer.artdruk.eu'; 
const SocketContext = createContext(null);


// Używamy localStorage, co jest lepsze dla tokenów, które mają przetrwać odświeżenie strony.
const STORAGE_TYPE = sessionStorage; 
const TOKEN_KEY = 'token';

const getToken = () => STORAGE_TYPE.getItem(TOKEN_KEY); 
const setToken = (token) => STORAGE_TYPE.setItem(TOKEN_KEY, token);
const removeToken = () => STORAGE_TYPE.removeItem(TOKEN_KEY);

// Hook do używania w komponentach:
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

const [usersIO, setUsersIO] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    // const [usersIO, setUsersIO] = useState([]);
    
    // Stan początkowy oparty na obecności tokenu
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

    // Funkcja wywoływana z komponentu Logowania/Wylogowania
    const updateAuthStatus = (status, token = null) => {
        if (status && token) {
            setToken(token);
        } else if (!status) {
            removeToken();
        }
        // Ta zmiana stanu wywoła useEffect poniżej, inicjując lub rozłączając Socket.IO
        setIsAuthenticated(status);
    };

    // ----------------------------------------------------
    // KLUCZOWY useEffect: Zarządzanie Połączeniem Socket.IO
    // ----------------------------------------------------
  
    useEffect(() => {
        const token = getToken();

        // 1. Warunek: Mamy token i status jest pozytywny -> Inicjalizuj Socket
        if (isAuthenticated && token) {
            
            const newSocket = io(IP_SOCKET, {
                auth: { token: token }, // Przekazanie tokenu do serwera
                transports: ['websocket'],
                reconnection: true,
            });

            setSocket(newSocket);
            
            // Konfiguracja listenerów
            newSocket.on('connect', () => setIsConnected(true));
            newSocket.on('disconnect', () => setIsConnected(false));

                  newSocket.on("onlineUsers", (data) => {
                 setUsersIO(data)
          //tu przychodzi odpowiedź i jest zapisana w contexcie
          // setSocketReceiveMessage(data.message)
          // setUsersIO(data)
          console.log(data)
        });
            
            // Obsługa błędu autoryzacji z serwera
            newSocket.on('connect_error', (err) => {
                console.error('Błąd połączenia Socket.IO (autoryzacja):', err.message);
                // Usuń token, zaktualizuj stan, co wymusi ponowne uruchomienie useEffect
                removeToken(); 
                setIsAuthenticated(false);
            });

            // 2. Logika czyszcząca: Rozłącza instancję przed jej zniszczeniem (przy odświeżeniu/wylogowaniu)
            return () => {
                newSocket.off('connect');
                newSocket.off('disconnect');
                newSocket.off('connect_error');
                newSocket.disconnect(); // KLUCZOWE
                setSocket(null);
                setIsConnected(false);
            };
        }
        
        // 3. Warunek: Użytkownik się wylogował lub token zniknął (isAuthenticated == false)
        // W tym przypadku poprzednia instancja zostanie rozłączona przez funkcję czyszczącą, 
        // a setSocket(null) zapobiegnie użyciu jej w dalszej części kodu.
        
    }, [isAuthenticated]); // Zależność od stanu autoryzacji

    // Używamy useMemo, aby uniknąć zbędnego ponownego renderowania komponentów-dzieci
    const contextValue = useMemo(() => ({
        socket,
        isConnected,
        isAuthenticated,
        updateAuthStatus,
  usersIO
    }), [socket, isConnected, isAuthenticated,usersIO]);
    return (
        <SocketContext.Provider value={contextValue}>
          
            {children}
        </SocketContext.Provider>
    );
};