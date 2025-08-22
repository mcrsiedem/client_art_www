import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./OprawaView.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import OprawaProcesyHeader from "./OprawaProcesyHeader";
import { _status } from "utils/initialvalue";
import { dragDropProcesGrupaToProcesor } from "actions/dragDropProcesGrupaToProcesor";
import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";


import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";
import { useApiPapier } from "hooks/useApiPapier";
import OprawaProcesViewRowPrzerwa from "./OprawaProcesViewRowPrzerwa";
import OprawaProcesViewRow from "./OprawaProcesViewRow";

export default function OprawaView( ) {
  const navigate = useNavigate();
  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const fechGrupyOprawaForProcesor = techContext.fechGrupyOprawaForProcesor;
  const setSelectedProcesor = techContext.setSelectedProcesor;
  const setSelectedProces = techContext.setSelectedProces;
  const procesory = appContext.procesory
  const setProcesory = appContext.setProcesory
  const setClients = appContext.setClients
  const setClientsWyszukiwarka = appContext.setClientsWyszukiwarka
  const setNadkomplety =appContext.setNadkomplety;

      const [callForPaper] = useApiPapier();
  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
          fechGrupyOprawaForProcesor(8);
          setSelectedProcesor(8);
          setSelectedProces(6);

          setProcesory(
            procesory
              ?.map((t) => {
                return { ...t, select: false };
              })
              .map((t) => {
                if (t.id == 8) {
                  return { ...t, select: true };
                } else {
                  return t;
                }
              })
          );

         callForPaper()
         getClients(setClients,setClientsWyszukiwarka)
         getNadkomplety(setNadkomplety)
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
        <OprawaProcesyHeader />
        <WykonaniaTable  />
      <div className={style.container}>
        {/* <TechnologiaStage/> */}
        <Procesory
        />
      </div>
    </div>
  );
}

const WykonaniaTable = () => {
  const techContext = useContext(TechnologyContext);
  const grupyOprawaAll = techContext.grupyOprawaAll;
  const selectedProcesor = techContext.selectedProcesor;
  const [unlockTable, setUnlockTable] = useState(true);

  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <table className={style.tableProcesy}>
          <thead>
            <tr>
              <th className={style.th_tableProcesy_poczatek}> Początek</th>{" "}
              <th className={style.th_tableProcesy_poczatek}> Czas</th>{" "}
              <th> Koniec</th>
              <th> Nr</th>
               <th className={style.th_tableProcesy_klient}> Klient</th>
              <th className={style.th_tableProcesy_praca}> Praca</th>
              <th className={style.th_tableProcesy_rodzaj}> Rodzaj</th>
              <th className={style.th_tableProcesy_naklad}> Nakład</th>
              <th>Spedycja</th>
              <th>Status</th>
              <th> Uwagi</th>
            </tr>
          </thead>
          <tbody>
            {grupyOprawaAll
              .filter(
                (x) => x.procesor_id == selectedProcesor && x.typ_grupy < 3
              )
              .map((grup, i) => {
                // return (<OprawaProcesViewRow grup={grup} unlockTable={unlockTable} setUnlockTable={setUnlockTable}/>)

                if (grup.typ_grupy == 2) {
                  return <OprawaProcesViewRow grup={grup} key={i} />;
                } else {
                  return <OprawaProcesViewRowPrzerwa grup={grup} />;
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
  return (
    <div className={style.procesor_btn_container}>

{procesory
         ?.filter(x => x.grupa == selectedProces  )
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
  const fechGrupyOprawaForProcesor = techContext.fechGrupyOprawaForProcesor
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
    // draggable
    key={id}
  //  onDrop={()=>handleDrop(id)}
  // onDragOver={handleDragOver}
   

    className={procesor.select ? style.btn_procesor_selected : style.btn_procesor}
    onClick={(event) => {

      // console.log(" id: ", id)
      // console.log(" grupy wykonan techcontex: ", grupyWykonanAll)
     setSelectedProcesor(id)
    //  fechGrupyAndWykonaniaForProcesor(id)
     fechGrupyOprawaForProcesor(id)
     
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