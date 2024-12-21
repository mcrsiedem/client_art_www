import React, { useState, useEffect, useRef, useContext } from "react";


import icon from "assets/copy.svg";



import { reg_int } from "utils/initialvalue";
// import NrArkusza from "./NrArkusza";
// import { reg_int } from "utils/initialvalue";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./ProcesViewRow.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeader from "./ProcesyHeader";
import { _status } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { dragDropProcesGrupa } from "actions/dragDropProcesGrupa";
import { dragDropProcesGrupaToProcesor } from "actions/dragDropProcesGrupaToProcesor";
import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";
import { updateWykonaniaOrazGrupaFromProcesView } from "actions/updateWykonaniaOrazGrupaFromProcesView";
import { updateAddPrzerwa } from "actions/updateAddPrzerwa";
import { date_time } from "actions/date_time";



export default function ProcesViewRow({ grup,unlockTable, setUnlockTable }) {
    const navigate = useNavigate();
    const techContext = useContext(TechnologyContext);
    const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
    const wykonaniaAll = techContext.wykonaniaAll;
    const appcontext = useContext(AppContext);
    const typ_elementu = appcontext.typ_elementu;

      const fechparametryTechnologii = techContext.fechparametryTechnologii;
        const [expand, setExpand] = useState(false);

  return (
<>
                <tr
           
                  draggable={unlockTable}
                   key={grup.global_id}
                  onDrop={()=>handleDrop(grup.global_id,grup.procesor_id)}
                 onDragOver={handleDragOver}
                  
                  onDragStart={() => {
                
                      handleDragStart(grup.global_id,grup.typ_grupy)
            
                    
                  }}
                  className={style.tr_legi_mini}
                  onDoubleClick={(node, event) => {
         
                      if(grup.typ_grupy != 1 ){
                        fechparametryTechnologii(grup.technologia_id)
                      }
                    
                  }}
                >
                  <td style={{minWidth: "130px",width:"130px"}}>{grup.poczatek}</td>
                  <td style={{width: "60px"}}>{zamienNaGodziny(  grup.czas) } </td>
                  <KoniecGrupa grup={grup}/>
                  {/* <td style={{minWidth: "130px",width: "140px"}}>{grup.koniec} </td> */}
                  {/* <td style={{minWidth: "130px",width: "140px"}}>{grup.koniec} </td> */}
                  <td style={{width: "80px"}}>{typ_elementu?.filter(x => x.id == grup.element_id)[0]?.nazwa}</td>
                  <td style={{width: "50px"}}>{grup.nr}</td>
                  <td style={{width: "50px"}}>{grup.rok}</td>
                  <td style={{width: "200px"}}>{grup.klient}</td>
                  <td style={{minWidth: "130px"}}>{grup.tytul}</td>
                  <td style={{minWidth: "130px"}}>{grup.uwagi}</td>
                  {/* {grup.typ_grupy != 1 ?  <Stan grup={grup}/> : <></>} */}
                  {grup.typ_grupy != 1 ?  <Status grup={grup}/> : <></>}

                  
                 
                </tr>
                {expand ? (
              wykonaniaAll
                .filter((el) => el.grupa_id == grup.id && el.technologia_id == grup.technologia_id)
                .map((row) => {
                  return (
                    <tr  key={row.global_id}>
                       {/* draggable={lockDragDrop}  onDragStart={()=>handleDragStart(row.id)} */}
      
                      <td></td>
                      <td>{row.czas}</td>
                      {/* <td> global id {row.global_id}</td> */}
                      {/* <td>element_id {row.element_id}</td> */}
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      {/* <td>grupa_id {row.grupa_id}</td> */}
                      <td></td>
                      <td></td>
                      <td></td>
                   
           
                      
                 
                    </tr>
                  );
                })
            ) : (
              <></>
            )}   



</>
  );


  //--------------- Funkcje
  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "grupa_proces") {
      let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
      let id_drop_grupa_proces = id;
      dragDropProcesGrupa(
        id_drag_grupa_proces,
        id_drop_grupa_proces,
        fechGrupyAndWykonaniaForProcesor
      );
    }

    if (sessionStorage.getItem("typ_drag") == "przerwa") {
      updateAddPrzerwa(id, fechGrupyAndWykonaniaForProcesor);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragStart(id, typ_grupy) {
    sessionStorage.setItem("id_grupa_proces_drag", id);
    sessionStorage.setItem("typ_drag", "grupa_proces");
    sessionStorage.setItem("typ_grupy", typ_grupy);
  }
//----------------- 


}





const KoniecGrupa = ({ grup }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie;
  return (
    <td style={{minWidth: "140px",width: "140px"}}>
      <input
        disabled= {false}
        className={style.input2}
        type="datetime-local"
  //        min="2023-06-07T00:00"
  // max="2023-06-14T00:00"
       
        date-
        defaultValue={grup.koniec}
        onChange={(e) => {


          if (e.target.value != "" ) {

            console.log("data: "+ date_time( e.target.value))
          }
        }}
      ></input>
    </td>
  );
};


function Status({grup}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const selectedProcesor = techContext.selectedProcesor
  return (
<td style={{width: "160px"}}>
      <select
        className={style.select}
        value={grup.status}
        onChange={(event) => {
   
          updateWykonaniaOrazGrupaFromProcesView(grup.global_id,1,event.target.value,fechGrupyAndWykonaniaForProcesor,selectedProcesor)
        }}
      >
        {_status_wykonania.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
      </td>

  );
}

function Stan({grup}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);

  const _stan_wykonania = contextApp._stan_wykonania
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const selectedProcesor = techContext.selectedProcesor
  return (
<td style={{width: "100px"}}>
      <select
        className={style.select}
        value={grup.stan}
        onChange={(event) => {
          // setSelectedProcesor(event.target.value)
          updateWykonaniaOrazGrupaFromProcesView(grup.global_id,2,event.target.value,fechGrupyAndWykonaniaForProcesor,selectedProcesor)

        }}
      >
        {_stan_wykonania
        //  .filter(x => x.grupa == selectedProces )
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
</td>
  );
}


