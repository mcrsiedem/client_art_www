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

      <Zapisz
        daneKlienta={daneKlienta}
        getClients={() => getClients()}
        test={() => test()}
      />
    </div>
  );
}
const postKlient = async (daneKlienta, context, getClients, test) => {
  await axios
    .post(ip + "klienci", {
      firma: daneKlienta.firma,
      adres: daneKlienta.adres,
      kod: daneKlienta.kod,
      nip: daneKlienta.nip,
      opiekun_id: daneKlienta.opiekun_id,
      utworzyl_user_id: daneKlienta.opiekun_id,
    })
    .then((res2) => {
      getClients();
    });
};
