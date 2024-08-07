import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import UsunArkusz from "./components/UsunArkusz";

import DodajLege from "./components/DodajArkusz";
import iconSettings from "assets/settings.svg";
// import SelectBoxLegi from "./components/SelectBoxArkusze";
import SelectBoxArkusze from "./components/SelectBoxArkusze";
import MenuArkusze from "./components/MenuArkusze";
import style from "./WykonaniaTech.module.css";
import RodzajArkusza from "./components/RodzajArkusza";
import DodajArkusz from "./components/DodajArkusz";

import logoExpand from "assets/expand.svg";
import TypElementu from "./components/TypElementu";
import { _typ_elementu } from "utils/initialvalue";

export default function WykonaniaTech() {
  return (
    <div className={style.container}>
      <WykonaniaTechHeader />
      <WykonaniaTechTable />
    </div>
  );
}

const WykonaniaTechHeader = () => {
  const techContext = useContext(TechnologyContext);
  const showErrorArkusze = techContext.showErrorArkusze;
  const errorArkuszeInfo = techContext.errorArkuszeInfo;

  if (showErrorArkusze) {
    return (
      <div className={style.headerAlert}>
        <div className={style.kropka}></div>
        <p className={style.naglowek}>
          {" "}
          Wykonania - {errorArkuszeInfo[0]} {errorArkuszeInfo[1]}{" "}
        </p>
      </div>
    );
  }
  return (
    <div className={style.header}>
      <div className={style.kropka}></div>
      <p className={style.naglowek}> Wykonania </p>
    </div>
  );
};

const WykonaniaTechTable = () => {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const [showMenu, setShowMenu] = useState(false);
  const [showLegi, setShowLegi] = useState(true);

  return (
    <div className={style.table_legi}>
      <MenuArkusze showMenu={showMenu} setShowMenu={setShowMenu} />
      <table className={style.table2}>
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
              <MenuBtn showMenu={showMenu} setShowMenu={setShowMenu} />
            </th>
            <th className={style.col1}>#</th>
            <th className={style.col_typ}>Proces</th>
            <th className={style.col_typ}>Rodzaj</th>
            <th className={style.col_naklad}>Nakład</th>
            <th className={style.col_uwagi}>Ilość leg</th>
            <th className={style.col_uwagi}>Uwagi</th>
            <th className={style.col_uwagi}>Narząd</th>
            <th className={style.col_uwagi}>akr/h</th>
           
            <th className={style.col_doda3j}></th>
            <th className={style.col_doda3j}></th>
          </tr>
        </thead>
        <tbody
          onClick={() => {
            setShowMenu(false);
          }}
        >
          {grupaWykonan
            // .sort((a, b) => a.indeks - b.indeks)
            .map((row, i) => {
              return (
                <RowGrupa
                  key={row.indeks+"x"}
                  i={i}
                  row={row}
                  showLegi={showLegi}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

//------------------------------------------------------------
const RowGrupa = ({ row, showLegi }) => {
  const techContext = useContext(TechnologyContext);
  const legi = techContext.legi;
  const wykonania = techContext.wykonania;
  const setLegi = techContext.setLegi;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const dragLegaId = techContext.dragLegaId;
  const setDragLegaId = techContext.setDragLegaId;

  const setDropArkuszId = techContext.setDropArkuszId;
  function handleDragStart(id) {
    //   e.preventDefault();

    setDragLegaId(id);
  }
  function handleDrop(id) {
    // sprawdza czy upuszczamy właściwy obiekt
    // if (sessionStorage.getItem("typ_drag") == "fragment") {
    //   let id_drag_element = sessionStorage.getItem("id_element_drag");
    //   let id_drop_oprawa = id;
    //   handleChangeCardFragmentyOprawaId(id_drag_element, id_drop_oprawa);
    // }
    setLegi(
      legi.map((t, a) => {
        // console.log("oprawa id" +prev)
        if (t.id === dragLegaId) {
          return {
            ...t,
            arkusz_id: id,
          };
        } else {
          return t;
        }
      })
    );
    console.log("drop: " + id);
    setDropArkuszId(id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <>
      <tr
        onDrop={() => handleDrop(row.id)}
        onDragOver={handleDragOver}
        className={style.tr_legi}
        key={row.id}
      >
        <td></td>
        <td></td>
        <td></td>
        {/* <SelectBoxArkusze row={row} /> */}
        {/* <td>{row.indeks}</td> */}

        <td className={style.td_nazwa}>{row.nazwa}</td>
        <td>{row.typ_elementu}</td>
        <td></td>
        {/* <TypElementu row={row} />
      <RodzajArkusza row={row} /> */}
        
        <td></td>
        <td>{row.uwagi}</td>
        <td>{row.narzad}</td>
        <td>{row.predkosc}</td>
        <UsunArkusz row={row} />
        <DodajArkusz row={row} />
      </tr>
      {showLegi && (
        <>
          {" "}
          {wykonania
            .filter((x) => x.id == row.id)
            .map((l, i) => {
              return (
                <tr
                  draggable
                  onDragStart={() => handleDragStart(l.id)}
                  className={style.tr_legi_mini}
                  key={l.id + i}
                >
                  <td></td>
                  <td></td>
                  <td></td>
                  {/* <td>{i + 1}</td> */}
                  <td>{i + 1} wyk. {l.indeks}</td>
                  <td></td>
                  <td>{l.naklad}</td>
                  <td>{l.ilosc_leg}</td>
                  <td>
                    {
                      _typ_elementu.filter((x) => x.id == l.typ_elementu)[0]
                        .nazwa
                    }
                  </td>
                  {/* <td>{row.element_id}</td> */}
                  {/* <td>{row.ilosc_stron}</td> */}
                  <td></td>
                  <td></td>
                </tr>
              );
            })}
        </>
      )}
    </>
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
