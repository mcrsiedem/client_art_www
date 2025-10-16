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
import { getCurrentBuildHash } from "actions/getCurrentBuildHash";


export default function Panel({ user, setUser }) {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const appcontext = useContext(AppContext);
  const setNadkomplety = appcontext.setNadkomplety;
  const setClients = appcontext.setClients;
  const setClientsWyszukiwarka = appcontext.setClientsWyszukiwarka;
  useEffect(() => {
  const currentHash = getCurrentBuildHash(); 

    getNadkomplety(setNadkomplety)
    getClients(setClients,setClientsWyszukiwarka )



    // // 1. Sprawdź, czy udało się znaleźć własny hash
    // if (!currentHash) {
    //     console.error("Nie udało się zidentyfikować aktualnego hasha.");
    //     return;
    // }

    // // 2. Wyślij zapytanie do API po oczekiwany hash
    // axios.get('/api/check-version')
    //   .then(response => {
    //     const expectedHash = response.data.expectedHash;
        
    //     // 3. PORÓWNANIE
    //     if (currentHash !== expectedHash) {
    //       console.log(`Wersja: ${currentHash}. Oczekiwana: ${expectedHash}. Wymuszanie przeładowania...`);
    //       window.location.reload(true); // Twarde przeładowanie
    //     } else {
    //       console.log(`Aplikacja jest aktualna (Hash: ${currentHash})`);
    //     }
    //   })
    //   .catch(error => console.error('Błąd sprawdzania wersji', error));
 



  }, []);

  const logout = () => {
    navigate("/Login");
    sessionStorage.removeItem("token");
  };

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






