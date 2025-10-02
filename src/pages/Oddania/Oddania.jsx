import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./Oddania.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import OprawaProcesyHeader from "./OddaniaHeader";
import { _status } from "utils/initialvalue";


import { sortOddania } from "./actions/sortOddania";
import OddanieRow from "./OddanieRow";
import OddaniaHeader from "./OddaniaHeader";

export default function Oddania( ) {
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
        <OddaniaHeader />
        <OddaniaTable  />
      <div className={style.container}>
        {/* <TechnologiaStage/> */}
 
      </div>
    </div>
  );
}

const OddaniaTable = () => {
  const techContext = useContext(TechnologyContext);
  const appContext = useContext(AppContext)
  const oddaniaGrupy =appContext.oddaniaGrupy;
  const sortowanieOddania = appContext.sortowanieOddania;
  const setSortowanieOddania = appContext.setSortowanieOddania;

  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <table className={style.tableProcesy}>
          <thead>
            <tr>
              <th onDoubleClick={()=>{  setSortowanieOddania("nr")}}className={style.th_tableProcesy_nr} > Nr</th>
              <th onDoubleClick={()=>{  setSortowanieOddania("klient")}}  className={style.th_tableProcesy_klient}> Klient</th>
              <th onDoubleClick={()=>{  setSortowanieOddania("praca")}} className={style.th_tableProcesy_praca}> Praca</th>
              <th onDoubleClick={()=>{  setSortowanieOddania("oprawa")}} className={style.th_tableProcesy_naklad}> Oprawiono</th>
              <th onDoubleClick={()=>{  setSortowanieOddania("naklad")}} className={style.th_tableProcesy_naklad}> Nakład</th>
              <th onDoubleClick={()=>{  setSortowanieOddania("zrealizowano")}} className={style.th_tableProcesy_naklad}> Oddano </th>
              <th onDoubleClick={()=>{  setSortowanieOddania("data")}}>Spedycja</th>
              <th onDoubleClick={()=>{  setSortowanieOddania("status")}}>Status</th>
              <th onDoubleClick={()=>{  setSortowanieOddania("uwagi")}}> Uwagi</th>
            </tr>
          </thead>
          <tbody>
            {
            
            // sortOddania(oddaniaGrupy,sortowanieOddania)
              // .filter(
              //   (x) => x.procesor_id == selectedProcesor && x.typ_grupy == 2
              // )
              sortOddania(oddaniaGrupy,sortowanieOddania)?.map((grup, i) => {
              // oddaniaGrupy?.map((grup, i) => {
                  return <OddanieRow grup={grup} key={grup.global_id} i={i} />;
             
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

