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
  selectedRow,
  rowID
}) {



  return (
    <div className={style.window}>
      <Header setShowAddClientPane={setShowAddClientPane}></Header>

      <Usun
      selectedRow={selectedRow}
      // deleteKlient={()=>deleteKlient("dss")}
      rowID={rowID}
        // daneKlienta={daneKlienta}
         getClients={() => getClients()}
        // test={() => test()}
      />
    </div>
  );
}

function Usun({selectedRow,rowID,getClients}) {
  async function  deleteKlient(rowID) {
    // console.log(" row id form deleteKlient ;" +rowID.current)
    await axios
      .put(ip + "klient", {
        id: rowID.current,
      })
      .then((res2) => {
        getClients();
      });
  };
  return (
    <button
      className={style.btn}
      onClick={() => {
        // console.log("selectedRow"+ rowID.current);
         deleteKlient(rowID)

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


