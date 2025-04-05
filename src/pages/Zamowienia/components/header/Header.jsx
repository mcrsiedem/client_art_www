import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./Header.module.css";
import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { sprawdzDostepUzytkownicy } from "actions/sprawdzDostepUzytkownicy";
import DecodeToken from "pages/Login/DecodeToken";

export default function Header({ dodaj_clikHandler}) {
  const navigate = useNavigate();
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <header id="header" className={style.headerZamowieniaContainer}>
      <div className={style.leftHeaderContener}>
        <p className={style.title}>Zamówienia </p>
      </div>

      <div className={style.centerHeaderContener}>
        <img
          title="Dodaj nowe zamówienie..."
          className={style.icon}
          src={iconAdd}
          onClick={() => {
            dodaj_clikHandler();
          }}
          alt="React Logo"
        />
      </div>
      <div className={style.rightHeaderContener}>
        <SELECT_OPIEKUN_ZAMOWWIENIA/>
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


function SELECT_OPIEKUN_ZAMOWWIENIA() {
  const contextApp = useContext(AppContext);
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const selectedUser= contextApp.selectedUser;
  const setSelectedUser= contextApp.setSelectedUser;
  if(DecodeToken(sessionStorage.getItem("token")).zamowienia_wszystkie==1){
        return (
        <select
        className={style.select_opiekun_zamowienia}
        value={selectedUser}
        onChange={(event) => {
          setSelectedUser(event.target.value)
            // setDaneKlienta({...daneKlienta, opiekun_id: event.target.value});
     
        }}
      >
                  {   <option value = "0"  >
             Wszyscy 
            </option>}
        {contextApp.users
        .map((option) => (
          <option key={option.id} value={option.id}>
          {option.Imie} {option.Nazwisko} 
          </option>
        ))}
      </select>
    );
  }

  }