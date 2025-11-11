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
import ArkuszeDoDruku from "./components/arkusze/ArkuszeDoDruku";
import LegiDoFalcu from "./components/legi/LegiDoFalcu";
import Loading from "components/Loading/Loading";
export default function TechnologiaStage() {
  const techContext = useContext(TechnologyContext);
  const showTechnologyStage = techContext.showTechnologyStage;
  if (showTechnologyStage) {
    return (
      <div className={style.container}>
                  <HeaderTech />
                    <Loading/>
                  <DaneTech />
                  <div className={style.main}>
                          <ProduktyTech />
                          <ElementyTech />
                          <div className={style.ark_leg_container}>

                          <ArkuszeDoDruku/>
                          <LegiDoFalcu/>
                          </div>
                           
                          <IntroligatorniaTech />
                          <WykonanieStage />
                  </div>
                  <ProcesElementTech />
                  <PaperStage parent={"technologia"} />
      </div>
    );
  }
}
