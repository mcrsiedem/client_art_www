import React, { useState, useContext } from "react";
import style from "./DeleteClient.module.css";
import { deleteClient } from "../actions/deleteClient";

import iconX from "../../../assets/x.svg";
import { AppContext } from "context/AppContext";
export default function DeleteClient({
  setShowDeleteClientPane,
  getClients,
  rowID,

}) {
  return (
    <div className={style.grayScaleBackground}>
    <div className={style.window}>
      <Header setShowDeleteClientPane={setShowDeleteClientPane} rowID={rowID}></Header>
      <div className={style.footer}>
        <p className={style.alert_label}>{rowID.current.firma}</p> 
      </div>
     


            <div className={style.footer}>
            <Usun  rowID={rowID}  setShowDeleteClientPane={setShowDeleteClientPane} />

          </div>



    </div>
    </div>
  );
}

function Usun({ rowID,setShowDeleteClientPane}) {
  const contextApp = useContext(AppContext);
  const setClients = contextApp.setClients;
  const setClientsWyszukiwarka = contextApp.setClientsWyszukiwarka;
  return (
    <button
      className={style.btn_delete}
      onClick={() => {
       
        deleteClient(rowID, setClients,setClientsWyszukiwarka ,setShowDeleteClientPane)
        
        
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
