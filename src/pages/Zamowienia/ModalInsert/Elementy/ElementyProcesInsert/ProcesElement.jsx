import React, { useEffect, useState, useContext,useRef } from "react";
import style from "./ProcesElement.module.css";

import iconX from 'assets/xDark.svg'
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
export default function ProcesElement({
  
  setShowElementyProcesyInsert,
  
  
}) {

  const contexApp = useContext(AppContext);
  const modalContext = useContext(ModalInsertContext);

  const listaDostepnychProcesow = contexApp.process;
  const procesyElementow = contexApp.process;

  return (
    <div className={style.window}>
      <Header setShowElementyProcesyInsert={setShowElementyProcesyInsert}/>
      <div className={style.main}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.col1}>#</th>
              <th className={style.col_typ}>Proces</th>
              <th className={style.col_typ}>Typ</th>
              <th className={style.col_naklad}>Front</th>
              <th className={style.col_naklad}>Nazwa</th>
              <th className={style.col_naklad}>Back</th>
              <th className={style.col_naklad}>Nazwa</th>
              <th className={style.col_wersja}>Uwagi</th>

            </tr>
          </thead>
          <tbody>
            {
                procesyElementow.map((row, i) => {
                  return (
                  <tr key={row.id}>
                <td>{row.id}</td>
                    <td>{row.proces_nazwa}</td>
                    <td>{row.proces_typ}</td>
                    <td>4</td>
                    <td>CMYK</td>
                    <td>CMYK</td>
                    <td>CMYK</td>
                    <td></td>
                  </tr>)
                })
            }
            {/* <tr>
              <td>1</td>
              <td>Druk</td>
              <td>farba</td>
              <td>CMYK</td>
              <td>CMYK</td>
              <td></td>

            </tr>

            <tr>
              <td>3</td>
              <td>Uszlachetnianie</td>
              <td>lakier</td>
              <td>UV</td>
              <td></td>
              <td></td>

            </tr> */}
            {/* {elementy.map((row, i) => {
            return (
              <RowElement
                i={i}
                row={row}
                handleChangeCardElementy={handleChangeCardElementy}
                listaPapierow={listaPapierow}
                listaGramatur={listaGramatur}
                setListaGramatur={setListaGramatur}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                procesyElementow={procesyElementow}
                setProcesyElementow={setProcesyElementow}
                listaDostepnychProcesow={listaDostepnychProcesow}
                setShćalementyProcesyInsert={setShowElementyProcesyInsert}
              />
            );
          })} */}
          </tbody>
        </table>
      </div>
      <div className={style.footer}>
        {" "}
        <button
          className={style.btn}
          onClick={() => {
            setShowElementyProcesyInsert(false);
          }}
        >
          Zapisz
        </button>{" "}
      
      </div>
    </div>
  );
}


function Header({ setShowElementyProcesyInsert }) {
  return (
    <div className={style.header}>
      <p className={style.title}>Procesy </p>
      <Zamknij setShowElementyProcesyInsert={setShowElementyProcesyInsert}/>
    </div>
  );
}
function Zamknij({ setShowElementyProcesyInsert }) {
  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        setShowElementyProcesyInsert(false);
      }}
      alt="Procesy"
    />
  );
}
