import React, { useState, useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./ChangeClient.module.css";


import iconX from "../../../assets/x.svg";
export default function ChangeClient({
  parent,
  setShowChange,

  rowID,
  daneZamowienia, setDaneZamowienia

}) {


  return (
    <div className={style.grayScaleBackground}>
    <div className={style.window}>
      <Header setShowChange={setShowChange} rowID={rowID}></Header>
      <div className={style.footer}>

      <p className={style.alert_label}>{rowID.current.firma}</p>
    </div>
    <div className={style.footer}>
      <Zmien parent={parent} rowID={rowID} setDaneZamowienia={setDaneZamowienia} daneZamowienia={daneZamowienia} setShowChange={setShowChange} />

    </div>
    </div>
    </div>
  );
}

function Zmien({ parent,rowID,setShowChange,daneZamowienia,setDaneZamowienia}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return (
    <button
      className={style.btn_delete}

      onClick={() => {
       
        if(parent=="modalinsert"){
               // deleteClient(rowID, getClients,setShowDeleteClientPane)
     
          setDaneZamowienia({ ...daneZamowienia, klient_id: rowID.current.id })
          setShowChange(false)
          setSaveButtonDisabled(false)
        
        }
   
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
