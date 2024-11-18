import React, { useState, useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./ChangeClient.module.css";


import iconX from "../../../assets/x.svg";
export default function ChangeClient({
  setShowChange,

  rowID,
  daneZamowienia, setDaneZamowienia

}) {


  return (
    <div className={style.window}>
      <Header setShowChange={setShowChange} rowID={rowID}></Header>
      <p className={style.alert_label}>{rowID.current.firma}</p>
      <Zmien  rowID={rowID} setDaneZamowienia={setDaneZamowienia} daneZamowienia={daneZamowienia} setShowChange={setShowChange} />

    </div>
  );
}

function Zmien({ rowID,setShowChange,daneZamowienia,setDaneZamowienia}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return (
    <button
      className={style.btn_delete}
      onClick={() => {
       
        // deleteClient(rowID, getClients,setShowDeleteClientPane)
     
          setDaneZamowienia({ ...daneZamowienia, klient_id: rowID.current.id })
          setShowChange(false)
          setSaveButtonDisabled(false)
        
      }}
    >
      Zmień
    </button>
  );
}


function Header({ setShowChange,rowID }) {
  return (
    <div className={style.header}>
      <p className={style.title}>Zmień aktualnego klienta na: </p>
      <Zamknij setShowChange={setShowChange}/>
    </div>
  );
}
function Zamknij({ setShowChange }) {
  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        setShowChange(false);
      }}
      alt="Procesy"
    />
  );
}
