import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./ProcesyMini.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeaderMini from "./ProcesyHeaderMini";
import { _status } from "utils/initialvalue";
import { dragDropProcesGrupaToProcesor } from "actions/dragDropProcesGrupaToProcesor";
import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";

import ProcesViewRow from "./ProcesViewRowMini";
import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";
import { useApiPapier } from "hooks/useApiPapier";
import ProcesViewRowPrzerwa from "./ProcesViewRowPrzerwaMini";
import DecodeToken from "pages/Login/DecodeToken";

export default function ProcesyMini( ) {
  const navigate = useNavigate();
  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  const fechGrupyOprawaForProcesor = techContext.fechGrupyOprawaForProcesor;
  
  const setSelectedProcesor = techContext.setSelectedProcesor;
  const selectedProcesor = techContext.selectedProcesor;
  const setSelectedProces = techContext.setSelectedProces;
  const procesory = appContext.procesory
  const setProcesory = appContext.setProcesory
  const setClients = appContext.setClients
  const setClientsWyszukiwarka = appContext.setClientsWyszukiwarka
  const setNadkomplety =appContext.setNadkomplety;

      const [callForPaper] = useApiPapier();
      const CheckProcesorID = (procesor_id) => {
      
        
        if(procesor_id == null){
          console.log(" Selected procesor form fech :" +procesor_id)
        console.log(" Procesor domyslny form fech :" +DecodeToken(sessionStorage.getItem("token")).procesor_domyslny)
           console.log("proc z tokena"+DecodeToken(sessionStorage.getItem("token")).procesor_domyslny)
          
        return procesor_id = DecodeToken(sessionStorage.getItem("token")).procesor_domyslny
        }else {
console.log("proc domyslny"+procesor_id)

          return procesor_id
        }
      
      
      
      }
  async function checkToken() {
    axios
      .get(IP + "/islogged/" + sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.Status === "Success") {
//DecodeToken(sessionStorage.getItem("token")).id0

let proc = CheckProcesorID(selectedProcesor)
// console.log("proc do fech "+proc)
          fechGrupyAndWykonaniaForProcesor(proc);
          fechGrupyOprawaForProcesor(proc);
          

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
        <ProcesyHeaderMini />
        <WykonaniaTable  />
      <div className={style.container}>
        {/* <TechnologiaStage/> */}
        {/* <Procesory
        /> */}
      </div>
    </div>
  );
}

const WykonaniaTable = () => {
  const techContext = useContext(TechnologyContext);
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const grupyOprawaAll = techContext.grupyOprawaAll;

  
  const selectedProcesor = techContext.selectedProcesor;
  const selectedProces = techContext.selectedProces;
  const [unlockTable, setUnlockTable] = useState(true);

  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <table className={style.tableProcesy}>
          <thead>
            <tr>
              {/* <th className={style.th_tableProcesy_poczatek}> Początek</th> */}
              {/* <th className={style.th_tableProcesy_czas}> Czas</th> */}
              {/* <th className={style.th_tableProcesy_koniec}> Koniec</th> */}
              <th ></th>
           
              <th >Nr</th>
              <th> Klient</th>
                 <th > </th>
              <th> Praca</th>
              <th> </th>
              {/* <th> </th> */}
              {/* <th> </th> */}

              {/* <th> Uwagi</th> */}
              {/* <th> Spedycja</th> */}
              {/* <th> Przeloty</th> */}
              {/* <th> Papier</th> */}
              {/* {selectedProces == 1 ? <th>Pliki </th> : <></>} */}
              <th> Status </th>
            </tr>
          </thead>
          <tbody>

            {selectedProcesor == 8 || selectedProcesor == 10 ? grupyOprawaAll
              .filter(
                (x) => x.procesor_id == selectedProcesor && x.typ_grupy < 3
              )
              .map((grup, i) => {
                if (grup.typ_grupy != 1) {
                  return (
                   //TODO
                    // ProcesViewRowOprawa
                    <ProcesViewRow
                      grup={grup}
                      unlockTable={unlockTable}
                      setUnlockTable={setUnlockTable}
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
              }) :
              
              grupyWykonanAll
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
              })
              
              }
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