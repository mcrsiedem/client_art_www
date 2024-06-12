import React, { useContext, useState } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./LegiTech.module.css";
import UsunLege from "./components/UsunLege";
import TypLegi from "./components/TypLegi";
import DodajLege from "./components/DodajLege";
import iconSettings from "assets/settings.svg";
import SelectBoxLegi from "./components/SelectBoxLegi";
import MenuLegi from "./components/MenuLegi";
import { _typ_elementu } from "utils/initialvalue";

export default function LegiTech() {
  return (
    <div className={style.container}>
      <LegiHeader />
      <LegiTable />
    </div>
  );
}

//------------------------------------------------------------
const LegiHeader = () => {
  const techContext = useContext(TechnologyContext);
  const showErrorLegi = techContext.showErrorLegi;
  const errorLegiInfo = techContext.errorLegiInfo;

  if (showErrorLegi) {
    return (
      <div className={style.headerAlert}>
        <div className={style.kropka}></div>
        <p className={style.naglowek}>
          {" "}
          Legi - {errorLegiInfo[0]} {errorLegiInfo[1]}{" "}
        </p>
      </div>
    );
  }
  return (
    <div className={style.header}>
      <div className={style.kropka}></div>
      <p className={style.naglowek}> Legi </p>
    </div>
  );
};

//------------------------------------------------------------
const LegiTable = () => {
  const techContext = useContext(TechnologyContext);
  const legi = techContext.legi;
  const [showMenuLegi, setShowMenuLegi] = useState(false);
  const [showLegiFragmenty, setShowLegiFragmenty] = useState(true);

  return (
    <div className={style.table_legi}>
      <MenuLegi showMenuLegi={showMenuLegi} setShowMenuLegi={setShowMenuLegi} />
      <table className={style.table2}>
        <thead>
          <tr>
            <th className={style.th_checkbox}>
              {" "}
              <MenuBtn
                showMenuLegi={showMenuLegi}
                setShowMenuLegi={setShowMenuLegi}
              />
            </th>
            <th className={style.col1}>#</th>
            <th className={style.col_typ}>Typ</th>
            <th className={style.col_typ}>Rodzaj</th>
            <th className={style.col_naklad}>Nakład</th>
            <th className={style.col_uwagi}>Uwagi</th>
            <th className={style.col_uwagi}>arkusz_id</th>
            {/* <th className={style.col_naklad}>element_id</th> */}
            {/* <th className={style.col_naklad}>str</th> */}
            <th className={style.col_doda3j}></th>
            <th className={style.col_doda3j}></th>
          </tr>
        </thead>
        <tbody>
          {legi
            // .sort((a, b) => a.indeks - b.indeks)
            .map((row, i) => {
              return <RowLegi key={row.indeks} i={i} row={row} showLegiFragmenty={showLegiFragmenty} setShowLegiFragmenty={setShowLegiFragmenty} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

//------------------------------------------------------------
const RowLegi = ({ row,showLegiFragmenty,setShowLegiFragmenty }) => {
  const techContext = useContext(TechnologyContext);
  const setDragLegaId = techContext.setDragLegaId;
  const legiFragmenty = techContext.legiFragmenty;
  function handleDragStart(id){
    //   e.preventDefault();
    //  sessionStorage.setItem("id_element_drag", id);
    //  sessionStorage.setItem("typ_drag", "fragment");
    // console.log("drag:"+ id)
    setDragLegaId(id)
   }

  return (

    <>
    
  
    <tr draggable  onDragStart={()=>handleDragStart(row.id)}  className={style.tr_legi} key={row.id}>
      <SelectBoxLegi row={row} />
      <td>{row.indeks}</td>
      <td>{_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa}</td>
      <TypLegi row={row} />
      <td>{row.naklad}</td>
      <td>{row.uwagi}</td>
      <td>{row.arkusz_id}</td>
      {/* <td>{row.element_id}</td> */}
      {/* <td>{row.ilosc_stron}</td> */}
      <UsunLege row={row} />
      <DodajLege row={row} />
    </tr>

{showLegiFragmenty &&(<>     {legiFragmenty.filter(x=> x.lega_id == row.id).map( (l,i) => {
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

const MenuBtn = ({ showMenuLegi, setShowMenuLegi }) => {
  return (
    <img
      className={style.iconMenuBtn}
      src={iconSettings}
      onClick={() => {
        setShowMenuLegi(!showMenuLegi);
      }}
      alt="x"
    />
  );
};
