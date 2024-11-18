
import React, { useState, useEffect,useContext, useRef } from "react";
import Header from "./components/Header/Header";
import { TechnologyContext } from "context/TechnologyContext";
import axios from "axios";
import { IP } from "../../utils/Host";
import { useNavigate } from "react-router-dom";
import TechnologiaTable from "./components/Table/TechnologiaTable";
import TechnologiaStage from "../../components/TechnologiaStage/TechnologiaStage";
import { AppContext } from "context/AppContext";

export default function Technologie(){
  const technology = TechnologyContext.technology;
  const showTechnologyStage = TechnologyContext.showTechnologyStage;

  const [dataTechnologie,setDataTechnologie] =useState([]);
  const [isStageTechnologiaVisible,setStageTechnologiaVisible] =useState(false);


  const appContext = useContext(AppContext);

  const setListaPapierow =appContext.setListaPapierow;
  const setListaPapierowNazwy =appContext.setListaPapierowNazwy;

  const navigate = useNavigate();

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
      //  fetchTechnologie();
      // const socket = io.connect("http://localhost:3002")
      // console.log(technology)
      checkToken()
      //  getTechnology(setTechnology)
    }
    return () => {
      effectRan.current = true;
    };
  }, []);


  async function checkToken() {
    axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
      if (res.data.Status === "Success") {
        // fechZamowienia();
        // getTechnology(setTechnology)

   start()
        
      } else {
        navigate("/Login");
      }
    });
  }

  const start = async() => {
    // getTechnology(setTechnology)
    const res3 = await axios.get(IP + "lista-papierow");
    setListaPapierow([...res3.data]);
    const res4 = await axios.get(IP + "lista-papierow-nazwy");
    setListaPapierowNazwy([...res4.data]);
  }

    return(

    <div>
      <Header/>
      <TechnologiaTable/>
      <TechnologiaStage/>
    </div>
   


    )
    
}