import React, { useState, useContext } from "react";
import style from "./DeleteClient.module.css";
import TokenContext from "../../Context/tokenContext";
import axios from "axios";
import { ip } from "../../../Host";
import { deleteClient } from "../actions/deleteClient";

import { _opiekun } from "../../Zamowienia/ModalInsert/api";
import iconX from "../../../svg/x.svg";
export default function AddClient({
  isShowAddClientPane,
  setShowAddClientPane,
  getClients,
  test,
  selectedRow,
  rowID,
}) {
  return (
    <div className={style.window}>
      <Header setShowAddClientPane={setShowAddClientPane}></Header>

      <Usun
        selectedRow={selectedRow}
        rowID={rowID}
        getClients={() => getClients()}
      />
    </div>
  );
}

function Usun({ rowID, getClients }) {

  return (
    <button
      className={style.btn}
      onClick={() => {
        deleteClient(rowID, getClients);
      }}
    >
      Skasuj
    </button>
  );
}

function Header({ showAddClientStage }) {
  return (
    <div className={style.header}>
      <p className={style.title}>Skasuj..</p>
    </div>
  );
}
