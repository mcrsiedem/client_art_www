
import React, { useState, useEffect, useRef,useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";

import style from "./TechnologieStage.module.css";
import Header from "components/TechnologiaStage/components/Header/Header";


export default function TechnologiaStage(){

    const techContext = useContext(TechnologyContext);
  const showTechnologyStage = techContext.showTechnologyStage;
  const setShowTechnologyStage = techContext.setShowTechnologyStage;
  const openTechnologia = techContext.openTechnologia;



  const [dataTechnologie,setDataTechnologie] =useState([]);
  const [isStageTechnologiaVisible,setStageTechnologiaVisible] =useState(false);
  const [activeRowId,setActiveRowId] =useState();



  // const effectRan = useRef(false);
  // useEffect(() => {
  //   if (effectRan.current === true) {
  //     if(openTechnologia){
  //       console.log("open technologia")
  //     }

  //   }
  //   return () => {
  //     effectRan.current = true;
  //   };
  // }, []);



  useEffect(() => {

      if(openTechnologia){
        console.log("open technologia")
      }


  }, []);


if(showTechnologyStage) {
    return(
        <div className={style.container}>
       <Header/>
        
      
        </div>
        ) 
}


    
}