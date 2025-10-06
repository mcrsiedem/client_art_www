import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./Inspekcja.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";


import { ModalInsertContext } from "context/ModalInsertContext";
import DaneIns from "./components/dane/DaneIns";
import ProduktIns from "./components/produkt/ProduktIns";
import InspekcjaHeader from "./components/header/InspekcjaHeader";

export default function Inspekcja( ) {
  const navigate = useNavigate();
  const modalContext = useContext(ModalInsertContext);

  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const oddaniaGrupy =appContext.oddaniaGrupy;
  const setOddaniaGrupy =appContext.setOddaniaGrupy;
  const fechOddaniaGrupy =appContext.fechOddaniaGrupy;
  const widokOddan =appContext.widokOddan;



  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then(async (res) => {
        if (res.data.Status === "Success") {
          fechOddaniaGrupy(widokOddan)

          const res = await axios.get(IP + "parametry/"+appContext.idZamowieniaDiag+"/"+ sessionStorage.getItem("token"));
           modalContext.setDaneZamowienia([])
           modalContext.setProdukty([])
           modalContext.setElementy([])
           modalContext.setFragmenty([])
           modalContext.setOprawa([])
           modalContext.setProcesyElementow([])
           modalContext.setTechnologieID([])
           modalContext.setHistoriaZamowienia([])
           modalContext.setPakowanie([])
           modalContext.setDaneZamowienia(res.data[0][0])
           modalContext.setProdukty(res.data[1])
           modalContext.setElementy(res.data[2])
           modalContext.setFragmenty(res.data[3])
           modalContext.setOprawa(res.data[4])
           modalContext.setProcesyElementow(res.data[5])
           modalContext.setTechnologieID(res.data[6])
           modalContext.setHistoriaZamowienia(res.data[7])
           modalContext.setPakowanie(res.data[8])
           modalContext.setKosztyDodatkoweZamowienia(res.data[9])
           modalContext.setKsiegowosc(res.data[10][0])
           modalContext.setFaktury(res.data[11])




        } else {
          navigate("/Login");
        }
      });
  }

  useEffect(() => {
    checkToken();
  }, [appContext.idZamowieniaDiag]);


  return (
    <div className={style.main}>
        <InspekcjaHeader />

      <div className={style.container}>
       <DaneIns/>
       <ProduktIns/>
 
      </div>
    </div>
  );
}


