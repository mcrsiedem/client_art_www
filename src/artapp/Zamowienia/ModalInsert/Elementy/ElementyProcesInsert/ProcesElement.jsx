// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ProcesElement.module.css";
import iconX from "../../../../../svg/xDark.svg"
// import { _papiery } from "../../api";
// import ElementTableHeader from "./ElementTableHeader";
// import { useState } from "react";
// import Logo_ustawienia from "../../../../svg/settings.svg";

export default function ProcesElement({
  
  setShowElementyProcesyInsert,
  procesyElementow,
  listaDostepnychProcesow
}) {
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
                setShowElementyProcesyInsert={setShowElementyProcesyInsert}
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
