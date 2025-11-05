import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import style from "./ElementTechInsPane.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _etapy_produkcji, _stan_dokumentu, _status, _status_dokumentu } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";
import { getNameStatus } from "actions/getNameStatus";
import ElementTechIns from "./ElementTechIns";



export default function ElementTechInsPane( ) {
  const navigate = useNavigate();

  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const modalContext = useContext(ModalInsertContext);
  const oddaniaGrupy =appContext.oddaniaGrupy;
  const setOddaniaGrupy =appContext.setOddaniaGrupy;
  const fechOddaniaGrupy =appContext.fechOddaniaGrupy;
  const widokOddan =appContext.widokOddan;


  const daneZamowienia =modalContext.daneZamowienia;
  const produkty =modalContext.produkty;
  const elementyTech =techContext.elementyTech;
  


  




  return (
    <div className={style.main}>
                {elementyTech?.sort((a, b) => b.typ - a.typ)
                  // .filter((x) => x.delete != true)
                  .map((elementTech, i) => {
                    return (
                        <ElementTechIns
                          key={elementTech.globa_id}
                          elementTech={elementTech}
 
                        />
                    );
                  })}
    </div>
  );
}


