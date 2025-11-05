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
import { TechnologyContext } from "context/TechnologyContext";

export default function Header({ dataDo,dataOd,setDataDo,setDataOd}) {
  const navigate = useNavigate();
  const effectRan = useRef(false);

   const contextApp = useContext(AppContext);
   const contexModal = useContext(ModalInsertContext);
    const setSelectedZamowienie = contexModal.setSelectedZamowienie;
     const contextModalInsert = useContext(ModalInsertContext);
const setShowTabs = contextModalInsert.setShowTabs

  useEffect(() => {
    if (effectRan.current === true) {
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <header onDoubleClick={()=>{  
     }} id="header" className={style.headerZamowieniaContainer}>
      <div className={style.leftHeaderContener}>
        {/* <REFRESH_ZAMOWIENIA_BTN/> */}
        <p title={contextApp.zamowienia.filter((zam) => zam.stan==3).length+ " przyjętych"} className={style.title2}>Zestawienia realizacji </p>
      </div>

      <div className={style.centerHeaderContener}>
<DataOd dataOd={dataOd}/>
<DataDo dataDo={dataDo}/>


      </div>
      <div className={style.rightHeaderContener}>
        {/* <BTN_INSPEKCJA/>
        <BTN_INFO_ZAMOWIENIA/> */}
        {/* <BTN_KOPIUJ/>
        <SORTOWANIE_ZAMOWIENIA_ETAP/> */}
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


function DataOd({dataOd,setDataOd}){
    const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor2 = techContext.fechGrupyAndWykonaniaForProcesor2
  const fechGrupyAndWykonaniaForProcesor_dni_wstecz = techContext.fechGrupyAndWykonaniaForProcesor_dni_wstecz
  
  const dniWstecz = techContext.dniWstecz;
  const setDniWstecz = techContext.setDniWstecz;
  const selectedProcesor = techContext.selectedProcesor


  return(
      <div className={style.col}>
      <input className={style.selectDataWyswietlania} type="date"
         value={dataOd}
        //  disabled= {DecodeToken(sessionStorage.getItem("token")).zamowienie_przyjmij==1? false:true}
         onChange={(event) => {

          // fechGrupyAndWykonaniaForProcesor2(selectedProcesor,event.target.value) 
          // fechGrupyAndWykonaniaForProcesor_dni_wstecz(selectedProcesor,event.target.value) 
          
          // setDniWstecz( event.target.value);
         }}></input>
    </div>
  );
}


function DataDo({dataDo,setDataDo}){
    const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor2 = techContext.fechGrupyAndWykonaniaForProcesor2
  const fechGrupyAndWykonaniaForProcesor_dni_wstecz = techContext.fechGrupyAndWykonaniaForProcesor_dni_wstecz
  
  const dniWstecz = techContext.dniWstecz;
  const setDniWstecz = techContext.setDniWstecz;
  const selectedProcesor = techContext.selectedProcesor


  return(
      <div className={style.col}>
      <input className={style.selectDataWyswietlania} type="date"
         value={dataDo}
        //  disabled= {DecodeToken(sessionStorage.getItem("token")).zamowienie_przyjmij==1? false:true}
         onChange={(event) => {

          // fechGrupyAndWykonaniaForProcesor2(selectedProcesor,event.target.value) 
          // fechGrupyAndWykonaniaForProcesor_dni_wstecz(selectedProcesor,event.target.value) 
          
          // setDniWstecz( event.target.value);
         }}></input>
    </div>
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
    return (
  
        <select
          className={sortowanieZamowieniaEtap ==2 ? style.szukajInputSortBlue :style.szukajInputSort}
          value={sortowanieZamowieniaEtap}
          onChange={(event) => {
            setSortowanieZamowieniaEtap(event.target.value)
          }}
        >
          {contextApp._sortowanieZamowienieEtap.map((option) => (
            <option key={option.id} value={option.id}>
            {option.nazwa}
            </option>
          ))}
        </select>
    );
  }
