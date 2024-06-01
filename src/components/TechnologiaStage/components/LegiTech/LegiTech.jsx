import React, {useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./LegiTech.module.css";
import UsunLege from "./components/UsunLege";
import TypLegi from "./components/TypLegi";
import DodajLege from "./components/DodajLege";
import iconSettings from "assets/settings.svg"
import SelectBoxLegi from "./components/SelectBoxLegi";

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
                <p className={style.naglowek}> Legi - {errorLegiInfo[0]} {errorLegiInfo[1]} </p>
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

  return (
    <div className={style.table_legi}>
      <table className={style.table2}>
        <thead>
          <tr>
          <th className={style.th_checkbox}> <MenuBtn/></th>
            <th className={style.col1}>#</th>
            <th className={style.col_typ}>Typ</th>
            <th className={style.col_typ}>Rodzaj</th>
            <th className={style.col_naklad}>Nakład</th>
            <th className={style.col_uwagi}>Uwagi</th>
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
              return <RowLegi key={row.indeks} i={i} row={row} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

//------------------------------------------------------------
const RowLegi = ({ row }) => {
                return (
                  <tr className={style.tr_legi} key={row.id}>
                   <SelectBoxLegi row={row} />
                    <td>{row.indeks}</td>
                    <td>{row.rodzaj_elementu}</td>
                    <TypLegi row={row} />
                    <td>{row.naklad}</td>
                    <td>{row.uwagi}</td>
                    {/* <td>{row.element_id}</td> */}
                    {/* <td>{row.ilosc_stron}</td> */}
                    <UsunLege row={row} />
                    <DodajLege row={row} />
                  </tr>
                );
}


const MenuBtn = () => {
  const techContext = useContext(TechnologyContext)
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  return (
    <img
              className={style.iconMenuBtn}
              src={iconSettings}
              onClick={() => {
                setLegi(
                  legi.map((t) => {
             
                      return {...t, select: true}
            
                    
                  })
                )
                // dodaj_clikHandler();
                // console.log("z contextu :"+ token.rowSelected)
                //  sessionStorage.setItem("us",{id:1,imie:"Maciek"})
              }}
              alt="x"
            />
  )
}