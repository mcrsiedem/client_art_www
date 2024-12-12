import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./Ustawienia.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeader from "./UstawieniaHeader";
import { _status } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";

export default function Ustawienia({ user, setUser }) {
  const navigate = useNavigate();
  const techContext = useContext(TechnologyContext);
  // const fechGrupyAndWykonaniaAll = techContext.fechGrupyAndWykonaniaAll;
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  const setSelectedProcesor = techContext.setSelectedProcesor;


  const appContext = useContext(AppContext)

  const procesory = appContext.procesory
  const setProcesory = appContext.setProcesory


  // fechGrupyAndWykonaniaForProcesor



  async function checkToken() {
    axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
      if (res.data.Status === "Success") {
     
        fechGrupyAndWykonaniaForProcesor(1)
        setSelectedProcesor(1)
        
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

        <Procesory
        />
      </div>
    </div>
  );
}

const WykonaniaTable =() =>{
  const techContext = useContext(TechnologyContext);
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const selectedProcesor = techContext.selectedProcesor;
  const appcontext = useContext(AppContext);
  const typ_elementu = appcontext.typ_elementu;
  return(
    <div className={style.container}>
    <div className={style.tableContainer}>
<table>
        <thead>
<tr>
  <th> Początek</th>  <th> Czas</th>  <th> Koniec</th>  <th> proces</th> <th> procesor</th> <th> nr</th>  <th> rok</th>  <th> Klient</th>  <th> Praca</th>  <th> Element</th>  <th> Stan</th>  <th> Status</th>  <th> Uwagi</th>
</tr>
        </thead>
        <tbody>
                {grupyWykonanAll
                .filter((x) => x.procesor_id == selectedProcesor)
            .map((grup, i) => {
              return (
                <tr
                  draggable
                  // onDragStart={() => handleDragStart(l.id)}
                  className={style.tr_legi_mini}
                  key={grup.id + i}
                >
                  <td style={{width: "130px"}}>{grup.poczatek}</td>
                  <td style={{width: "60px"}}>{zamienNaGodziny(grup.czas) } </td>
                  <td style={{width: "140px"}}>{grup.koniec} </td>
                  <td style={{width: "140px"}}>{grup.proces_id} </td>
                  <td style={{width: "140px"}}>{grup.procesor_id} </td>
                  <td style={{width: "50px"}}>{grup.nr}</td>
                  <td style={{width: "50px"}}>{grup.rok}</td>
                  <td style={{width: "200px"}}>{grup.klient}</td>
                  <td >{grup.tytul}</td>
                  <td style={{width: "100px"}}>{typ_elementu?.filter(x => x.id == grup.element_id)[0]?.nazwa}</td>
                  <Stan/>
                  <Status/>
                  <td style={{width: "200px"}}>{grup.uwagi}</td>
                </tr>
      
              );
            })}
        </tbody>
      </table>
      </div>
      </div>
  )
}

function Status({ selectedProcesor,setSelectedProcesor,selectedProces}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  const _status_wykonania = contextApp._status_wykonania
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
<td style={{width: "130px"}}>
      <select
        className={style.select}
        value={selectedProcesor}
        onChange={(event) => {
          // setSelectedProcesor(event.target.value)

        }}
      >
        {_status_wykonania
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

function Stan() {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  const _stan_wykonania = contextApp._stan_wykonania
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const selectedProcesor = techContext.updateGrupaWykonan
  return (
<td style={{width: "100px"}}>
      <select
        className={style.select}
        value={selectedProcesor}
        onChange={(event) => {
          // setSelectedProcesor(event.target.value)

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

          <Btn_procesor setSelectedProcesor={setSelectedProcesor} id={procesor.id} nazwa={procesor.nazwa} procesor={procesor}/>

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


  // const grupyWykonanAll = techContext.grupyWykonanAll;
  return(
    <button 

    className={procesor.select ? style.btn_procesor_selected : style.btn_procesor}
    onClick={(event) => {

      console.log(" id: ", id)
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
     {nazwa} {id}
   </button> 
  )
}