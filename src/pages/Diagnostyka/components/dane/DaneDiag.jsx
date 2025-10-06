import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import style from "./DaneDiag.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";



export default function DaneDiag( ) {
  const navigate = useNavigate();

  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const modalContext = useContext(ModalInsertContext);
  const oddaniaGrupy =appContext.oddaniaGrupy;
  const setOddaniaGrupy =appContext.setOddaniaGrupy;
  const fechOddaniaGrupy =appContext.fechOddaniaGrupy;
  const widokOddan =appContext.widokOddan;


  const daneZamowienia =modalContext.daneZamowienia;






  return (
    <div className={style.main}>
    
    <p className={style.title2}>{daneZamowienia?.nr} / {daneZamowienia?.rok}</p>
    <p className={style.title}> {daneZamowienia?.klient} {daneZamowienia?.tytul}</p>
    <p className={style.title2}> {daneZamowienia?.tytul}</p>
    </div>
  );
}


