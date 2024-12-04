import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";

import style from "./ProcesyView.module.css";

import { DepWindow } from "pages/DeepWindow/dep-window";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeader from "./ProcesyHeader";
import { _status } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";




export default function ProcesyView({ user, setUser }) {
  const navigate = useNavigate();
  const contextApp = useContext(AppContext);
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const fechGrupyAndWykonaniaAll = techContext.fechGrupyAndWykonaniaAll;
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const wykonania = techContext.wykonania;

  const [selectedProcesor, setSelectedProcesor] = useState(1);
  const [selectedProces, setSelectedProces] = useState(1);
  const [showWindowPortal, setShowWindowPortal] = useState(false);

  async function checkToken() {
    axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
      if (res.data.Status === "Success") {
        fechGrupyAndWykonaniaAll();
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

        <ProcesyHeader selectedProces={selectedProces} setSelectedProces={setSelectedProces} setSelectedProcesor={setSelectedProcesor}/>
        <WykonaniaTable selectedProcesor={selectedProcesor} />

      <div className={style.container}>

        <Procesory
          selectedProcesor={selectedProcesor}
          setSelectedProcesor={setSelectedProcesor}
          selectedProces={selectedProces}
        />
      </div>
    </div>
  );
}

const WykonaniaTable =({selectedProcesor}) =>{
  const techContext = useContext(TechnologyContext);
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const appcontext = useContext(AppContext);
  const typ_elementu = appcontext.typ_elementu;
  return(
    <div className={style.container}>
    <div className={style.tableContainer}>
<table>
        <thead>
<tr>
  <th> Początek</th>
  <th> Czas</th>
  <th> Koniec</th>
  <th> nr</th>
  <th> rok</th>
  <th> Klient</th>
  <th> Praca</th>
  <th> Element</th>
  <th> Stan</th>
  <th> Status</th>
  <th> Uwagi</th>


</tr>
        </thead>
        <tbody>
                {grupyWykonanAll?.filter((x) => x.procesor_id == selectedProcesor)
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
                  <td style={{width: "50px"}}>{grup.nr}</td>
                  <td style={{width: "50px"}}>{grup.rok}</td>
                  <td style={{width: "200px"}}>{grup.klient}</td>
                  <td >{grup.tytul}</td>
                  <td style={{width: "100px"}}>{typ_elementu?.filter(x => x.id == grup.typ_elementu)[0]?.nazwa}</td>
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

function Stan({ selectedProcesor,setSelectedProcesor,selectedProces}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  const _stan_wykonania = contextApp._stan_wykonania
  const updateGrupaWykonan = techContext.updateGrupaWykonan
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


function Procesory({ selectedProcesor,setSelectedProcesor,selectedProces}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.procesor_btn_container}>

{procesory
         ?.filter(x => x.grupa == selectedProces )
        .map((option) => (

          <Btn_procesor setSelectedProcesor={setSelectedProcesor} id={option.id} nazwa={option.nazwa}/>

        ))}
    </div>
  );
}

const Btn_procesor = ({setSelectedProcesor,id,nazwa}) =>{

  return(
    <button 

    className={style.btn_procesor}
    onClick={(event) => {
     setSelectedProcesor(id)

   }}>
     {nazwa}
   </button> 
  )
}