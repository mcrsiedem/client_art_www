import style from "./KosztyDodatkowe.module.css";
import TableKoszty from "./components/TableKoszty";
import { ModalInsertContext } from "context/ModalInsertContext";
import React, { useContext } from "react";

import DodajKoszty from "./components/DodajKoszty";
export default function KosztyDodatkowe({ handleChangeCardPakowanie }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const kosztyDodatkoweZamowienia =
    contextModalInsert.kosztyDodatkoweZamowienia;

  const showTabs = contextModalInsert.showTabs;

  if (showTabs.koszty) {

    return (
      <div className={style.container}>
        <div className={style.pakowanie}>
          <TableKoszty /> 
        </div>
      </div>
    );
  }
}
