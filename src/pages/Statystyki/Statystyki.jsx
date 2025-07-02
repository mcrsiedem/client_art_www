import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./Statystyki.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeader from "./ProcesyHeader";
import { _status } from "utils/initialvalue";
import { dragDropProcesGrupaToProcesor } from "actions/dragDropProcesGrupaToProcesor";
import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";

import ProcesViewRow from "./ProcesViewRow";
import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";
import { useApiPapier } from "hooks/useApiPapier";
import ProcesViewRowPrzerwa from "./ProcesViewRowPrzerwa";
import STATYSTYKI_HEADER from "./Header/STATYSTYKI_HEADER";
import STATYSTYKI_FOOTER from "./Footer/STATYSTYKI_FOOTER";
import STATYSTYKI_CENTER from "./Center/STATYSTYKI_CENTER";

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

  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
          fechGrupyAndWykonaniaForProcesor(1);

          setProcesory(
            procesory
              ?.map((t) => {
                return { ...t, select: false };
              })
              .map((t) => {
                if (t.id == 1) {
                  return { ...t, select: true };
                } else {
                  return t;
                }
              })
          );
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

const WykonaniaTable = () => {
  const techContext = useContext(TechnologyContext);
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const selectedProcesor = techContext.selectedProcesor;
  const selectedProces = techContext.selectedProces;
  const [unlockTable, setUnlockTable] = useState(true);


        const setGrupWykonanAll = techContext.setGrupWykonanAll;

  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <table className={style.tableProcesy}>
          <thead>
            <tr>
              <th className={style.th_tableProcesy_poczatek}> Początek</th>
              <th className={style.th_tableProcesy_czas}> Czas</th>
              <th className={style.th_tableProcesy_koniec}> Koniec</th>
              <th ></th>
              <th > </th>
              <th >Nr</th>
              <th> Klient</th>
              <th> Praca</th>
              <th> Uwagi</th>
              <th title="Dyspersja"> D/K</th>
              <th> Nakład</th>
              <th> Spedycja</th>
              <th title="Dyspersja"> Narz.</th>

              <th> Przeloty</th>
              <th> Papier</th>
              {selectedProces == 1 ? <th>Papier </th> : <></>}
              {selectedProces == 1 ? <th>Pliki </th> : <></>}
              <th> Status </th>

            </tr>
          </thead>
          <tbody>
            {grupyWykonanAll
              .filter(
                (x) => x.procesor_id == selectedProcesor && x.typ_grupy < 3
              )
              .map((grup, i) => {
                if (grup.typ_grupy != 1) {
                  return (
                    <ProcesViewRow
                      grup={grup}
                      unlockTable={unlockTable}
                      setUnlockTable={setUnlockTable}
                      i={i}
                    />
                  );
                } else {
                  return (
                    <ProcesViewRowPrzerwa
                      grup={grup}
                      unlockTable={unlockTable}
                      setUnlockTable={setUnlockTable}
                    />
                  );
                }
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};




function Procesory() {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const setSelectedProcesor = techContext.setSelectedProcesor
  const selectedProces = techContext.selectedProces
  const selectedProcesor = techContext.selectedProcesor
  return (
    <div className={style.procesor_btn_main}>
      <div className={style.procesor_btn_left}>  </div>

                  <div className={style.procesor_btn_center}>

        {procesory
                ?.filter(x => x.grupa == selectedProces  )
                .map((procesor) => (

                  <Btn_procesor key={procesor.id} setSelectedProcesor={setSelectedProcesor} id={procesor.id} nazwa={procesor.nazwa} procesor={procesor} />

                ))}
            </div>

        {/* <div className={style.procesor_btn_right}> Proces: {selectedProces}  Procesor: {selectedProcesor} </div> */}
        <div className={style.procesor_btn_right}>  </div>

    </div>

  );
}

const Btn_procesor = ({id,nazwa,procesor}) =>{
  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const fechGrupyAndWykonaniaAll = techContext.fechGrupyAndWykonaniaAll
  const setSelectedProcesor = techContext.setSelectedProcesor
  const selectedProcesor = techContext.selectedProcesor
  const procesory = appContext.procesory
  const setProcesory = appContext.setProcesory

  function handleDrop(id) {
    if(id!=selectedProcesor){
          if (sessionStorage.getItem("typ_drag") == "grupa_proces" && sessionStorage.getItem("typ_grupy") != 1) {
      let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
      // let id_drop_grupa_proces = id;
      dragDropProcesGrupaToProcesor(id_drag_grupa_proces,id,fechGrupyAndWykonaniaForProcesor)

    }
    }

  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  // const grupyWykonanAll = techContext.grupyWykonanAll;
  return(
    <button  

    title={"Procesor ID: "+ id}
    // draggable
    key={id}
   onDrop={()=>handleDrop(id)}
  onDragOver={handleDragOver}
   

    className={procesor.select ? style.btn_procesor_selected : style.btn_procesor}
    onClick={(event) => {

      // console.log(" id: ", id)
      // console.log(" grupy wykonan techcontex: ", grupyWykonanAll)
     setSelectedProcesor(id)
     fechGrupyAndWykonaniaForProcesor(id)
    //  fechGrupyAndWykonaniaAll()

     setProcesory(
      procesory
      .map((t) => {return{...t, select: false}})
      .map((t) => {
        if (t.id == id) {
          return {...t, select: true }
        } else {
          return t;
        }
      })
    )
   }}>
     {nazwa} 
   </button> 
  )
}