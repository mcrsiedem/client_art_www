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

import logoExpand from "assets/expand.svg"
import TypElementu from "./components/TypElementu";
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
      <p className={style.naglowek}> Arkusze </p>
    </div>
  );
};

const WykonaniaTechTable = () => {
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
            <th className={style.col_typ}>Typ</th>
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
const RowArkusze = ({ row,showLegi }) => {
  const techContext = useContext(TechnologyContext);
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const dragLegaId = techContext.dragLegaId;
  const setDragLegaId = techContext.setDragLegaId;
  


  const setDropArkuszId = techContext.setDropArkuszId;
  function handleDragStart(id){
    //   e.preventDefault();

    setDragLegaId(id)
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
          arkusz_id: id

        };
      } else {
        return t;
      }
    })
  );
    console.log("drop: "+id)
    setDropArkuszId(id)
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <>
    
    <tr              onDrop={()=>handleDrop(row.id)}
            onDragOver={handleDragOver} className={style.tr_legi} key={row.id}>
              <td></td>
      <SelectBoxArkusze row={row} />
      <td>{row.indeks}</td>
      {/* <td>{row.typ_elementu}</td> */}

      <TypElementu row={row} />
      <RodzajArkusza row={row} />
      <td>{row.naklad}</td>
      <td>{row.ilosc_leg}</td>
      <td>{row.uwagi}</td>
      {/* <td>{row.element_id}</td> */}
      {/* <td>{row.ilosc_stron}</td> */}
      <UsunArkusz row={row} />
      <DodajArkusz row={row} />
    </tr>
    {showLegi &&(<>     {legi.filter(x=> x.arkusz_id == row.id).map( (l,i) => {
      return     <tr draggable  onDragStart={()=>handleDragStart(l.id)} className={style.tr_legi_mini} key={l.id}>
      <td></td>
      <td></td>
      <td  >{i+1}</td>
      <td>lega {l.indeks}</td>
      <td></td>
      <td>{l.naklad}</td>
      <td>{l.ilosc_leg}</td>
      <td>{l.uwagi}</td>
      {/* <td>{row.element_id}</td> */}
      {/* <td>{row.ilosc_stron}</td> */}
      <td></td>
      <td></td>
    </tr>
    })}</>)}

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
