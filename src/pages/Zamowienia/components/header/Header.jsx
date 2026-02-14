import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./Header.module.css";
import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import iconAdd2 from "assets/edit3.svg";
import iconCopy from "assets/edit2.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import REFRESH_ZAMOWIENIA_BTN from "components/REFRESH_BTN/REFRESH_ZAMOWIENIA_BTN";
import DecodeToken from "pages/Login/DecodeToken";
import { _etapy_produkcji } from "utils/initialvalue";
import BTN_INFO_ZAMOWIENIA from "./BTN_INFO_ZAMOWIENIA";
import { ModalInsertContext } from "context/ModalInsertContext";
import { zabezpiecz } from "actions/zabezpiecz";
import Szukaj from "./Szukaj";
import BTN_DIAGNOSTYKA from "./BTN_INSPEKCJA";
import BTN_INSPEKCJA from "./BTN_INSPEKCJA";
import { useZamowienia } from "hooks/useZamowienia";
import { 
  Settings, 
  Columns4Icon,
  FileText, 
  ChevronDown, 
  ChevronUp,
  X,
  Search,
  Filter
} from "lucide-react";

export default function Header({ dodaj_clikHandler,showSettings, setShowSettings}) {
  const navigate = useNavigate();
  const effectRan = useRef(false);

   const contextApp = useContext(AppContext);
   const contexModal = useContext(ModalInsertContext);
    const setSelectedZamowienie = contexModal.setSelectedZamowienie;
     const contextModalInsert = useContext(ModalInsertContext);
const setShowTabs = contextModalInsert.setShowTabs



  return (
    <header onDoubleClick={()=>{  
            console.log("--------")
      console.log("contextApp.sortowanieZamowienia.current : "+contextApp.sortowanieZamowienia.current)
      console.log("contextApp.zestawZamowienia.current: "+contextApp.zestawZamowienia.current)
      console.log("DecodeToken ",DecodeToken(sessionStorage.getItem("token")))
     }} id="header" className={style.headerZamowieniaContainer}>
      <div className={style.leftHeaderContener}>
        <REFRESH_ZAMOWIENIA_BTN/>
        <p title={contextApp.zamowienia.filter((zam) => zam.stan==3).length+ " przyjętych"} className={style.title2}>Zamówienia </p>
                <button 
                 style={{background:'transparent', border:'none', marginLeft:'10px'}}
          onClick={() => setShowSettings(!showSettings)}
          // className={`${styles.btnSettings} ${showSettings ? styles.btnSettingsActive : ''}`}
        >
          <Columns4Icon style={{color:'#ffffff6b'}} size={25} />
        </button>
      </div>

      <div className={style.centerHeaderContener}>
        {DecodeToken(sessionStorage.getItem("token")).zamowienie_zapis == 1 ?         <img
          title="Dodaj nowe zamówienie..."
          className={style.icon}
          src={iconAdd2}
          onClick={() => {
            setShowTabs( {parametry:false,koszty:false,historia:false,faktury:false,kreator: true})
            setSelectedZamowienie({id:1})
            dodaj_clikHandler();
          }}
          alt="React Logo"
        /> : <></>}

      </div>
      <div className={style.rightHeaderContener}>
        <BTN_INSPEKCJA/>
        <BTN_INFO_ZAMOWIENIA/>
        <BTN_KOPIUJ/>
        <SORTOWANIE_ZAMOWIENIA_ETAP/>
        <Szukaj/>
        <img
          className={style.icon2}
          src={iconClose2}
          onClick={() => {
            navigate("/Panel");
          }}
          alt="React Logo"
        />
      </div>
    </header>
  );
}



function BTN_KOPIUJ() {
  const contextApp = useContext(AppContext);
  const zamowienia = contextApp.zamowienia;
  const setZamowienia = contextApp.setZamowienia;
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
  return (
<img
          title="Skopiuj zaznaczone..."
          className={style.icon}
          src={iconCopy}
          onClick={() => {
  
let mes='';


            for( let grupa of zamowienia.filter(x=> x.select == true)){
            // for( let grupa of zamowienia){
              mes += grupa.nr+"\t"
              mes +=  grupa.stary_nr || " "+"\t"
              mes += grupa.klient+"\t"
              mes += grupa.tytul+"\t"
              mes += grupa.naklad+"\t"
              mes += grupa.ilosc_stron+"\t"
              mes += grupa.data_przyjecia+"\t"
              mes += grupa.data_spedycji+"\t"
              mes += grupa.format_x+"x"+grupa.format_y+"\t"
              mes += grupa.oprawa+"\t"
              mes += _etapy_produkcji.filter((s) => s.id == grupa.etap).map((x) => x.nazwa)+"\t"
              mes += grupa.opiekun+"\t"
              
              // mes += grupa.przeloty+ " ark. \t"
              mes += "\n"

            }

            setZamowienia(
              zamowienia.map((t) => {
                  return { ...t, select: false};
              })
            );

            navigator.clipboard.writeText(mes);
          }}
          alt="React Logo"
        /> 
  );
}

function SORTOWANIE_ZAMOWIENIA_ETAP() {
  const contextApp = useContext(AppContext);
  const sortowanieZamowieniaEtap= contextApp.sortowanieZamowieniaEtap;
  const setSortowanieZamowieniaEtap= contextApp.setSortowanieZamowieniaEtap;
  const zestawZamowienia= contextApp.zestawZamowienia;
  const setIsLoading= contextApp.setIsLoading;
  const {refreshZamowienia} = useZamowienia();
  const navigate = useNavigate();
    return (
  
        <select
          className={sortowanieZamowieniaEtap ==2 ? style.szukajInputSortBlue :style.szukajInputSort}
          value={sortowanieZamowieniaEtap}
          onChange={(event) => {

            if(event.target.value=="Proofy"){
      navigate("/proofy");

            }
            else{
                    const promiseA = new Promise((resolve, reject) => {
            setIsLoading(true)
            setSortowanieZamowieniaEtap(event.target.value)
            zestawZamowienia.current= event.target.value
  
                      resolve(777);
                    })

                            promiseA.then(res => {

          refreshZamowienia();
        })
            }
    





          }}
        >
          {contextApp._sortowanieZamowienieEtap.map((option) => (
            <option key={option.id} value={option.nazwa}>
            {option.nazwa}
            </option>
          ))}
        </select>
    );
  }
