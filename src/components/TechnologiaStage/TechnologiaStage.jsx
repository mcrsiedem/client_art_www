import React, {useContext } from "react";
import {TechnologyContext} from "context/TechnologyContext";
import style from "./TechnologieStage.module.css";
import HeaderTech from "components/TechnologiaStage/components/header/HeaderTech";
import DaneTech from "./components/dane/DaneTech";
import ProduktyTech from "./components/produkty/ProduktyTech";
import ElementyTech from "./components/elementy/ElementyTech";
import WykonanieStage from "./components/wykonania/WykonaniaStage";
import ProcesElementTech from "./components/elementy/ElementTechProces";
import PaperStage from "components/PaperStage/PaperStage";
import IntroligatorniaTech from "./components/introligatornia/IntroligatorniaTech";
export default function TechnologiaStage() {
  const techContext = useContext(TechnologyContext);
  const showTechnologyStage = techContext.showTechnologyStage;
  if (showTechnologyStage) {
    return (
      <div className={style.container}>
                  <HeaderTech />
                  <DaneTech />
                  <div className={style.main}>
                          <ProduktyTech />
                          <ElementyTech />
                          <IntroligatorniaTech />
                          <WykonanieStage />
                  </div>
                  <ProcesElementTech />
                  <PaperStage parent={"technologia"} />
      </div>
    );
  }
}
