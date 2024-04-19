import React, { useEffect, useState, useContext, useRef } from "react";
import style from "./ProcesElement.module.css";
import iconX from "assets/xDark.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
export default function ProcesElement() {


  return (
   <Window>
      <Header />
      <Table />
      <Footer />
   </Window>
  );
}


function Window({children}) {
  return (
    <div className={style.blurContainer}>
      <div className={style.window}>{children}</div>
    </div>
  );
}


function Header() {
  const modalContext = useContext(ModalInsertContext);
  const appContext = useContext(AppContext);
  const rowElement = modalContext.selectedElementROW;
  return (
    <div className={style.header}>
      <p className={style.title}>Procesy - <p className={style.title2}>{appContext.typ_elementu.filter(x => x.id == rowElement.typ)[0].nazwa} {rowElement.naklad} szt. {rowElement.nazwa}</p> </p> 
      <Zamknij/>
    </div>
  );
}
function Zamknij() {
  const modalContext = useContext(ModalInsertContext);
  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        modalContext.setShowElementyProcesyInsert(false);
      }}
      alt="Procesy"
    />
  );
}

function Footer() {
  const modalContext = useContext(ModalInsertContext);
  return (
    <div className={style.footer}>
      <button
        className={style.btn}
        onClick={() => {
          modalContext.setShowElementyProcesyInsert(false);
        }}
      >
        Zapisz
      </button>
    </div>
  );
}

function Table() {
  const contexApp = useContext(AppContext);
  const contexModal = useContext(ModalInsertContext);
  const procesyElementow = contexModal.procesyElementow;
  return (
    <div className={style.main}>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.col_indeks}>#</th>
            <th className={style.col_indeks}>id</th>
            <th className={style.col_indeks}>zam</th>
            <th className={style.col_indeks}>prod</th>
            <th className={style.col_indeks}>element</th>
            <th className={style.col_proces}>Proces</th>
            <th className={style.col_typ}>Typ</th>
            <th className={style.col_ilosc}>Front</th>
            <th className={style.col_ilosc}>Back</th>
            <th className={style.col_kolory}>Front kolory</th>
            <th className={style.col_kolory}>Back kolory</th>
            <th className={style.col_wersja}>Uwagi</th>
          </tr>
        </thead>
        <tbody>
          {procesyElementow.map((row, i) => {
            return (
              <tr key={row.id}>
                <td>{i+1}</td>
                <td>{row.id}</td>
                <td>{row.zamowienie_id}</td>
                <td>{row.produkt_id}</td>
                <td>{row.element_id}</td>
                <ProcesName row={row}/>
            
                <td>{row.proces_typ}</td>
                <td>{row.front_ilosc}</td>
                <td>{row.back_ilosc}</td>
                <td>{row.front_kolor}</td>
                <td>{row.back_kolor}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


const ProcesName = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);

  return (
    <td>
      <select
        className={style.select}
        defaultValue={row.nazwa_id}
        onChange={(e) => {
          // tutaj ma filtrować się lista wszystkich procesów która wyświetla się w Typie
          // nazwa_id powinna zmienić się chyba w Typie a nie tutaj
          contexModal.handleUpdateRowProcesyElementow({
            ...row,
            nazwa_id: e.target.value,
          });
        }}
      >
        {}
        {contexApp.procesListName.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </td>
  );
};

const ProcessTyp = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);

  return (
    <td>
      <select
        className={style.select}
        defaultValue={row.id}
        onChange={(e) => {
          contexModal.handleUpdateRowProcesyElementow({
            ...row,
            id: e.target.value,
          });
        }}
      >
        {}
        {contexApp.procesListName.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </td>
  );
};