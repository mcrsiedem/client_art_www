import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";

import style from "./Druk.module.css";

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

  function closeWindowPortal() {
    setShowWindowPortal(false)
  }
  async function fechZamowienia() {

    // const res = await axios.get(IP + "zamowienia");
    // let jobs= [...res.data].filter(job => job.final == 1);
    // setData(jobs);

    // const res3 = await axios.get(IP + "lista-papierow");
    // setListaPapierow([...res3.data]);
    // const res4 = await axios.get(IP + "lista-gramatur");
    // setListaGramatur([...res4.data]);
  }

  async function checkToken() {
    axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
      if (res.data.Status === "Success") {
        fechGrupyAndWykonaniaAll();
      } else {
        navigate("/Login");
      }
    });
  }

  async function refreshZamowienia() {
    // const res = await axios.get(IP + "zamowienia");
    // let jobs= [...res.data].filter(job => job.final == 1);
    // setData(jobs);
  }



  useEffect(() => {
    checkToken();
  }, []);



  return (
    <div className={style.container}>

                <button
            // onClick={() => openInNewTab("/BackStage")}
            onClick={() =>  setShowWindowPortal(true)}

            className={style.btn}
          >
            Nowe...
          </button>
<Procesor selectedProcesor={selectedProcesor} setSelectedProcesor={setSelectedProcesor}/>
      druk
      {grupyWykonanAll?.filter((x) => x.procesor_id == selectedProcesor)
            .map((grup, i) => {
              return (
          
                 
                
                <tr
                  draggable
                  // onDragStart={() => handleDragStart(l.id)}
                  className={style.tr_legi_mini}
                  key={grup.id + i}
                >
                  <td>{grup.id}</td>
                  <td>{grup.nr}</td>
                  <td>{grup.rok}</td>
                  <td>{grup.klient}</td>
                  <td>{grup.poczatek}</td>
                  <td>{grup.czas} min</td>
                  <td>{grup.koniec} </td>
                  <td>{grup.status} </td>
                  <td>{grup.stan} </td>
                  <td></td>
 
                </tr>
      
              );
            })}
      
    </div>
  );
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
  

          // if (row.indeks == 0) {
          //   setProdukty(
          //     produkty.map((p) => {
          //       if (p.id === row.produkt_id) {
          //         return { ...p, oprawa: event.target.value };
          //       } else {
          //         return p;
          //       }
          //     })
          //   );
          // }
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


