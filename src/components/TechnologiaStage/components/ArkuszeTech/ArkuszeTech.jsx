import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import iconSettings from "assets/settings.svg";
import style from "./ArkuszeTech.module.css";
import logoExpand from "assets/expand.svg"
import RowArkusze from "../RowArkusze";
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
      {/* <MenuArkusze showMenu={showMenu} setShowMenu={setShowMenu} /> */}
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


function MenuArkusze({ showMenu, setShowMenu }) {
  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;

  if (showMenu) {
    return (
      <div className={style.menu_legi}>
        <button
          className={style.menu_legi_btn}
          onClick={() => {
            setArkusze(
              arkusze.map((t) => {
                return { ...t, select: true };
              })
            );
            setShowMenu(!showMenu);
          }}
        >
          Zaznacz wszystko
        </button>
        <button className={style.menu_legi_btn}           onClick={() => {
            setArkusze(
              arkusze.map((t) => {
                return { ...t, select: false };
              })
            );
            setShowMenu(!showMenu);
          }}>Odznacz wszystko</button>
        <button className={style.menu_legi_btn}>Legi</button>
        <button
          className={style.menu_legi_btn}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          Anuluj
        </button>
      </div>
    );
  }
}