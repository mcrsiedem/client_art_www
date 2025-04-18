import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";

import style from "./TechnologieStage.module.css";
import HeaderTech from "components/TechnologiaStage/components/HeaderTech";
import DaneTech from "./components/DaneTech";
import ProduktyTech from "./components/ProduktyTech";
import ElementyTech from "./components/ElementyTech";

import WykonaniaTech from "./components/WykonaniaTech";
import WykonaniaTechStage from "./components/WykonaniaTechStage";
import IntroligatorniaTech from "./components/IntroligatorniaTech";
import ProcesElementTech from "./components/ElementTechProces";
import PaperStage from "components/PaperStage/PaperStage";

export default function TechnologiaStage() {
  const techContext = useContext(TechnologyContext);
  const showTechnologyStage = techContext.showTechnologyStage;
  const openTechnologia = techContext.openTechnologia;
  const showElementyTechProcesyInsert =
    techContext.showElementyTechProcesyInsert;
  const procesyElementowTech = techContext.procesyElementowTech;

  

  useEffect(() => {
    if (openTechnologia) {
    
    }
  }, []);

  if (showTechnologyStage) {
    return (
      <div className={style.container}>
        <HeaderTech />

        <DaneTech />
        <div className={style.main}>
          <ProduktyTech />
          <ElementyTech />
          <IntroligatorniaTech />
         
              <div className={style.container_legi_arkusze}>
                <WykonaniaTech />
                {/* <WykonaniaTechStage /> */}
              </div>
        </div>

        {showElementyTechProcesyInsert && (
          <ProcesElementTech procesyElementowTech={procesyElementowTech} />
        )}

 <PaperStage parent={"technologia"} />

      </div>
    );
  }
}
