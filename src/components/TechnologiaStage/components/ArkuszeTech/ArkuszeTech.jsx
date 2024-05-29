import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";

import style from "./ArkuszeTech.module.css";

export default function ArkuszeTech() {
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
      <p className={style.naglowek}> Arkusze </p>
    </div>
  );
};

const LegiTable = () => {
  return (
    <div className={style.table_legi}>
table
    </div>
  );
};
