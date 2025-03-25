import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import style from "./TechnologieView.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import ProcesyHeader from "./TechnologieViewHeader";
import { _status } from "utils/initialvalue";

import TechnologiaStage from "components/TechnologiaStage/TechnologiaStage";
import { getClients } from "actions/getClients";
import { getNadkomplety } from "actions/getNadkomplety";

import { useApiPapier } from "hooks/useApiPapier";


export default function TechnologieView({ user, setUser }) {
  const navigate = useNavigate();

  const techContext = useContext(TechnologyContext);
  const fechTechnology = techContext.fechTechnology;
  const [selectedProcesor, setSelectedProcesor] = useState(1);
  const [selectedProces, setSelectedProces] = useState(1);
  const appcontext = useContext(AppContext);
  const setClients =appcontext.setClients;
  const setClientsWyszukiwarka =appcontext.setClientsWyszukiwarka;
  const setNadkomplety =appcontext.setNadkomplety;
  
    const [callForPaper] = useApiPapier();
  async function checkToken() {
    axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
      if (res.data.Status === "Success") {
        fechTechnology()
        start()
      } else {
        navigate("/Login");
      }
    });
  }

  useEffect(() => {
    checkToken();
  }, []);

  const start = async() => {
;

      callForPaper()
      getClients(setClients,setClientsWyszukiwarka )
      getNadkomplety(setNadkomplety)

  }

  return (
    <div className={style.main}>

        <ProcesyHeader selectedProces={selectedProces} setSelectedProces={setSelectedProces} setSelectedProcesor={setSelectedProcesor}/>
        <WykonaniaTable selectedProcesor={selectedProcesor} />
        <TechnologiaStage/>
      <div className={style.container}>
{/* 
        <Procesory
          selectedProcesor={selectedProcesor}
          setSelectedProcesor={setSelectedProcesor}
          selectedProces={selectedProces}
        /> */}
      </div>
    </div>
  );
}

const WykonaniaTable =({selectedProcesor}) =>{
  const techContext = useContext(TechnologyContext);
  const technology = techContext.technology;
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const appcontext = useContext(AppContext);
  const typ_elementu = appcontext.typ_elementu;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  return(
    <div className={style.container}>
    <div className={style.tableContainer}>
<table className={style.table}>
        <thead>
<tr>
  <th> #</th>
  <th> nr</th>
  <th> Rok</th>
  <th> Klient</th>
  <th> Tytuł</th>
  {/* <th> Czas</th> */}
  {/* <th> Praca</th> */}
  {/* <th> Element</th> */}
  <th> Stan</th>
  <th> Status</th>
  <th> Uwagi</th>


</tr>
        </thead>
        <tbody>



{technology?.map((row) => {
        return (
          <tr 
            key={row.id}
            onDoubleClick={(node, event) => {
              // fechparametryTechnologii(row.id,row.prime_id)
              fechparametryTechnologii(row.id)
              // setActiveRowId(row.id)
              // setShowTechnologyStage(true);
            }}
            onClick={()=> {
              // console.log("klik!")
                // setRow(row.id)
            // console.log(row.id)
            }}
          >
            <td>{row.id} </td>
            <td>{row.nr} </td>
            <td>{row.rok} </td>
            <td>{row.klient} </td>
   
            <td>{row.tytul}</td>
            {/* <td>{row.zamowienie_id}</td> */}

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