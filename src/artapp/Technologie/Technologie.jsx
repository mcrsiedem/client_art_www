
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import { ip } from "../../Host";
import TechnologiaTable from "./components/Table/TechnologiaTable";

export default function Technologie(){

  const [dataTechnologie,setDataTechnologie] =useState([]);
  const [isStageTechnologiaVisible,setStageTEchnologiaVisible] =useState(false);
  const [activeRowId,setActiveRowId] =useState();

    const effectRan = useRef(false);
    useEffect(() => {
      if (effectRan.current === true) {
         fetchTechnologie();

      }
      return () => {
        effectRan.current = true;
      };
    }, []);

   async function fetchTechnologie(){
      const res = await axios.get(ip + "technologie");
      let job =[...res.data]
      setDataTechnologie(job)
      console.log(job)
    }


    return(
    <>
        <Header/>
        <TechnologiaTable dataTechnologie={dataTechnologie} setStageTEchnologiaVisible={setStageTEchnologiaVisible} setActiveRowId={setActiveRowId}/>
        <Footer/>

      

    </>
    )
    
}