import React, {useContext } from "react";
import { AppContext } from "context/AppContext";
import style from "./ProcesyOprawa.module.css";
import Logo_ustawienia from "assets/settings.svg";

import { _typ_elementu } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";


export default  function ProcesyOprawa({ row}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const procesyElementow =contextModalInsert.procesyElementow;
  const setProcesyElementowTemporary =contextModalInsert.setProcesyElementowTemporary;

    return (
      <div id="procesy" className={style.procesy}>
        <div className={style.procesy_elementy}>
          <img
            className={style.expand_procesy}
            src={Logo_ustawienia}
            onClick={() => {
              contextModalInsert.setShowElementyProcesyInsert(true);
              contextModalInsert.setSelectedElementROW(row);
              setProcesyElementowTemporary(procesyElementow);
            }}
            alt="Procesy"
          />
        </div>

        <div className={style.procesy_elementy_dol}>
          <PROCESS_TITLE row={row} />
        </div>
      </div>
    );
  }




  const PROCESS_TITLE = ({row}) =>{
  const contextModalInsert = useContext(ModalInsertContext);
const procesyElementow =contextModalInsert.procesyElementow;
const appContext = useContext(AppContext);
const procesListName = appContext.procesListName


  return (
  <>
  {procesyElementow
  .filter((frag) => frag.element_id == row.id)
  .sort((a, b) => a.indeks - b.indeks)
  .filter((x) => x.delete != true)
  .map((pr,i) => (<> <p className={style.procesy_elementy_indeks}> {pr.indeks}</p><p className={style.procesy_elementy_bold}>{ procesListName?.filter(pln => pln.id == pr.nazwa_id)[0].nazwa } </p> <p className={style.procesy_elementy_light}>  {pr.typ+" "+pr.rodzaj+" "+pr.wykonczenie+" "+pr.obszar+ " "}</p> </>) ) 
  }
  </>
  ) 
}