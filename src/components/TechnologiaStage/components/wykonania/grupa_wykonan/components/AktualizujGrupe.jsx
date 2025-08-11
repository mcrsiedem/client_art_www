import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./Grupa_wykonan.module.css";
import { reg_txt } from "utils/initialvalue";
import logoExtract from "assets/extract_green.svg";
import DecodeToken from "pages/Login/DecodeToken";
import axios from "axios";
// import DecodeToken from "../pages/Login/DecodeToken";
import { IP } from "utils/Host";

export default  function AktualizujGrupe({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const daneTech = techContext.daneTech;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const grupaWykonanInit = techContext.grupaWykonanInit; // wartość początkowa
  const grupaWykonan = techContext.grupaWykonan;          // grupy po zmianie
  const wykonania = techContext.wykonania;         


  // const global_id_grupa = row.global_id
  if(rowGrupa.update == true){
      return (
    <div style={{ paddingTop: "13px" }}>
      <img
        title="Nanieś zmiany na plan"
        className={style.expand_max}
        src={logoExtract} 
        onClick={async() => {
          if(rowGrupa.proces_nazwa_id==1 && DecodeToken(sessionStorage.getItem("token")).manage_druk==1){
            //druk

          }
      

               if(rowGrupa.proces_nazwa_id==3 && DecodeToken(sessionStorage.getItem("token")).manage_falc==1){
            //falc

          }
      



          console.log(roznicaCzasu(grupaWykonanInit,rowGrupa)[0]+" " + roznicaCzasu(grupaWykonanInit,rowGrupa)[1]+" " + roznicaCzasu(grupaWykonanInit,rowGrupa)[2]+" " + roznicaCzasu(grupaWykonanInit,rowGrupa)[3])
          // uprawnienia: proces_nazwa_id 
          // 1 druk 
          // 2 uszlachetnianie
          // 3 falcowanie
          let roznica_czasu = roznicaCzasu(grupaWykonanInit)

          
          // axios
          // wysłać do aktualizacji
          // roznicaCzasu
          // rowGrupa
          let wykonania_update =  wykonania.filter(x=> x.grupa_id == rowGrupa.id)
          // const saved  = await save(roznica_czasu,rowGrupa,wykonania_update)
          
          // then

          // fechparametryTechnologii(rowGrupa.zamowienie_id,rowGrupa.technologia_id)


        }}
        alt="Procesy"
      />
    </div>
  );
  }


}

const save = ({roznica_czasu,rowGrupa,wykonania_update}) =>{
  return new Promise(async(resolve,reject)=>{
   let result = await axios.post(IP + "aktualizuj_grupe_wykonan/" + sessionStorage.getItem("token"),[roznica_czasu,rowGrupa,wykonania_update])
    resolve(result)
  })
}

let roznicaCzasu = (grupaWykonanInit, rowGrupa) =>{
let koniec = grupaWykonanInit.find(x=> x.id == rowGrupa.id).koniec
let stary_czas = grupaWykonanInit.find(x=> x.id == rowGrupa.id).czas
let nowy_czas = rowGrupa.czas

// let koniec = rowGrupa.koniec

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