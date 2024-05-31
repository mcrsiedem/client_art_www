import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";

import style from "./LegiTech.module.css";
import RowLegi from "./RowLegi";

export default function LegiTech() {
  useEffect(() => {}, []);

  return (
    <div className={style.container}>
      <LegiHeader />
      <LegiTable />
    </div>
  );
}

const LegiHeader = () => {
  return (
    <div className={style.header}>
      <div className={style.kropka}></div>
      <p className={style.naglowek}> Legi </p>
    </div>
  );
};

const LegiTable = () => {
  const techContext = useContext(TechnologyContext);
  const legi = techContext.legi;
  const showErrorLegi = techContext.showErrorLegi;
  const errorLegiInfo = techContext.errorLegiInfo;

  return (
    <div className={style.table_legi}>
      <table className={style.table2}>
        <thead>
          <tr>
            <th className={style.col1}>#</th>
            <th className={style.col_typ}>Typ</th>
            <th className={style.col_typ}>Rodzaj</th>
            <th className={style.col_naklad}>Nakład</th>
            <th className={style.col_naklad}>Uwagi</th>
            <th className={style.col_naklad}>element_id</th>
            <th className={style.col_naklad}>str</th>

          </tr>
        </thead>
        <tbody>
          {legi
            // .sort((a, b) => a.indeks - b.indeks)
            .map((row, i) => {
              return <RowLegi key={row.indeks} i={i} row={row} />;
            })}
        </tbody>
      </table>
            {showErrorLegi &&(
              <div>{errorLegiInfo[0] } {errorLegiInfo[1] }</div>
            )}
    </div>
  );
};
