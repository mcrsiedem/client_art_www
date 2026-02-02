import React, { useContext, useEffect, useState } from "react";
import { IP } from "utils/Host";
import axios from "axios";
  
import style from './PanelDesktop2.module.css';

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
import iconWykres from "assets/wykres.svg";
import iconKalkulator from "assets/calc_white2.svg";

import iconKalendarz from 'assets/iconKalendarz.svg'

import OnlineUsersList from "./OnLineUserList/OnlineUsersList";
import NawigacjaBTN from "./Nawigacja/NawigacjaBTN";
import PanelDesktopHeader from "./Header/PanelDesktopHeader";
import PanelDesktopFooter from "./Footer/PanelDesktopFooter";
import PodgladRealizacji from "./PodgladRealizacji/PodgladRealizacji";
import { useSocket } from "context/SocketContext";
import { todayMinusDniGodziny } from "actions/todayMinusDniGodziny";
import Kalkulator from "./Kalkulator/Kalkulator";
import { UIContext } from "context/UIContext";
import Card from "./Nawigacja/Card";
import { 
  Plus,  FileText, 
  Truck, 
  TrendingUp, 
  Zap, 
  Calendar, 
  Users, 
  Settings, 
  Calculator,
  CalculatorIcon,
  Layers
} from 'lucide-react';


export default function PanelDesktop2 ({isOnline,navigate,logout})  {
  const [loading, setLoading] = useState(true);
 const {  callPodgladRalizacji,  lokalizacja} = useSocket()
   const uiContext = useContext(UIContext);


   const [quickActions, setQuickActions] = useState([
      { 
        id: 1, 
        label: 'Nowe Zamówienie', 
        desc: 'Dodaj nowe zamówienie', 
        icon: <Plus size={32} />, 
        glow: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))' ,
        handle: ()=> console.log("o"),
        show: true
      },
      { 
        id: 2, 
        label: 'Papiery', 
        desc: 'Dodaj papier', 
        icon: <Layers size={32} />, 
        glow: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))' ,
        handle: ()=> console.log("o"),
        show: true
      },
      { 
        id: 3, 
        label: 'Klienci', 
        desc: 'Zarządzaj kontaktami', 
        icon: <Users size={32} />, 
        glow: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2))' ,
        handle: ()=> console.log("o"),
        show: true
      },
            { 
        id: 4, 
        label: 'Statystki', 
        desc: 'Zestawienia przelotów', 
        // icon: <TrendingUp size={32} />, 
        icon: <TrendingUp size={32} />, 
        glow: 'linear-gradient(135deg, rgba(249, 26, 22, 0.2), rgba(234, 42, 8, 0.2))' ,
        handle: ()=> {
          uiContext.setShowKalkulatorGrzbietu(prev => !prev)
      toggleActionVisibility2()
        } ,
        show: true
    
      },
      { 
        id: 5, 
        label: 'Kalkulator do grzbietów', 
        desc: 'Policz grubość grzbietu', 
        // icon: <TrendingUp size={32} />, 
        icon: <CalculatorIcon size={32} />, 
        glow: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 179, 8, 0.2))' ,
        handle: ()=> {
          uiContext.setShowKalkulatorGrzbietu(prev => !prev)
      toggleActionVisibility2()
        } ,
        show: true
    
      }

    ]);


const toggleActionVisibility = (id) => {
  setQuickActions(prevActions => 
    prevActions.map(action => 
      action.id === id ? { ...action, show: false } : action
    )
  );
};

const toggleActionVisibility2 = (id) => {
  setQuickActions(quickActions.map(action => { return {...action, show: false} }))
  
    
  
};

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

    return(
    
          <div  className={style.main} >
          <PanelDesktopHeader isOnline={isOnline} navigate={navigate} logout={logout}/>
              <Container>
                    <Left>
                      <NawigacjaBTN handler={() => navigate("/Zamowienia")} icon={iconZamowienia} nazwa={"ZAMÓWIENIA"} locked={false}/>
                      <NawigacjaBTN handler={() => navigate("/faktury")} icon={iconTechnolgie} nazwa={"FAKTURY"} locked={false}/>
                      <NawigacjaBTN handler={() => navigate("/ProcesyView")} icon={iconProcesy} nazwa={"PROCESY"} locked={false}/>
                      <NawigacjaBTN handler={() => navigate("/OprawaView")} icon={iconMagazyn} nazwa={"OPRAWA"} locked={false}/>
                      <NawigacjaBTN handler={() => navigate("/Oddania")} icon={iconOddanie} nazwa={"SPEDYCJA"} locked={false}/>
                      <NawigacjaBTN handler={() => navigate("/kalendarz2")} icon={iconKalendarz} nazwa={"KALENDARZ"} locked={false}/>
                      <NawigacjaBTN handler={() => navigate("/ustawienia")} icon={iconUstawienia} nazwa={"USTAWIENIA"} locked={false}/>
                      {/* <NawigacjaBTN handler={() => navigate("/Zestawienia")} icon={iconWykres} nazwa={"STATYSTYKI"} locked={false}/> */}
                      {/* <NawigacjaBTN handler={() =>uiContext.setShowKalkulatorGrzbietu(!uiContext.showKalkulatorGrzbietu)} icon={iconKalkulator} nazwa={"GRZBIET"} locked={false} nowe={true}/> */}
                    </Left>
                    <Right>
                        {/* <PodgladRealizacji loading={loading}/> */}
                        {/* <Card/> */}
                                    {quickActions.filter(x=> x.show == true).map((action) => (
                                          <Card action={action}/>
                                    ))}
                        
                        <OnlineUsersList />
                        {uiContext.showKalkulatorGrzbietu && <Kalkulator />}
                    </Right>
              </Container>
          <PanelDesktopFooter isOnline={isOnline} navigate={navigate} logout={logout}/>
          </div>
   

           );


};

function Container({ children }) {
  return <div className={style.container}>{children}</div>;
}

function Left({ children }) {
  return <div className={style.container_btn}>{children}</div>;
}

function Right({ children }) {
  return <div className={style.container_btn_prawy}>{children}</div>;
}
