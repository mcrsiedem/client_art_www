
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import { TechnologyContext } from "context/TechnologyContext";
import axios from "axios";
import { IP } from "../../utils/Host";
import TechnologiaTable from "./components/Table/TechnologiaTable";
import TechnologiaStage from "./TechnologiaStage/TechnologiaStage";


export default function Technologie(){
  const technology = TechnologyContext.technology;
  const showTechnologyStage = TechnologyContext.showTechnologyStage;

  const [dataTechnologie,setDataTechnologie] =useState([]);
  const [isStageTechnologiaVisible,setStageTechnologiaVisible] =useState(false);
  const [activeRowId,setActiveRowId] =useState();

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
      //  fetchTechnologie();
      // const socket = io.connect("http://localhost:3002")
      console.log("tech "+technology)
    }
    return () => {
      effectRan.current = true;
    };
  }, []);


    return(
    <>
      <Header/>
      <TechnologiaTable/>
      <TechnologiaStage/>

    </>
    )
    
}