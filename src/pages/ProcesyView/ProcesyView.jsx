import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./ProcesyView.module.css";
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




export default function ProcesyView({ user, setUser }) {
  const navigate = useNavigate();
  const techContext = useContext(TechnologyContext);
  // const fechGrupyAndWykonaniaAll = techContext.fechGrupyAndWykonaniaAll;
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  const setSelectedProcesor = techContext.setSelectedProcesor;
  const setSelectedProces = techContext.setSelectedProces;


  const appContext = useContext(AppContext)

  const procesory = appContext.procesory
  const setProcesory = appContext.setProcesory



  // fechGrupyAndWykonaniaForProcesor



  async function checkToken() {
    axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
      if (res.data.Status === "Success") {
     
        fechGrupyAndWykonaniaForProcesor(1)
        setSelectedProcesor(1)
        setSelectedProces(1)
        
     setProcesory(
      procesory
      ?.map((t) => {return{...t, select: false}})
      .map((t) => {
        if (t.id == 1) {
          return {...t, select: true }
        } else {
          return t;
        }
      })
    )
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

const WykonaniaTable =() =>{
  const techContext = useContext(TechnologyContext);
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const wykonaniaAll = techContext.wykonaniaAll;
  const selectedProcesor = techContext.selectedProcesor;
  const appcontext = useContext(AppContext);
  const typ_elementu = appcontext.typ_elementu;
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const [expand, setExpand] = useState(false);
  
  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "grupa_proces") {
      let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
      let id_drop_grupa_proces = id;
      dragDropProcesGrupa(id_drag_grupa_proces,id_drop_grupa_proces,fechGrupyAndWykonaniaForProcesor)
    }


    if (sessionStorage.getItem("typ_drag") == "przerwa") {
      updateAddPrzerwa(id,fechGrupyAndWykonaniaForProcesor)
    }


    
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

 function handleDragStart(id,typ_grupy){
  //   e.preventDefault();

  if(typ_grupy == 1){
    sessionStorage.setItem("id_grupa_proces_drag", id);
   sessionStorage.setItem("typ_drag", "przerwa");
  }

  if(typ_grupy != 1){
    sessionStorage.setItem("id_grupa_proces_drag", id);
    sessionStorage.setItem("typ_drag", "grupa_proces");
  }




 }
  return(
    <div className={style.container}>
    <div className={style.tableContainer}>
<table>
        <thead>
<tr>
  <th> Początek</th>  <th> Czas</th>  <th> Koniec</th>  <th> nr</th>  <th> rok</th>  <th> Klient</th>  <th> Praca</th>  <th> Element</th>  <th> Uwagi</th><th> Stan</th>  <th> Status</th>  
</tr>
        </thead>
        <tbody>
                {grupyWykonanAll
                .filter((x) => x.procesor_id == selectedProcesor)
            .map((grup, i) => {
              return (
                <>
                <tr
                  draggable
                   key={grup.global_id}
                  onDrop={()=>handleDrop(grup.global_id,grup.procesor_id)}
                 onDragOver={handleDragOver}
                  
                  onDragStart={() => handleDragStart(grup.global_id,grup.typ_grupy)}
                  className={style.tr_legi_mini}
                  onDoubleClick={(node, event) => {
         
                      if(grup.typ_grupy != 1 ){
                        fechparametryTechnologii(grup.technologia_id)
                      }
                    
                  }}
                >
                  <td style={{width: "130px"}}>{grup.poczatek}</td>
                  <td style={{width: "60px"}}>{zamienNaGodziny(  grup.czas) } </td>
                  <td style={{width: "140px"}}>{grup.koniec} </td>
                  <td style={{width: "50px"}}>{grup.nr}</td>
                  <td style={{width: "50px"}}>{grup.rok}</td>
                  <td style={{width: "200px"}}>{grup.klient}</td>
                  <td >{grup.tytul}</td>
                  <td style={{width: "100px"}}>{typ_elementu?.filter(x => x.id == grup.element_id)[0]?.nazwa}</td>
                  <td style={{width: "200px"}}>{grup.global_id}</td>
                  {grup.typ_grupy != 1 ?  <Stan grup={grup}/> : <></>}
                  {grup.typ_grupy != 1 ?  <Status grup={grup}/> : <></>}
                  {/* <Stan grup={grup}/>
                  <Status grup={grup}/> */}
                  
                 
                </tr>
                {expand ? (
              wykonaniaAll
                .filter((el) => el.grupa_id == grup.id && el.technologia_id == grup.technologia_id)
                .map((row) => {
                  return (
                    <tr  key={row.global_id}>
                       {/* draggable={lockDragDrop}  onDragStart={()=>handleDragStart(row.id)} */}
      
                      <td>{row.id}</td>
                      <td>{row.czas}</td>
                      <td> global id {row.global_id}</td>

                      <td>element_id {row.element_id}</td>
                      <td></td>
                      <td></td>
                      <td></td>

                      <td>grupa_id {row.grupa_id}</td>
                      {/* <Typ row={row} /> */}
                      {/* <td>{row.ilosc_stron} </td> */}
                      {/* <WersjaOprawaFragment
                        row={row}
                        handleChangeCardFragmenty={handleChangeCardFragmenty}
                      /> */}

                      {/* <NakladOprawaFregment
                        row={row}
                        handleChangeCardFragmenty={handleChangeCardFragmenty}
                      />
                       */}
                  
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
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
            })}
        </tbody>
      </table>
      </div>
      </div>
  )
}

function Status({grup}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const selectedProcesor = techContext.selectedProcesor
  return (
<td style={{width: "130px"}}>
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
    if (sessionStorage.getItem("typ_drag") == "grupa_proces") {
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