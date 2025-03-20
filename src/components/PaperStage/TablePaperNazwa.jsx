import React, { useState, useRef,useContext } from "react";
import style from "./TablePaperNazwa.module.css";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import PaperNazwaRow from "./PaperNazwaRow";

export default function TablePaperNazwa({
  selectRow,setSelectRow,
  paperSelectView,
  setPaperSelectView,
  setBtnZapisz,
  setSelectTable

}) {

      // aktualnie zaznaczona tabela do scrollowania 
      const inputElement = useRef();

      const appcontext = useContext(AppContext);
      const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;

      
      if(paperSelectView[1].view == true){
  return (
    <div ref={inputElement} className={style.main}>
      <table  className={style.table2}>
        <thead>
          <tr>
            <th className={style.id}></th>
            <th className={style.info}>#</th>
            <th className={style.info}>Nazwa papieru</th>
            <th className={style.info}>Nazwa papieru</th>
            <th className={style.info}>Nazwa papieru</th>

          </tr>
        </thead>
        <tbody   className={style.center}>
          {listaPapierowNazwyWyszukiwarka?.map((rowPapierNazwy, index) => {
            return (
              // <tr className={row.insert ? style.tr_insert : style.tr}
              <PaperNazwaRow  rowPapierNazwy={rowPapierNazwy} setPaperSelectView={setPaperSelectView} paperSelectView={paperSelectView} selectRow={selectRow} index={index} setBtnZapisz={setBtnZapisz} setSelectRow={setSelectRow} setSelectTable={setSelectTable} inputElement={inputElement}/>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

}
