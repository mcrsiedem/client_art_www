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
import { _etapy_produkcji, _users_grupa } from "utils/initialvalue";
import BTN_INFO_ZAMOWIENIA from "./BTN_INFO_ZAMOWIENIA";
import { ModalInsertContext } from "context/ModalInsertContext";
import { zabezpiecz } from "actions/zabezpiecz";
import Szukaj from "./Szukaj";
import BTN_DIAGNOSTYKA from "./BTN_INSPEKCJA";
import BTN_INSPEKCJA from "./BTN_INSPEKCJA";
import { TechnologyContext } from "context/TechnologyContext";
import { useZestawienia } from "hooks/useZestawienia";
import Tabs from "../tabs/Tabs";

export default function Header({ dataDo,dataOd,setDataDo,setDataOd,kto,setKto,grupa,setGrupa}) {
  const navigate = useNavigate();
  const effectRan = useRef(false);

   const contextApp = useContext(AppContext);
   const contexModal = useContext(ModalInsertContext);
    const setSelectedZamowienie = contexModal.setSelectedZamowienie;
     const contextModalInsert = useContext(ModalInsertContext);
const setShowTabs = contextModalInsert.setShowTabs
  const realizacjeZestawienie = contextApp.realizacjeZestawienie
  const realizacjeZestawienieKlienci = contextApp.realizacjeZestawienieKlienci

  return (
    <header onDoubleClick={()=>{  
console.table(realizacjeZestawienieKlienci)
     }} id="header" className={style.headerZamowieniaContainer}>
      <div className={style.leftHeaderContener}>
        {/* <REFRESH_ZAMOWIENIA_BTN/> */}
        <p title={contextApp.zamowienia.filter((zam) => zam.stan==3).length+ " przyjętych"} className={style.title2}>Zestawienia realizacji </p>
    
      </div>

      <div className={style.centerHeaderContener}>

       
          <User kto={kto} setKto={setKto} dataDo={dataDo} dataOd={dataOd}/>
          <Dzialy kto={kto} setKto={setKto} dataDo={dataDo} dataOd={dataOd} grupa={grupa} setGrupa={setGrupa}/>

          <DataOd dataOd={dataOd} dataDo={dataDo} kto={kto} setDataOd={setDataOd} grupa={grupa} setGrupa={setGrupa}/>
          <DataDo dataOd={dataOd} dataDo={dataDo} kto={kto} setDataDo={setDataDo} grupa={grupa} setGrupa={setGrupa}/>
          <BTN_ROK  rok={2025} setDataOd={setDataOd} setDataDo={setDataDo}/>
          <BTN_ROK  rok={2026} setDataOd={setDataOd} setDataDo={setDataDo}/>


      </div>
      <div className={style.rightHeaderContener}>
        {/* <BTN_INSPEKCJA/>
        <BTN_INFO_ZAMOWIENIA/> */}
        {/* <BTN_KOPIUJ/>
        <SORTOWANIE_ZAMOWIENIA_ETAP/> */}
        {/* <Szukaj/> */}

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



function User({kto, setKto,dataDo,dataOd}) {
  const contextApp = useContext(AppContext);
  const selectedUser = contextApp.selectedUser;
  const setSelectedUser = contextApp.setSelectedUser;
  const setSelectedKlient = contextApp.setSelectedKlient;
const {refreshRealizacjeZestawienie} = useZestawienia()
  const showTabsRealizacje = contextApp.showTabsRealizacje

  if(showTabsRealizacje.osoby){
        return (
      <select
        className={style.user}
        value={kto}
        onChange={(event) => {

          setKto(event.target.value);
            refreshRealizacjeZestawienie(dataOd,dataDo,event.target.value);
        }}
      >
        {<option value="0">Wybierz pracownika</option>}

        {contextApp.users?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.Imie} {option.Nazwisko}
          </option>
        ))}
      </select>
    );
  }


}



function Dzialy({kto, setKto,dataDo,dataOd,grupa,setGrupa}) {
  const contextApp = useContext(AppContext);
  const selectedUser = contextApp.selectedUser;
  const setSelectedUser = contextApp.setSelectedUser;
  const setSelectedKlient = contextApp.setSelectedKlient;
const {refreshRealizacjeZestawienieGrupa} = useZestawienia()
  const showTabsRealizacje = contextApp.showTabsRealizacje

  let lista_dostepnych_grup =[5,8,10]
// 1	Zarząd
// 2	Opiekun Klienta
// 3	Planowanie
// 4	CTP
// 5	Drukarze
// 6	Pomocnicy
// 7	Introligatornia
// 8	Falcowanie
// 9	Krajacze
// 10	Uszlachetnianie
// 11	Magazyn
// 12	Kierowcy
// 13	Księgowość
// 14	Administrator

  if(showTabsRealizacje.grupy){
        return (
      <select
        className={style.user}
        value={grupa}
        onChange={(event) => {

          setGrupa(event.target.value);
            refreshRealizacjeZestawienieGrupa(dataOd,dataDo,event.target.value);
        }}
      >
        {<option value="0">Wybierz grupe</option>}

        {_users_grupa.filter(x=> lista_dostepnych_grup.includes(x.id)).map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    );
  }


}


function DataOd({ dataOd, dataDo, setDataOd, kto,grupa,setGrupa }) {
   const { refreshRealizacjeZestawienie,refreshRealizacjeZestawienieGrupa,refreshRealizacjeZestawienieProcesory,refreshRealizacjeZestawienieKlienci,refreshRealizacjeZestawienieKlienciWartosc } = useZestawienia();
  const contextApp = useContext(AppContext);
  const showTabsRealizacje = contextApp.showTabsRealizacje

  return (
    <div className={style.col}>
      <input
        className={style.selectDataWyswietlania}
        type="date"
        value={dataOd}
        onChange={(event) => {
          setDataOd(event.target.value);
           if(showTabsRealizacje.osoby){
             refreshRealizacjeZestawienie(event.target.value, dataDo, kto);
           }

          if(showTabsRealizacje.grupy){
             refreshRealizacjeZestawienieGrupa(event.target.value, dataDo, grupa);
           }


          if(showTabsRealizacje.maszyny){
            refreshRealizacjeZestawienieProcesory(event.target.value, dataDo);
          }

                 if(showTabsRealizacje.klienci){
            // refreshRealizacjeZestawienieKlienci(event.target.value, dataDo);
            refreshRealizacjeZestawienieKlienciWartosc(event.target.value, dataDo);
            
          }


        }}
      ></input>
    </div>
  );
}


function DataDo({ dataDo, dataOd, setDataDo, kto,grupa,setGrupa }) {
  const { refreshRealizacjeZestawienie,refreshRealizacjeZestawienieGrupa,refreshRealizacjeZestawienieProcesory,refreshRealizacjeZestawienieKlienci,refreshRealizacjeZestawienieKlienciWartosc } = useZestawienia();
  const contextApp = useContext(AppContext);
  const showTabsRealizacje = contextApp.showTabsRealizacje


  return (
    <div className={style.col}>
      <input
        className={style.selectDataWyswietlania}
        type="date"
        value={dataDo}
        onChange={(event) => {
           if(showTabsRealizacje.osoby){
             refreshRealizacjeZestawienie(dataOd, event.target.value, kto);
           }

                 if(showTabsRealizacje.grupy){
             refreshRealizacjeZestawienieGrupa(dataOd, event.target.value, grupa);
           }

              if(showTabsRealizacje.maszyny){
            refreshRealizacjeZestawienieProcesory(dataOd,event.target.value);
          }

                        if(showTabsRealizacje.klienci){
            // refreshRealizacjeZestawienieKlienci(dataOd,event.target.value);
            refreshRealizacjeZestawienieKlienciWartosc(dataOd,event.target.value);
          }

          setDataDo(event.target.value);
        }}
      ></input>
    </div>
  );
}

function BTN_ROK({rok,setDataOd,setDataDo}) {
  const contextApp = useContext(AppContext);
  const { refreshRealizacjeZestawienie,refreshRealizacjeZestawienieGrupa,refreshRealizacjeZestawienieProcesory,refreshRealizacjeZestawienieKlienci,refreshRealizacjeZestawienieKlienciWartosc } = useZestawienia();
  const showTabsRealizacje = contextApp.showTabsRealizacje
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));

    if(showTabsRealizacje.klienci){
  return (
<button
          title="Skopiuj zaznaczone..."
          className={style.rok_btn}
          // src={iconCopy}
          onClick={() => {
            let dataOd,dataDo

            switch(rok){
               case 2025 : 
                            dataOd = '2025-01-01'
                            dataDo = '2025-12-31'
               break;
                      case 2026 : 
                            dataOd = '2026-01-01'
                            dataDo = '2026-12-31'
               break;
            }
          
setDataOd(dataOd)
setDataDo(dataDo)
            refreshRealizacjeZestawienieKlienciWartosc(dataOd,dataDo);
          

          }}
          alt="React Logo"
        > {rok}
        </button>
  );
}
}


