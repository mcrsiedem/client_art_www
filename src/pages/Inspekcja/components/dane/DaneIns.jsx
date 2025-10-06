import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import style from "./DaneIns.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _etapy_produkcji, _stan_dokumentu, _status, _status_dokumentu } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";
import { getNameStatus } from "actions/getNameStatus";



export default function DaneIns( ) {
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
    <div className={style.row1}>   <p className={style.title}>{daneZamowienia?.nr} / {daneZamowienia?.rok}</p><p className={style.title}> {daneZamowienia?.klient} </p> <p className={style.title}>  {daneZamowienia?.tytul}</p> </div>
    <div className={style.row2}> <p className={style.title3}>Stan: {daneZamowienia?.stan} {getNameStatus(daneZamowienia?.stan,_stan_dokumentu)} </p>  <p className={style.title3}> Status: {daneZamowienia?.status} {getNameStatus(daneZamowienia?.status,_status_dokumentu)}</p><p className={style.title3} > Etap: {daneZamowienia?.etap} {getNameStatus(daneZamowienia?.etap,_etapy_produkcji)} </p>  </div>
    </div>
  );
}


