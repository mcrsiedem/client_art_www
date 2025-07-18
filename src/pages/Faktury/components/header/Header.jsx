import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./Header.module.css";
import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import iconAdd2 from "assets/edit.svg";
import iconCopy from "assets/edit2.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { useZamowienia } from "hooks/useZamowienia";
import REFRESH_ZAMOWIENIA_BTN from "components/REFRESH_BTN/REFRESH_ZAMOWIENIA_BTN";
import DecodeToken from "pages/Login/DecodeToken";
import { _etapy_produkcji } from "utils/initialvalue";
import BTN_INFO_ZAMOWIENIA from "./BTN_INFO_ZAMOWIENIA";
import { ModalInsertContext } from "context/ModalInsertContext";

export default function Header({ dodaj_clikHandler}) {
  const navigate = useNavigate();
  const effectRan = useRef(false);

   const contextApp = useContext(AppContext);
   const contexModal = useContext(ModalInsertContext);
   const [refreshZamowienia,odblokujZamowienie,deleteZamowienie,zmienEtapWydrukowane] = useZamowienia();
    const selectedUser = contextApp.selectedUser
    const selectedKlient = contextApp.selectedKlient
    const zamowienia = contextApp.zamowienia;
    const setZamowienia = contextApp.setZamowienia;
    const setSelectedZamowienie = contexModal.setSelectedZamowienie;
     const contextModalInsert = useContext(ModalInsertContext);
const showTabs = contextModalInsert.showTabs
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
      // console.log("selectedUser: "+ selectedUser)
      // console.log("selectedKlient: "+ selectedKlient)
     }} id="header" className={style.headerZamowieniaContainer}>
      <div className={style.leftHeaderContener}>
        {/* <p className={style.title}>Zamówienia : {contextApp.zamowienia           .filter((zam) => zam.stan==3).length} przyjętych, {contextApp.zamowienia           .filter((zam) => zam.stan==2).length} do przyjęcia </p> */}
        <REFRESH_ZAMOWIENIA_BTN/>
        <p title={contextApp.zamowienia.filter((zam) => zam.stan==3).length+ " przyjętych"} className={style.title2}>Faktury </p>
      </div>

      <div className={style.centerHeaderContener}>
        {/* {DecodeToken(sessionStorage.getItem("token")).zamowienie_zapis == 1 ?         <img
          title="Dodaj nowe zamówienie..."
          className={style.icon}
          src={iconAdd}
          onClick={() => {
setShowTabs( {parametry:false,koszty:false,historia:false,faktury:false,kreator: true})

            setSelectedZamowienie({id:1})
            dodaj_clikHandler();
          }}
          alt="React Logo"
        /> : <></>} */}



                {/* {DecodeToken(sessionStorage.getItem("token")).id == 1 ?         <img
          title="Zmien etap zamowienia"
          className={style.icon}
          src={iconAdd2}
          onClick={() => {
            // sprawdza co jest wydrukowame albo sfalcowane
            zmienEtapWydrukowane(zamowienia.filter(x=> x.technologia_id != null && x.etap != 16).map(x => {return {technologia_id: x.technologia_id, status: x.status}}  ))

          }}
          alt="React Logo"
        /> : <></>} */}


               


      </div>
      <div className={style.rightHeaderContener}>
        {/* <BTN_INFO_ZAMOWIENIA/> */}
        {/* <BTN_INFO_ZAMOWIENIA/> */}
        <BTN_KOPIUJ/>

        <SORTOWANIE_ZAMOWIENIA_ETAP/>
        <Szukaj/>
        {/* <SzukajNr/> */}
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
  const setClients = contextApp.setClients;
  const clients = contextApp.clients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
  const zamowienia = contextApp.zamowienia;
  const zamowieniaWyszukiwarka = contextApp.zamowieniaWyszukiwarka;
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
function Szukaj() {
  const contextApp = useContext(AppContext);
  const setClients = contextApp.setClients;
  const clients = contextApp.clients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
  const zamowienia = contextApp.zamowienia;
  const zamowieniaWyszukiwarka = contextApp.zamowieniaWyszukiwarka;
  const setZamowienia = contextApp.setZamowienia;
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
  return (
    <input
      className={style.szukajInput}
      type="text"
      title="Znajdź tytuł pracy..."
      placeholder="Praca..."
      onChange={(event) => {


        
        let m = [...zamowieniaWyszukiwarka];
           m =  m.filter((k) =>
            // k.tytul.toLowerCase().includes(event.target.value.toLowerCase()) 
            k.tytul.concat(" ", k.nr ).concat(" ", k.nr_stary ).concat(" ", k.lista_faktur ).concat(" ", k.lista_wz ).toLowerCase().includes(event.target.value.toLowerCase()) 
          )

        setZamowienia(
         m
        );





      }}
    ></input>
  );
}

function SzukajNr() {
  const contextApp = useContext(AppContext);
  const setClients = contextApp.setClients;
  const clients = contextApp.clients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
  const zamowienia = contextApp.zamowienia;
  const zamowieniaWyszukiwarka = contextApp.zamowieniaWyszukiwarka;
  const setZamowienia = contextApp.setZamowienia;
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
  return (
    <input
      className={style.szukajInput}
      type="text"
      title="Znajdź nr pracy..."
      placeholder="Nr..."
      onChange={(event) => {

        let m = [...zamowieniaWyszukiwarka];

        m =  m.filter((k) =>
            k.tytul.concat(" ", k.nr ).toLowerCase().includes(event.target.value.toLowerCase()) 
          )
        // let toFilter =  JSON.parse(JSON.stringify(klienciEdit))
        setZamowienia(
         m
        );
      }}
    ></input>
  );
}


function SORTOWANIE_ZAMOWIENIA_ETAP() {
  const contextApp = useContext(AppContext);
  const sortowanieZamowieniaEtap= contextApp.sortowanieZamowieniaEtap;
  const setSortowanieZamowieniaFaktury= contextApp.setSortowanieZamowieniaFaktury;
  const _sortowanieZamowienieFaktury= contextApp._sortowanieZamowienieFaktury;
  
    return (
  
        <select
          className={sortowanieZamowieniaEtap ==2 ? style.szukajInputSortBlue :style.szukajInputSort}
          value={sortowanieZamowieniaEtap}
          onChange={(event) => {
            // setSortowanieZamowieniaEtap(event.target.value)
            setSortowanieZamowieniaFaktury(event.target.value)
          }}
        >
          {contextApp._sortowanieZamowienieFaktury.map((option) => (
            <option key={option.id} value={option.id}>
            {option.nazwa}
            </option>
          ))}
        </select>
    );
  }



