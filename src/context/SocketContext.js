import DecodeToken from 'pages/Login/DecodeToken';
import React, { createContext, useContext, useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { IP_SOCKET } from 'utils/Host';
import { IP } from "utils/Host";
import axios from "axios";
import { todayMinusDniGodziny } from 'actions/todayMinusDniGodziny';

  
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
    const reconnectTimerRef = useRef(null); 
    const lokalizacja = useRef(null); 
    
    // const {callPodgladRalizacji,podgladRealizacji, setPodgladRealizacji,loading, setLoading} = useRealizacje(); 
    
    const [podgladRealizacji, setPodgladRealizacji] = useState([]);
     let podglady=[]
const [loading, setLoading] = useState(false);
const callPodgladRalizacji = async (od) =>{

    if(podgladRealizacji.length==0){
                setLoading?.(true)
     
        
        const res = await axios.get(IP + "podglad_realizacji_dzien/"+od+"/" + sessionStorage.getItem("token"));

        podglady.push(...res.data[0])
        podglady.push(...res.data[1])
        podglady.push(...res.data[2])
        setPodgladRealizacji(podglady);
        


      

        setLoading?.(false)
    }else{
        
        let podglady=[]
        setPodgladRealizacji([])

        const res = await axios.get(IP + "podglad_realizacji_dzien/"+od+"/" + sessionStorage.getItem("token"));


        podglady.push(...res.data[0])
        podglady.push(...res.data[1])
        podglady.push(...res.data[2])
        setPodgladRealizacji(podglady);
    }

   
        

      }
    
    
    // ✅ POPRAWKA: Inicjalizacja currentUserId na podstawie zdekodowanego tokenu
    const [currentUserId, setCurrentUserId] = useState(getInitialUserId()); 
        // const [podgladRealizacji, setPodgladRealizacji] = useState([]);
    
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
        if (!socket || !socket.connected || !isConnected || !currentUserId || currentStatusRef.current === status) { 
            return; 
        }
        // alert( "Połączone: " + socket.connected )
        socket.emit('userActivity', { userId: currentUserId, status }); 
        currentStatusRef.current = status; 
        
    }, [socket, isConnected,currentUserId]); 

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
  
    //   const callPodgladRalizacji = async (od,{setLoading}) =>{
    //     let podglady=[]
        
    //     const res = await axios.get(IP + "podglad_realizacji_dzien/"+od+"/" + sessionStorage.getItem("token"));

    //     podglady.push(...res.data[0])
    //     podglady.push(...res.data[1])
    //     podglady.push(...res.data[2])
    //     setPodgladRealizacji(podglady);
      

    //         setLoading?.(false)
   
        

    //   }

const logoutIO = useCallback(() => {
        // 1. Zgłoszenie wylogowania do Socket.IO (jeśli socket istnieje i jest połączony)
        if (socket && isConnected) {
             // Wysyłamy informację do serwera. Serwer na podstawie 'userId' (lub 'socket.id') 
             // usunie użytkownika z listy online, a następnie Socket.IO sam 
             // obsłuży rozłączenie po stronie serwera.
            socket.emit("logout", { userId: currentUserId,socketId: socket.id }); 
            // 💡 Opuszczenie tej linii i poleganie na 'updateAuthStatus' 
            // jest zazwyczaj lepsze, ponieważ `useEffect` monitorujący token/ID 
            // zajmie się czyszczeniem Socket.IO (disconnect).
            // socket.disconnect(); 
        }

        // 2. Usunięcie tokenu i zresetowanie stanu uwierzytelnienia/ID
        updateAuthStatus(false);
        
        // 3. Wyczyść stan specyficzny dla użytkownika
        setUsersIO([]);
        setPodgladRealizacji([]);
        
        // 4. Czyszczenie timera bezczynności (kluczowe, by nie wysyłać stanu 'Nieaktywny' po wylogowaniu)
        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
            idleTimerRef.current = null;
        }
        currentStatusRef.current = 'Wylogowany'; 
        
        // 5. Opcjonalnie: Przekierowanie na stronę logowania (zwykle wykonuje się w komponencie wywołującym lub w globalnym routerze)
        // router.push('/login'); 
    }, [socket, isConnected, currentUserId, updateAuthStatus]); 



    // const logoutIO=()=>{
    //     newSocket.emit("logout",{userId:currentUserId,socketId: socket.id})
    // }


    const handleDisconnect = useCallback((reason, currentSocket) => {
    
    // 1. Sprawdzenie Krytycznych Błędów (np. Serwer nas wyrzucił)
    if (reason === 'io server disconnect') {
        // To oznacza, że serwer świadomie i celowo nas rozłączył (np. błąd tokenu)
        console.error("Serwer Socket.IO nas wyrzucił. WYMAGANE RE-LOGOWANIE.");
        updateAuthStatus(false); 
        // W tym przypadku nie próbujemy się łączyć, oczekujemy, że router przekieruje
        return;
    }
    
    // 2. Obsługa Problemów Sieciowych / Timeoutów
    if (reason === 'transport close' || reason === 'ping timeout' || reason === 'transport error') {
        // To są typowe błędy sieciowe, które wcześniej Socket.IO sam obsługiwał.
        console.info("Rozłączenie tymczasowe, ponawiam za 5 sekund.");

        // Zapobiegamy wielokrotnym timerom:
        if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current);
        }

        // 💡 MANUALNA PRÓBA POŁĄCZENIA
        reconnectTimerRef.current = setTimeout(() => {
            if (currentSocket) {
                 // Wymuszenie nowego połączenia:
                 currentSocket.connect(); 
            }
        }, 5000); // Spróbuj się połączyć za 5 sekund
        return;
    }
    
    // 3. Rozłączenie Zwykłe (np. user.disconnect() lub zamykanie karty)
    // W pozostałych przypadkach po prostu czekamy, aż użytkownik podejmie akcję
    
}, [updateAuthStatus]);



  useEffect(() => {


    console.log(" Pobudka..");

    return () => {
   
    };
  }, []);


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
        newSocket.on('connect', () => {
    setIsConnected(true);
    
    // ✅ GWARANCJA, że akcja jest wysyłana TYLKO na świeże, żywe gniazdo
    if (currentUserId) {
        // To wywołuje handleActivity, które wysyła 'Aktywny', resetuje timer 
        // i ustawi listenery DOM (jeśli zostały usunięte/wyłączone)
        handleActivity(); 
    }
});
        newSocket.on('disconnect', (reason) => {
        setIsConnected(false);
        // console.warn('Socket.IO został rozłączony. Powód:', reason);
        
        // 💡 Tutaj następuje reakcja na rozłączenie
        // handleDisconnect(reason, newSocket); 
    });

        newSocket.on('onlineUsers', setUsersIO);
        newSocket.on('connect_error', (err) => {
            console.error('Błąd połączenia Socket.IO (autoryzacja):', err.message);
            // // Ustawiamy stany na wylogowanie/brak ID

            
            removeToken(); 
            setIsAuthenticated(false);
            setCurrentUserId(null);

                // updateAuthStatus(false); 
    
    // CZYŚCI DODATKOWE STANY
    // setUsersIO([]);
    // setPodgladRealizacji([]);
        });





            newSocket.on("pobierz_podglad_realizacji", () => {
              // callPodgladRalizacji(todayMinusDniGodziny(1))
              console.log("gdzie jestem: " + lokalizacja.current);
              if (lokalizacja.current == "Panel") {
                console.log("odświeżam tylko panel ");
                // callPodgladRalizacji(todayMinusDniGodziny(1));
              }
            });


              newSocket.on("wysylamsocket", (sockets) => {

console.log(sockets)
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
        if (!socket || !currentUserId || !isConnected) {
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
          
                if (socket && !socket.connected) {

            socket.disconnect(); 
            setSocket(null); 
            
        } else if (socket && socket.connected) {
        
            handleActivity(); 
        }
            }
        };

//  const handleVisibility = () => {
//             if (document.hidden) {
//                 sendActivity('Ukryty'); 
//                 clearTimeout(idleTimerRef.current);
//             } else {
//                 // === KLUCZOWA ZMIANA TUTAJ ===
//                 if (socket) {
//                     // Niezależnie od socket.connected, zamykamy stare gniazdo.
//                     // Używamy .disconnect(), by upewnić się, że gniazdo zamyka połączenie.
//                     socket.disconnect(); 
//                     
//                     // Ustawienie na null wymusza PONOWNE URUCHOMIENIE Sekcji 2 useEffect, 
//                     // która tworzy nowe gniazdo z tokenem.
//                     setSocket(null); 
//                     
//                 } else {
//                     // Jeśli nie ma gniazda, ale wróciliśmy do widoczności,
//                     // wywołaj handleActivity, co przy braku socketu nic nie zrobi,
//                     // ale uruchomienie Sekcji 2 powinno nastąpić automatycznie, 
//                     // jeśli currentUserId jest ustawiony.
//                     handleActivity();
//                 }
//             }
//         };

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            activityEvents.forEach(event => window.removeEventListener(event, handleActivity));
            document.removeEventListener('visibilitychange', handleVisibility);
            
            clearTimeout(idleTimerRef.current);
            currentStatusRef.current = 'Aktywny'; 
        };
    }, [socket, currentUserId, isConnected , handleActivity, resetIdleTimer, sendActivity]); 

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
        logoutIO,
        podgladRealizacji,lokalizacja,callPodgladRalizacji,loading, setLoading
    }), [socket, isConnected, isAuthenticated, usersIO, currentUserId,podgladRealizacji,logoutIO,lokalizacja,callPodgladRalizacji,loading, setLoading]);
    
    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};