
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import axios from "axios";
import { IP } from "../../utils/Host";


export default function Technologie(){

  const [dataTechnologie,setDataTechnologie] =useState([]);
  const [isStageTechnologiaVisible,setStageTechnologiaVisible] =useState(false);
  const [activeRowId,setActiveRowId] =useState();


    const effectRan = useRef(false);
    useEffect(() => {
      if (effectRan.current === true) {
        //  fetchTechnologie();
        // const socket = io.connect("http://localhost:3002")
      
      }
      return () => {
        effectRan.current = true;
      };
    }, []);




   async function fetchTechnologie(){
      const res = await axios.get(IP + "technologie");
      let job =[...res.data]
      setDataTechnologie(job)
      console.log(job)
    }



    return(
    <>
 
      <Header/>

    </>
    )
    
}