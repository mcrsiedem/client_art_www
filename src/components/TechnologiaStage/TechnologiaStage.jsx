import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";

import style from "./TechnologieStage.module.css";
import Header from "components/TechnologiaStage/components/Header";
import DaneTech from "./components/DaneTech";
import ProduktyTech from "./components/ProduktyTech";
import ElementyTech from "./components/ElementyTech/ElementyTech";
import LegiTech from "./components/LegiTech/LegiTech";
import ArkuszeTech from "./components/ArkuszeTech/ArkuszeTech";
import WykonaniaTech from "./components/WykonaniaTech/WykonaniaTech";
import IntroligatorniaTech from "./components/IntroligatorniaTech";
import ProcesElementTech from "./components/ElementyTech/ElementyTechProcesInsert/ProcesElementTech";

export default function TechnologiaStage() {
  const techContext = useContext(TechnologyContext);
  const showTechnologyStage = techContext.showTechnologyStage;
  const openTechnologia = techContext.openTechnologia;
  const showElementyTechProcesyInsert = techContext.showElementyTechProcesyInsert;
  const procesyElementowTech = techContext.procesyElementowTech;
  const [showPortal, setShowPortal] =     useState(false);
  useEffect(() => {
    if (openTechnologia) {
      console.log("open technologia");
    }
  }, []);

  if (showTechnologyStage) {
    return (
      <div className={style.container}>

        <Header  setShowPortal={setShowPortal}/>
   
        <DaneTech />
        <div className={style.main}>
              <ProduktyTech />
              <ElementyTech />
              <IntroligatorniaTech/>
                     {/* <div className={style.container_legi_arkusze}>
              <WykonaniaTech/>    
              <IntroligatorniaTech/>
              </div> */}
              {/* <div className={style.container_legi_arkusze}>
                <ArkuszeTech />
                <LegiTech />
              </div> */}
       
              
        </div>
        {showElementyTechProcesyInsert && (
        <ProcesElementTech
        procesyElementowTech={procesyElementowTech}


        />
      )}



      </div>
      
    );
  }
}
