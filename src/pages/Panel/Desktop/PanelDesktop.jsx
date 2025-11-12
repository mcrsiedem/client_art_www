import React, { useEffect, useState } from "react";
import { IP } from "utils/Host";
import axios from "axios";
  
import style from './PanelDesktop.module.css';

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

import iconKalendarz from 'assets/iconKalendarz.svg'

import OnlineUsersList from "./OnLineUserList/OnlineUsersList";
import NawigacjaBTN from "./Nawigacja/NawigacjaBTN";
import PanelDesktopHeader from "./Header/PanelDesktopHeader";
import PanelDesktopFooter from "./Footer/PanelDesktopFooter";
import PodgladRealizacji from "./PodgladRealizacji/PodgladRealizacji";
import { useSocket } from "context/SocketContext";
import { todayMinusDniGodziny } from "actions/todayMinusDniGodziny";


export default function PanelDesktop ({isOnline,navigate,logout})  {
  const [loading, setLoading] = useState(true);
 const {  callPodgladRalizacji,  lokalizacja} = useSocket()

  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {

// callPodgladRalizacji(todayMinusDniGodziny(1)) // callPodgladRalizacji("2025-10-10 18:00")

        } else {
          navigate("/Login");
        }
      });
  }




  useEffect(() => {
    checkToken();
    lokalizacja.current = "Panel";

    return () => {
      lokalizacja.current = null;
    };
  }, []);

    return(<>
                <div  className={style.main} >
                <PanelDesktopHeader isOnline={isOnline} navigate={navigate} logout={logout}/>
                        <div className={style.container} >
                        <div className={style.container_btn} >
                                <NawigacjaBTN handler={() => navigate("/Zamowienia")} icon={iconZamowienia} nazwa={"ZAMÓWIENIA"} locked={false}/>
                                <NawigacjaBTN handler={() => navigate("/faktury")} icon={iconTechnolgie} nazwa={"FAKTURY"} locked={false}/>
                                <NawigacjaBTN handler={() => navigate("/ProcesyView")} icon={iconProcesy} nazwa={"PROCESY"} locked={false}/>
                                <NawigacjaBTN handler={() => navigate("/OprawaView")} icon={iconMagazyn} nazwa={"OPRAWA"} locked={false}/>
                                <NawigacjaBTN handler={() => navigate("/Oddania")} icon={iconOddanie} nazwa={"SPEDYCJA"} locked={false}/>
                                <NawigacjaBTN handler={() => navigate("/kalendarz2")} icon={iconKalendarz} nazwa={"KALENDARZ"} locked={false}/>
                                <NawigacjaBTN handler={() => navigate("/ustawienia")} icon={iconUstawienia} nazwa={"USTAWIENIA"} locked={false}/>
                                <NawigacjaBTN handler={() => navigate("/Panel")} icon={iconHistoria} nazwa={"HISTORIA"} locked={true}/>
                        </div >
                        < div className={style.container_btn_prawy}> 
                        {/* <PodgladRealizacji loading={loading}/> */}
                        <OnlineUsersList />
                        </div>
                        </div>
                <PanelDesktopFooter isOnline={isOnline} navigate={navigate} logout={logout}/>

                </div>
            </>);


};





