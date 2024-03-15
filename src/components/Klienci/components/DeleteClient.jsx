import React, { useState, useContext } from "react";
import style from "./DeleteClient.module.css";
import TokenContext from "../../../context/tokenContext";
import axios from "axios";
import { IP } from "../../../Host";
import { deleteClient } from "../actions/deleteClient";

import { _opiekun } from "../../../pages/Zamowienia/ModalInsert/api";
import iconX from "../../../svg/x.svg";
export default function DeleteClient({
  setShowDeleteClientPane,
  getClients,
  rowID,

}) {
  return (
    <div className={style.window}>
      <Header setShowDeleteClientPane={setShowDeleteClientPane} rowID={rowID}></Header>
      <p className={style.alert_label}>{rowID.current.firma}</p>
      <Usun  rowID={rowID} getClients={() => getClients()} setShowDeleteClientPane={setShowDeleteClientPane} />

    </div>
  );
}

function Usun({ rowID, getClients,setShowDeleteClientPane,daneZamowienia}) {
  return (
    <button
      className={style.btn_delete}
      onClick={() => {
       
        deleteClient(rowID, getClients,setShowDeleteClientPane)
        
        
      }}
    >
      Skasuj
    </button>
  );
}


function Header({ setShowDeleteClientPane,rowID }) {
  return (
    <div className={style.header}>
      <p className={style.title}>Skasować? </p>
      <Zamknij setShowDeleteClientPane={setShowDeleteClientPane}/>
    </div>
  );
}
function Zamknij({ setShowDeleteClientPane }) {
  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        setShowDeleteClientPane(false);
      }}
      alt="Procesy"
    />
  );
}
