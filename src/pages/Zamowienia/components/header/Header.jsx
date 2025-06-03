import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./Header.module.css";
import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { useZamowienia } from "hooks/useZamowienia";
import REFRESH_ZAMOWIENIA_BTN from "components/REFRESH_BTN/REFRESH_ZAMOWIENIA_BTN";
import DecodeToken from "pages/Login/DecodeToken";

export default function Header({ dodaj_clikHandler}) {
  const navigate = useNavigate();
  const effectRan = useRef(false);

   const contextApp = useContext(AppContext);
    const selectedUser = contextApp.selectedUser
    const selectedKlient = contextApp.selectedKlient

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
        <p title={contextApp.zamowienia.filter((zam) => zam.stan==3).length+ " przyjętych"} className={style.title2}>Zamówienia </p>
      </div>

      <div className={style.centerHeaderContener}>
        {DecodeToken(sessionStorage.getItem("token")).zamowienie_zapis == 1 ?         <img
          title="Dodaj nowe zamówienie..."
          className={style.icon}
          src={iconAdd}
          onClick={() => {
            dodaj_clikHandler();
          }}
          alt="React Logo"
        /> : <></>}

      </div>
      <div className={style.rightHeaderContener}>
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
            k.tytul.concat(" ", k.nr ).concat(" ", k.nr_stary ).toLowerCase().includes(event.target.value.toLowerCase()) 
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



