import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./Diagnostyka.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";


import DiagnostykaHeader from "./components/header/DiagnostykaHeader";

export default function Diagnostyka( ) {
  const navigate = useNavigate();

  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const oddaniaGrupy =appContext.oddaniaGrupy;
  const setOddaniaGrupy =appContext.setOddaniaGrupy;
  const fechOddaniaGrupy =appContext.fechOddaniaGrupy;
  const widokOddan =appContext.widokOddan;



  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
          fechOddaniaGrupy(widokOddan)

        } else {
          navigate("/Login");
        }
      });
  }

  useEffect(() => {
    checkToken();
  }, []);


  return (
    <div className={style.main}>
        <DiagnostykaHeader />

      <div className={style.container}>
        {/* <TechnologiaStage/> */}
 
      </div>
    </div>
  );
}


