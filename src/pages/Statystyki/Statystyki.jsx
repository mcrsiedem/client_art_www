import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./Statystyki.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";

import { _status } from "utils/initialvalue";



import STATYSTYKI_HEADER from "./Header/STATYSTYKI_HEADER";
import STATYSTYKI_FOOTER from "./Footer/STATYSTYKI_FOOTER";
import STATYSTYKI_CENTER from "./Center/STATYSTYKI_CENTER";
import { useStatystyki } from "hooks/useStatystyki";

export default function Statystyki( ) {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor =
    techContext.fechGrupyAndWykonaniaForProcesor;
  const setSelectedProcesor = techContext.setSelectedProcesor;
  const setSelectedProces = techContext.setSelectedProces;
  const procesory = appContext.procesory;
  const setProcesory = appContext.setProcesory;
  const setClients = appContext.setClients;
  const setClientsWyszukiwarka = appContext.setClientsWyszukiwarka;
  const setNadkomplety = appContext.setNadkomplety;
 const [refreshKalendarz] = useStatystyki()
  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
          refreshKalendarz()


        } else {
          navigate("/Login");
        }
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className={style.container}>
      <STATYSTYKI_HEADER />
      <STATYSTYKI_CENTER />
      <STATYSTYKI_FOOTER />
    </div>
  );
}
