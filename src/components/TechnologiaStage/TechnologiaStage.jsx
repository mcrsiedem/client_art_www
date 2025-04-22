import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";

import style from "./TechnologieStage.module.css";
import HeaderTech from "components/TechnologiaStage/components/header/HeaderTech";
import DaneTech from "./components/dane/DaneTech";
import ProduktyTech from "./components/produkty/ProduktyTech";
import ElementyTech from "./components/elementy/ElementyTech";

import WykonaniaTech from "./components/wykonania/WykonaniaTech";

import ProcesElementTech from "./components/elementy/ElementTechProces";
import PaperStage from "components/PaperStage/PaperStage";
import IntroligatorniaTech from "./components/introligatornia/IntroligatorniaTech";

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
