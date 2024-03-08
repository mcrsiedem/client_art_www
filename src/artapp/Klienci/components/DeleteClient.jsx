import React, { useState, useContext } from "react";
import style from "./DeleteClient.module.css";
import TokenContext from "../../Context/tokenContext";
import axios from "axios";
import { ip } from "../../../Host";

import { _opiekun } from "../../Zamowienia/ModalInsert/api";
import iconX from "../../../svg/x.svg";
export default function AddClient({
  isShowAddClientPane,
  setShowAddClientPane,
  getClients,
  test,
}) {

  const deleteKlient = async (id) => {
    await axios
      .put(ip + "klient", {
        id: id,
      })
      .then((res2) => {
        getClients();
      });
  };

  return (
    <div className={style.window}>
      <Header setShowAddClientPane={setShowAddClientPane}></Header>

      <Usun
        // daneKlienta={daneKlienta}
        // getClients={() => getClients()}
        // test={() => test()}
      />
    </div>
  );
}


function Header({ showAddClientStage }) {
  return (
    <div className={style.header}>
      <p className={style.title}>Lista klientów </p>
  
    </div>
  );
}


function Usun() {

    return (
      <button
        className={style.btn}
        onClick={() => {
            
  

        }}
      >
        Zapisz
      </button>
    );
  }