import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import UsunArkusz from "./components/UsunArkusz";

import DodajLege from "./components/DodajArkusz";
import iconSettings from "assets/settings.svg";
// import SelectBoxLegi from "./components/SelectBoxArkusze";
import SelectBoxArkusze from "./components/SelectBoxArkusze";
import MenuArkusze from "./components/MenuArkusze";
import style from "./ArkuszeTech.module.css";
import RodzajArkusza from "./components/RodzajArkusza";
import DodajArkusz from "./components/DodajArkusz";

import logoExpand from "assets/expand.svg"
import TypElementu from "./components/TypElementu";
import RowArkusze from "./components/RowArkusze";
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
  const [showLegi, setShowLegi] = useState(false);

  return (
    <div className={style.table_legi}>
      <MenuArkusze showMenu={showMenu} setShowMenu={setShowMenu} />
      <table className={style.table2} >
        <thead>
          <tr>
          <th className={style.expand}>
                <img
                  className={style.icon}
                  src={logoExpand}
                  onClick={() => {
                    setShowLegi(!showLegi);
                  }}
                  alt="Procesy"
                />
              </th>
            <th className={style.th_checkbox}>
              {" "}
              <MenuBtn showMenu={showMenu} setShowMenu={setShowMenu} />
            </th>
            <th className={style.col1}>#</th>
            <th className={style.col_typ_elementu}>Typ</th>
            <th className={style.col_typ}>Rodzaj</th>
            <th className={style.col_naklad}>Nakład</th>
            <th className={style.col_uwagi}>Ilość leg</th>
            <th className={style.col_uwagi}>Uwagi</th>
    
            {/* <th className={style.col_naklad}>element_id</th> */}
            {/* <th className={style.col_naklad}>str</th> */}
            <th className={style.col_doda3j}></th>
            <th className={style.col_doda3j}></th>
          </tr>
        </thead>
        <tbody onClick={()=>{setShowMenu(false)}}>
          {arkusze
            // .sort((a, b) => a.indeks - b.indeks)
            .map((row, i) => {
              return <RowArkusze key={row.indeks} i={i} row={row} showLegi={showLegi} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

//------------------------------------------------------------


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
