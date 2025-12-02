import React, {  } from "react";


import { _etap_plikow, _status_wydania_papieru, _typ_elementu } from "utils/initialvalue";
import style from "../ProcesViewRow.module.css";
import { _status } from "utils/initialvalue";

// import TytulProcesGrup from "./components/TytulProcesGrup";


export default function TytulProcesGrup ({ grup }) {
  //nazwa_elementu
  return (
    <td>
    <input
      //firma_nazwa to skrocona nazwa klienta
      title={grup.Praca}
      className={style.tytulInput}
      value={grup.nr_stary+ " "+grup.tytul +' '+grup.nazwa_elementu}
      readOnly

    />
    </td>
  );
};