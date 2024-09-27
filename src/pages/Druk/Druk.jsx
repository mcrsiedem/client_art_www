import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";

import style from "./Druk.module.css";


import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";

export default function Druk({ user, setUser }) {
  const navigate = useNavigate();
  const contextApp = useContext(AppContext);
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;

  const [selectedProcesor, setSelectedProcesor] = useState(1);

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
        fechZamowienia();
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

      druk
      {grupaWykonan
            .filter((x) => x.procesor_id == selectedProcesor)
            .map((grup, i) => {
              return (
                <tr
                  draggable
                  // onDragStart={() => handleDragStart(l.id)}
                  className={style.tr_legi_mini}
                  key={grup.id + i}
                >
                  <td>{grup.id}</td>
                  <td></td>
 
                </tr>
              );
            })}
      
    </div>
  );
}






