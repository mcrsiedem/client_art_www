import style from "./Faktury.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import React, { useContext } from "react";
import TableFaktury from "./components/TableFaktury";

export default function Faktury() {
  const contextModalInsert = useContext(ModalInsertContext);
  const showTabs = contextModalInsert.showTabs;

  if (showTabs.faktury) {

    return (
      <div className={style.container}>
        <div className={style.pakowanie}>
          <TableFaktury /> 
        </div>
      </div>
    );
  }
}
