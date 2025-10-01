import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./ProcesyView.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeader from "./header/ProcesyHeader";
import { _status } from "utils/initialvalue";
import { dragDropProcesGrupaToProcesor } from "actions/dragDropProcesGrupaToProcesor";
import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";

import ProcesViewRow from "./row/ProcesViewRow";
import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";
import { useApiPapier } from "hooks/useApiPapier";
import ProcesViewRowPrzerwa from "./row/ProcesViewRowPrzerwa";
import { dragdropProcesGrupaMulti } from "actions/dragdropProcesGrupaMulti";

export default function ProcesyView( ) {
  const navigate = useNavigate();
  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  const setSelectedProcesor = techContext.setSelectedProcesor;
  const setSelectedProces = techContext.setSelectedProces;
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const multiSelect = techContext.multiSelect;
  const setMultiSelect = techContext.setMultiSelect;
  const procesory = appContext.procesory
  const setProcesory = appContext.setProcesory
  const setClients = appContext.setClients
  const setClientsWyszukiwarka = appContext.setClientsWyszukiwarka
  const setNadkomplety =appContext.setNadkomplety;
  const selectedProcesor = techContext.selectedProcesor;


      const [callForPaper] = useApiPapier();
  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
          fechGrupyAndWykonaniaForProcesor(1);
          //  fechGrupyAndWykonaniaForProcesor_dni_wstecz(1,dniWstecz)
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


const handleCtrlV = ()=> {
//  console.log(grupyWykonanAll.filter((x) => x.select ==true ).flatMap(stage =>stage.global_id))
// setMultiSelect(grupyWykonanAll.filter((x) => x.select ==true ).flatMap(stage =>stage.global_id))
dragdropProcesGrupaMulti(fechGrupyAndWykonaniaForProcesor,selectedProcesor,sessionStorage.getItem("row_global_id"),multiSelect,setMultiSelect)

  };

const handleCtrlC = ()=> {
//  console.log(grupyWykonanAll.filter((x) => x.select ==true ).flatMap(stage =>stage.global_id))
setMultiSelect(grupyWykonanAll.filter((x) => x.select ==true ).flatMap(stage =>stage.global_id))
  };

  const handleKeyDown = useCallback((event) => {
    const isCtrlOrCmd = event.ctrlKey || event.metaKey;

    if (isCtrlOrCmd && event.key === 'c') {
      handleCtrlC();
    }

    if (isCtrlOrCmd && event.key === 'v') {
      handleCtrlV();
    }

  }, [handleCtrlC])


useEffect(() => {
    // Dodajemy nasłuchiwacz zdarzeń 'keydown' do całego okna
    window.addEventListener('keydown', handleKeyDown);

    // Funkcja czyszcząca: usuwamy nasłuchiwacz po odmontowaniu komponentu
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);


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
  const selectedProces = techContext.selectedProces;
  const [unlockTable, setUnlockTable] = useState(true);
  const [sortwanie,setSortowanie] = useState(false);
  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <table className={style.tableProcesy}>
          <thead>
            <tr>
              <th ></th>
              <th className={style.th_tableProcesy_poczatek}> Początek</th>
              <th className={style.th_tableProcesy_czas}> Czas</th>
              <th className={style.th_tableProcesy_koniec}> Koniec</th>
              <th >Nr</th>
              <th ></th>
              <th> Klient</th>
              <th className={style.th_tableProcesy_praca}> Praca</th>
              <th title="Dyspersja"> D/K</th>
              <th className={style.th_tableProcesy_naklad}> Nakład</th>
              <th onDoubleClick={()=>{  setSortowanie(!sortwanie)}} title="Spedycja"> Sped.</th>
              <th className={style.th_tableProcesy_przeloty}> Przeloty</th>
              <th className={style.th_tableProcesy_ark}> Ark.</th>
              <th className={style.th_tableProcesy_papier_rodzaj}> </th>
              {selectedProces == 1 ? <th className={style.th_tableProcesy_praca}>Papier </th> : <th ></th>}
              {selectedProces == 1 ? <th>Pliki </th> : <></>}
              {selectedProces != 1 ? <th>Status </th> : <></>}
              <th > </th>
            </tr>
          </thead>
          <tbody>
            {
            (sortwanie
              ? grupyWykonanAll
                  .filter((x) => x.procesor_id == selectedProcesor && x.typ_grupy < 3)
                  .sort((a, b) => new Date(a.data_spedycji) - new Date(b.data_spedycji))
              : grupyWykonanAll.filter(
                  (x) => x.procesor_id == selectedProcesor && x.typ_grupy < 3
                )
            )
              .map((grup, i) => {
                if (grup.typ_grupy != 1) {
                  return (
                    <ProcesViewRow
                      grup={grup}
                      unlockTable={unlockTable}
                      setUnlockTable={setUnlockTable}
                      i={i}
                      key={"x"+i}
                    />
                  );
                } else {
                  return (
                    <ProcesViewRowPrzerwa
                      grup={grup}
                      unlockTable={unlockTable}
                      setUnlockTable={setUnlockTable}
                      key={"a"+i}
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
  const setSelectedProcesor = techContext.setSelectedProcesor
  const selectedProces = techContext.selectedProces
  return (
    <div className={style.procesor_btn_main}>
      <div className={style.procesor_btn_left}>  </div>

                  <div className={style.procesor_btn_center}>
                              {procesory
                ?.filter(x => x.grupa == selectedProces  )
                .filter(x => x.id == 35  )
                .map((procesor) => (
                  <Btn_procesor key={procesor.id} setSelectedProcesor={setSelectedProcesor} id={procesor.id} nazwa={procesor.nazwa} procesor={procesor} />
                ))}
        {procesory
                ?.filter(x => x.grupa == selectedProces && x.id !=35 )
                .map((procesor) => (
                  <Btn_procesor key={procesor.id} setSelectedProcesor={setSelectedProcesor} id={procesor.id} nazwa={procesor.nazwa} procesor={procesor} />
                ))}
            </div>
        <div className={style.procesor_btn_right}>  </div>
    </div>
  );
}

const Btn_procesor = ({id,nazwa,procesor}) =>{
  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const setSelectedProcesor = techContext.setSelectedProcesor
  const selectedProcesor = techContext.selectedProcesor
  const procesory = appContext.procesory
  const setProcesory = appContext.setProcesory

  function handleDrop(id) {
    if(id!=selectedProcesor){
          if (sessionStorage.getItem("typ_drag") == "grupa_proces" && sessionStorage.getItem("typ_grupy") != 1) {
      let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
      dragDropProcesGrupaToProcesor(id_drag_grupa_proces,id,fechGrupyAndWykonaniaForProcesor)
    }
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return(
    <button  

    title={"Procesor ID: "+ id}
    key={id}
   onDrop={()=>handleDrop(id)}
  onDragOver={handleDragOver}
    className={procesor.select ? style.btn_procesor_selected : style.btn_procesor}
    onClick={(event) => {

     setSelectedProcesor(id)
     fechGrupyAndWykonaniaForProcesor(id)
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