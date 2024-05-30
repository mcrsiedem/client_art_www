import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";

import style from "./LegiTech.module.css";
import RowLegi from "./RowLegi";

export default function LegiTech() {
  //   const techContext = useContext(TechnologyContext);
  //   const showTechnologyStage = techContext.showTechnologyStage;
  //   const setShowTechnologyStage = techContext.setShowTechnologyStage;
  //   const openTechnologia = techContext.openTechnologia;

  //   const [dataTechnologie,setDataTechnologie] =useState([]);
  //   const [isStageTechnologiaVisible,setStageTechnologiaVisible] =useState(false);
  //   const [activeRowId,setActiveRowId] =useState();

  // const effectRan = useRef(false);
  // useEffect(() => {
  //   if (effectRan.current === true) {
  //     if(openTechnologia){
  //       console.log("open technologia")
  //     }

  //   }
  //   return () => {
  //     effectRan.current = true;
  //   };
  // }, []);

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

// const LegiTable2 = () => {
//   return (
//     <div className={style.table_legi}>
// table
//     </div>
//   );
// };


const LegiTable = () => {


  const techContext = useContext(TechnologyContext)
  const legi = techContext.legi;

  return (
    <div className={style.table_legi}>
      <table className={style.table2}>
        <thead>
          <tr>
            <th className={style.col_button}> </th>
            {/* <th className={style.col1}>id</th> */}
            <th className={style.col1}>#</th>
            <th className={style.col_typ}>Typ</th>
            <th className={style.col_naklad}>Nakład</th>

          </tr>
        </thead>
        <tbody>
          {legi
            .sort((a, b) => a.indeks - b.indeks)
            .map((row, i) => {
              return <RowLegi key={row.id} i={i} row={row} />;
            })}
        </tbody>
      </table>
    </div>
  );
}