import React, { useRef } from "react";
import {  useEffect,useState,useContext  } from "react";
import style from '../Panel/Panel.module.css';
import logoutIcon from 'assets/logout.png'
import userOnline from 'assets/user_offline.svg'
import userOffline from 'assets/user_offline.svg'
import iconZamowienia from 'assets/iconZamowienia.svg'
import iconTechnolgie from 'assets/iconTechnologie.svg'
import iconHistoria from 'assets/iconHistoria.svg'
import iconUstawienia from 'assets/iconUstawienia.svg'
import iconMagazyn from 'assets/iconMagazyn.svg'
import iconCTP from 'assets/iconCTP.svg'
import iconDiagnostyka from 'assets/diagnostyka.svg'
import iconInspekcja from 'assets/inspekcja.svg'
import iconOddanie from 'assets/iconOddanie2.svg'
import iconProcesy from 'assets/iconProcesy.svg'
import iconLock from 'assets/iconLock.svg'
import iconKalendarz from 'assets/iconKalendarz.svg'
import axios from "axios";
import DecodeToken from "pages/Login/DecodeToken";
import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "hooks/useOnlieStatus";
import { AppContext } from "context/AppContext";
import { getNadkomplety } from "actions/getNadkomplety";
import { getClients } from "actions/getClients";
import PanelMini from "./Mini/PanelMini";
import { IP } from "utils/Host";
import { zabezpiecz } from "actions/zabezpiecz";
import { SocketContext, useSocket } from "context/SocketContext";
import OnlineUsersList from "./Desktop/OnlineUsersList";
import PanelDesktop from "./Desktop/PanelDesktop";

export default function Panel({ user, setUser }) {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const appcontext = useContext(AppContext);
  const setNadkomplety = appcontext.setNadkomplety;
  const setClients = appcontext.setClients;
  const setClientsWyszukiwarka = appcontext.setClientsWyszukiwarka;
  // const socketContext = useContext(SocketContext);
  useEffect(() => {
    // window.onbeforeunload = function () {
    //   alert("STOP");
    // };
    getNadkomplety(setNadkomplety)
    getClients(setClients,setClientsWyszukiwarka )

  }, []);

  const logout = () => {
    navigate("/Login");
    sessionStorage.removeItem("token");
  };

  if (window.innerWidth > 900) {
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






