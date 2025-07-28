import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./Grupa_wykonan.module.css";
import { useHistoria } from "hooks/useHistoria";
import DecodeToken from "pages/Login/DecodeToken";
import iconDelete from "assets/trash2.svg";
import { updateSkasujGrupe } from "actions/updateSkasujGrupe";


export default  function SkasujGrupeWykonan({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const daneTech = techContext.daneTech;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
const [add,dodajDoZamowienia] = useHistoria()

  // const global_id_grupa = row.global_id
   if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1) {
  return (
    <div style={{ paddingTop: "13px" }}>
      <img
        title="Skasuj grupę"
        className={style.expand}
        src={iconDelete} 
        onClick={() => {

           if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1) {
             if (rowGrupa.global_id > 1 && daneTech.id > 1) {
               updateSkasujGrupe(
                 rowGrupa.global_id,
                 fechparametryTechnologii,
                 rowGrupa.zamowienie_id,
                 rowGrupa.technologia_id
               );

            dodajDoZamowienia(         {
              kategoria: "Technologia",
              event: "Skasowana grupa: " +rowGrupa.nazwa + " ID: " +rowGrupa.id,
              zamowienie_id: rowGrupa.zamowienie_id,
              user_id: DecodeToken(sessionStorage.getItem("token")).id
            })

             } else {
               setGrupaWykonan(grupaWykonan.filter((e) => e.id != rowGrupa.id));
               setWykonania(wykonania.filter((e) => e.grupa_id != rowGrupa.id));
             }
           }

        }}
        alt="Procesy"
      />
    </div>
  );
   }
}