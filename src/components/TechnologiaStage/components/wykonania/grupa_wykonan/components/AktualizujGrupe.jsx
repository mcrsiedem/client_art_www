import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./Grupa_wykonan.module.css";
import { reg_txt } from "utils/initialvalue";
import logoExtract from "assets/extract_green.svg";


export default  function AktualizujGrupe({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const daneTech = techContext.daneTech;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const grupaWykonan = techContext.grupaWykonan;

  // const global_id_grupa = row.global_id
  if(rowGrupa.update == true){
      return (
    <div style={{ paddingTop: "13px" }}>
      <img
        title="Nanieś zmiany na plan"
        className={style.expand_max}
        src={logoExtract} 
        onClick={() => {

          fechparametryTechnologii(rowGrupa.zamowienie_id,rowGrupa.technologia_id)


        }}
        alt="Procesy"
      />
    </div>
  );
  }


}