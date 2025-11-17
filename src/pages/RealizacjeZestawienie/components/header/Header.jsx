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
import { useZestawienia } from "hooks/useZestawienia";

export default function Header({ dataDo,dataOd,setDataDo,setDataOd,kto,setKto}) {
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

       
          <User kto={kto} setKto={setKto} dataDo={dataDo} dataOd={dataOd}/>
<DataOd dataOd={dataOd} dataDo={dataDo} kto={kto} setDataOd={setDataOd}/>

<DataDo dataOd={dataOd} dataDo={dataDo} kto={kto} setDataDo={setDataDo}/>


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

function DataOd({ dataOd, dataDo, setDataOd, kto }) {
  const { refreshRealizacjeZestawienie } = useZestawienia();

  return (
    <div className={style.col}>
      <input
        className={style.selectDataWyswietlania}
        type="date"
        value={dataOd}
        onChange={(event) => {
          setDataOd(event.target.value);
          refreshRealizacjeZestawienie(event.target.value, dataDo, kto);
        }}
      ></input>
    </div>
  );
}


function DataDo({ dataDo, dataOd, setDataDo, kto }) {
  const { refreshRealizacjeZestawienie } = useZestawienia();

  return (
    <div className={style.col}>
      <input
        className={style.selectDataWyswietlania}
        type="date"
        value={dataDo}
        onChange={(event) => {
          refreshRealizacjeZestawienie(dataOd, event.target.value, kto);
          setDataDo(event.target.value);
        }}
      ></input>
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
