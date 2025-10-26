import React, { useEffect, useState, useContext, useRef } from "react";
import style from "./ProcesProdukt.module.css";

import { ModalInsertContext } from "context/ModalInsertContext";
import { _typ_elementu, reg_int } from "utils/initialvalue";

import Window from "./components/Window";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useProcessProdukt } from "./actions/useProcessProdukt";
import ProcesName from "./components/ProcesName";
import ProcessTyp from "./components/ProcesTyp";
import IloscUzytkow from "./components/IloscUzytkow";
import Naklad from "./components/Naklad";
import Info from "./components/Info";
import Indeks from "./components/Indeks";
import Usun from "./components/Usun";
export default function ProcesProdukt() {

    const modalContext = useContext(ModalInsertContext);
  const showProcesyProduktow = modalContext.showProcesyProduktow;

if(showProcesyProduktow){
    return (
   <Window>
      <Header />
      <Table />
      <Footer />
   </Window>
  );
}

}

function Table() {
  const contexModal = useContext(ModalInsertContext);
  const procesyProduktowTemporary = contexModal.procesyProduktowTemporary;
  const {addProcessProdukt} = useProcessProdukt();
  return (
    <div className={style.main}>
      <table className={style.table}>
        <thead>
          <tr>
            {/* <th className={style.expand}>ID</th> */}
            <th className={style.expand}>#</th>
            <th className={style.col_proces}>Proces</th>
            <th className={style.col_proces}>Typ</th>
            <th className={style.col_ilosc_uzytkow}>Ilość użytków</th>
            <th className={style.col_naklad}>Naklad</th>

            <th className={style.col_wersja}>Opis</th>
            <th className={style.col_wersja}></th>
            {/* <th className={style.col_wersja}>Uwagi</th> */}
          </tr>
        </thead>
        <tbody>
          {procesyProduktowTemporary?.sort((a, b) => a.indeks - b.indeks)
          .filter((x) => x.delete != true)
          .map((row, i) => {
            return (
              <tr key={row.id}>
                {/* <td className={style.select_indeks}>{row.id}</td> */}
                <Indeks row={row}/>
                 <ProcesName row={row}/>
                 <ProcessTyp row={row}/> 
                 <IloscUzytkow row={row}/>
                 <Naklad row={row}/>
                <Info row={row}/>
                <Usun row={row}/> 
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={style.dodaj_proces_row}>
         <button className={style.btn_dodaj_proces} onClick={()=> addProcessProdukt()}>Nowy</button>
      </div>
     
    </div>
  );
}
