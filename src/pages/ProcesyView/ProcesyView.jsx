import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./ProcesyView.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeader from "./ProcesyHeader";
import { _status } from "utils/initialvalue";
import { dragDropProcesGrupaToProcesor } from "actions/dragDropProcesGrupaToProcesor";
import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";

import ProcesViewRow from "./ProcesViewRow";
import { getClients } from "actions/getClients";
import { getPapiery } from "actions/getPapiery";
import { getPapieryNazwy } from "actions/getPapieryNazwy";

export default function ProcesyView( ) {
  const navigate = useNavigate();
  const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  const setSelectedProcesor = techContext.setSelectedProcesor;
  const setSelectedProces = techContext.setSelectedProces;
  const appContext = useContext(AppContext)
  const procesory = appContext.procesory
  const setProcesory = appContext.setProcesory
  const setClients = appContext.setClients

  const setListaPapierow =appContext.setListaPapierow;
  const setNadkomplety =appContext.setNadkomplety;
  const setListaPapierowNazwy =appContext.setListaPapierowNazwy;
  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
          fechGrupyAndWykonaniaForProcesor(1);
          setSelectedProcesor(1);
          setSelectedProces(1);

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

            getClients(setClients)
            getPapiery(setListaPapierow)
            getPapieryNazwy(setListaPapierowNazwy)
        





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
        <ProcesyHeader />
        <WykonaniaTable  />
      <div className={style.container}>
        <TechnologiaStage/>
        <Procesory
        />
      </div>
    </div>
  );
}

const WykonaniaTable = () => {
  const techContext = useContext(TechnologyContext);
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const selectedProcesor = techContext.selectedProcesor;
  const [unlockTable, setUnlockTable] = useState(true);

  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <table>
          <thead>
            <tr>
              <th> Początek</th> <th> Czas</th> <th> Koniec</th> <th> </th> <th>Nr</th> <th> Rok</th> <th> Klient</th> <th> Praca</th> <th> Uwagi</th> <th> Przeloty</th> <th> </th>
            </tr>
          </thead>
          <tbody>
            {grupyWykonanAll
              .filter((x) => x.procesor_id == selectedProcesor)
              .map((grup, i) => {
                return <ProcesViewRow grup={grup} unlockTable={unlockTable} setUnlockTable={setUnlockTable}/>;
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
  return (
    <div className={style.procesor_btn_container}>

{procesory
         ?.filter(x => x.grupa == selectedProces )
        .map((procesor) => (

          <Btn_procesor key={procesor.id} setSelectedProcesor={setSelectedProcesor} id={procesor.id} nazwa={procesor.nazwa} procesor={procesor} />

        ))}
    </div>
  );
}

const Btn_procesor = ({id,nazwa,procesor}) =>{
  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const fechGrupyAndWykonaniaAll = techContext.fechGrupyAndWykonaniaAll
  const setSelectedProcesor = techContext.setSelectedProcesor
  // const selectedProcesor = techContext.selectedProcesor
  const procesory = appContext.procesory
  const setProcesory = appContext.setProcesory

  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "grupa_proces" && sessionStorage.getItem("typ_grupy") != 1) {
      let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
      // let id_drop_grupa_proces = id;
      dragDropProcesGrupaToProcesor(id_drag_grupa_proces,id,fechGrupyAndWykonaniaForProcesor)

    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  // const grupyWykonanAll = techContext.grupyWykonanAll;
  return(
    <button  
    draggable
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