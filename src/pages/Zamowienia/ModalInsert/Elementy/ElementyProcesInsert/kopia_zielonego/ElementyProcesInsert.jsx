// import iconCopy from "../../../../../assets/copy.svg";
// import iconTrash from "../../../../../assets/trash2.svg";
import style from "./ElementyProcesInsert.module.css";
// import { _papiery } from "../../api";
// import ElementTableHeader from "./ElementTableHeader";
// import { useState } from "react";
// import Logo_ustawienia from "../../../../assets/settings.svg";

export default function ElementyProcesInsert({
  showElementyProcesyInsert,
  setShowElementyProcesyInsert,
  procesyElementow,
  listaDostepnychProcesow
}) {
  return (
    <div className={style.insertContainer}>
      <div className={style.header}>
        {" "}
        <p className={style.title}>Procesy</p>
      </div>
      <div className={style.center}>
        <table className={style.table2}>
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
                setShowElementyProcesyInsert={setShowElementyProcesyInsert}
              />
            );
          })} */}
          </tbody>
        </table>
      </div>
      <div className={style.row}>
        {" "}
        <button
          className={style.btn}
          onClick={() => {
            setShowElementyProcesyInsert(false);
          }}
        >
          Anuluj
        </button>{" "}
        <button className={style.btn}>OK</button>
      </div>
    </div>
  );
}
