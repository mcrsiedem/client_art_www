import React, { useCallback, useRef } from "react";
import {  useEffect,useState,useContext  } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import DecodeToken from "pages/Login/DecodeToken";
import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "hooks/useOnlieStatus";
import { AppContext } from "context/AppContext";
import { getNadkomplety } from "actions/getNadkomplety";
import { getClients } from "actions/getClients";
import PanelMini from "./Mini/PanelMini";
import PanelDesktop from "./Desktop/PanelDesktop";
import { getCurrentBuildHash } from "actions/getCurrentBuildHash";
import { useApiPapier } from "hooks/useApiPapier";
import PanelDesktop2 from "./Desktop/PanelDesktop2";


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

    if(appcontext.restart){
       window.location.reload(true)
   
    }



  }, []);

  const logout = () => {
    navigate("/Login");
    sessionStorage.removeItem("token");
  };

  if (window.innerWidth > 900 && DecodeToken(sessionStorage.getItem("token")).wersja_max==1) {
    return (
      <>
        <PanelDesktop2 isOnline={isOnline} navigate={navigate} logout={logout} />
        {/* <PanelDesktop2 isOnline={isOnline} navigate={navigate} logout={logout} /> */}
      </>
    );
  } else
    return (
      <>
        <PanelMini isOnline={isOnline} navigate={navigate} logout={logout} />
      </>
    );
}






