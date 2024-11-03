import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";

import style from "./ProcesyView.module.css";

import { DepWindow } from "pages/DeepWindow/dep-window";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";

export default function Druk({ user, setUser }) {
  const navigate = useNavigate();
  const contextApp = useContext(AppContext);
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const fechGrupyAndWykonaniaAll = techContext.fechGrupyAndWykonaniaAll;
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const wykonania = techContext.wykonania;

  const [selectedProcesor, setSelectedProcesor] = useState(1);
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
    <div className={style.container}>
      <button
        // onClick={() => openInNewTab("/BackStage")}
        onClick={() => setShowWindowPortal(true)}
        className={style.btn}
      >
        Nowe...
      </button>

      <Procesor
        selectedProcesor={selectedProcesor}
        setSelectedProcesor={setSelectedProcesor}
      />

      <WykonaniaTable selectedProcesor={selectedProcesor} />
    </div>
  );
}

const WykonaniaTable =({selectedProcesor}) =>{
  const techContext = useContext(TechnologyContext);
  const grupyWykonanAll = techContext.grupyWykonanAll;
  return(
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
  <th> Status</th>
  <th> Stan</th>
  <th> id</th>

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
                  <td>{grup.poczatek}</td>
                  <td>{grup.czas} min</td>
                  <td>{grup.koniec} </td>
                  <td>{grup.nr}</td>
                  <td>{grup.rok}</td>
                  <td>{grup.klient}</td>
                  <td>{grup.status} </td>
                  <td>{grup.stan} </td>
                  <td>{grup.id}</td>
                 
 
                </tr>
      
              );
            })}
        </tbody>
      </table>
      </div>
  )
}

function Procesor({ selectedProcesor,setSelectedProcesor}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Procesor </label>
      <select
        className={style.select}
        defaultValue={selectedProcesor}
        onChange={(event) => {
          setSelectedProcesor(event.target.value)

        }}
      >
        {procesory
        // .filter(x => x.grupa == rowProces.nazwa_id )
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}


const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};


