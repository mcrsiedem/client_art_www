import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import UsunLege from "./components/UsunLege";

import DodajLege from "./components/DodajLege";
import iconSettings from "assets/settings.svg";
// import SelectBoxLegi from "./components/SelectBoxArkusze";
import SelectBoxArkusze from "./components/SelectBoxArkusze";
import MenuArkusze from "./components/MenuArkusze";
import style from "./ArkuszeTech.module.css";
import RodzajArkusza from "./components/RodzajArkusza";
export default function ArkuszeTech() {
  return (
    <div className={style.container}>
      <ArkuszeHeader />
      <ArkuszeTable />
    </div>
  );
}

const ArkuszeHeader = () => {
  const techContext = useContext(TechnologyContext);
  const showErrorArkusze = techContext.showErrorArkusze;
  const errorArkuszeInfo = techContext.errorArkuszeInfo;

  if (showErrorArkusze) {
    return (
      <div className={style.headerAlert}>
        <div className={style.kropka}></div>
        <p className={style.naglowek}>
          {" "}
          Arkusze - {errorArkuszeInfo[0]} {errorArkuszeInfo[1]}{" "}
        </p>
      </div>
    );
  }
  return (
    <div className={style.header}>
      <div className={style.kropka}></div>
      <p className={style.naglowek}> Arkusze </p>
    </div>
  );
};

const ArkuszeTable = () => {
  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={style.table_legi}>
      <MenuArkusze showMenu={showMenu} setShowMenu={setShowMenu} />
      <table className={style.table2}>
        <thead>
          <tr>
            <th className={style.th_checkbox}>
              {" "}
              <MenuBtn showMenu={showMenu} setShowMenu={setShowMenu} />
            </th>
            <th className={style.col1}>#</th>
            <th className={style.col_typ}>Typ</th>
            <th className={style.col_typ}>Rodzaj</th>
            <th className={style.col_naklad}>Nakład</th>
            <th className={style.col_uwagi}>Uwagi</th>
            {/* <th className={style.col_naklad}>element_id</th> */}
            <th className={style.col_naklad}>str</th>
            <th className={style.col_doda3j}></th>
            <th className={style.col_doda3j}></th>
          </tr>
        </thead>
        <tbody>
          {arkusze
            // .sort((a, b) => a.indeks - b.indeks)
            .map((row, i) => {
              return <RowArkusze key={row.indeks} i={i} row={row} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

//------------------------------------------------------------
const RowArkusze = ({ row }) => {
  return (
    <tr className={style.tr_legi} key={row.id}>
      <SelectBoxArkusze row={row} />
      <td>{row.indeks}</td>
      <td>{row.typ_elementu}</td>
      <RodzajArkusza row={row} />
      <td>{row.naklad}</td>
      <td>{row.uwagi}</td>
      {/* <td>{row.element_id}</td> */}
      <td>{row.ilosc_stron}</td>
      <UsunLege row={row} />
      <DodajLege row={row} />
    </tr>
  );
};

const MenuBtn = ({ showMenu, setShowMenu }) => {
  return (
    <img
      className={style.iconMenuBtn}
      src={iconSettings}
      onClick={() => {
        setShowMenu(!showMenu);
      }}
      alt="x"
    />
  );
};
