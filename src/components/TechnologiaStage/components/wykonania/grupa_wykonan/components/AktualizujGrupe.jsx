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
  const grupaWykonanInit = techContext.grupaWykonanInit;
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

          console.log(roznicaCzasu(grupaWykonanInit,rowGrupa)[0]+" " + roznicaCzasu(grupaWykonanInit,rowGrupa)[1]+" " + roznicaCzasu(grupaWykonanInit,rowGrupa)[2])
          // fechparametryTechnologii(rowGrupa.zamowienie_id,rowGrupa.technologia_id)


        }}
        alt="Procesy"
      />
    </div>
  );
  }


}

let  save = (val) => { 
    return new Promise((resolve,reject)=>{



    resolve("OK")
   
    
})
}

let roznicaCzasu = (grupaWykonanInit, rowGrupa) =>{

let koniec = grupaWykonanInit.find(x=> x.id == rowGrupa.id).koniec
let stary_czas = grupaWykonanInit.find(x=> x.id == rowGrupa.id).czas
let nowy_czas = rowGrupa.czas

let roznica = 0

  if(nowy_czas>stary_czas){
    roznica = nowy_czas - stary_czas
    return [koniec,"dodaj",roznica]
  }
  if(stary_czas>nowy_czas){
    roznica = stary_czas - nowy_czas
    return [koniec,"odejmij",roznica]
  }



}