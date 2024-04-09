
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import axios from "axios";
import { IP } from "../../utils/Host";


export default function Technologie(){

  const [dataTechnologie,setDataTechnologie] =useState([]);
  const [isStageTechnologiaVisible,setStageTechnologiaVisible] =useState(false);
  const [activeRowId,setActiveRowId] =useState();

    return(
    <>
      <Header/>
      

    </>
    )
    
}