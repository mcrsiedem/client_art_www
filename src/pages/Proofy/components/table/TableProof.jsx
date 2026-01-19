import React, { useState, useContext } from "react";
import style from "./TableProof.module.css";
import { AppContext } from "context/AppContext";
import TABLE_ROW_ZAMOWIENIA from "./row/TABLE_ROW_ZAMOWIENIA";
export default function TableProof({ open2, setRow }) {
  const contextApp = useContext(AppContext);
  const zamowienia = contextApp.zamowienia;
  const tableZamowienia = contextApp.tableZamowienia;

  return (
    <div ref={tableZamowienia} className={style.tableContainer}>
      <table className={style.tableZam}>
        <thead className={style.th_head}>
          <tr className={style.table_tr}>
            <th className={style.firma_nazwa}>Data zamówienia</th>
            <th className={style.firma_nazwa}>Klient</th>
            <th className={style.firma_nazwa}>Format</th>
            <th className={style.firma_nazwa}>Ilość</th>
            <th className={style.firma_nazwa}>Faktura</th>
            <th className={style.firma_nazwa}>Uwagi</th>
            <th className={style.firma_nazwa}>Firma</th>
          </tr>
        </thead>
        <tbody className={style.tableZam}>
          {zamowienia.map((row, i) => {
            return (
              <TABLE_ROW_ZAMOWIENIA
                key={row.id}
                row={row}
                open2={open2}
                setRow={setRow}
                i={i}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
