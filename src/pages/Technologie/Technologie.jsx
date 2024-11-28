
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

  const techContext = useContext(TechnologyContext);
  const technology = TechnologyContext.technology;
  const fechTechnology = techContext.fechTechnology;


  const appContext = useContext(AppContext);

  const setListaPapierow =appContext.setListaPapierow;
  const setListaPapierowNazwy =appContext.setListaPapierowNazwy;

  const navigate = useNavigate();

  const effectRan = useRef(false);

  async function checkToken() {
    axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
      if (res.data.Status === "Success") {
        fechTechnology();
        console.log("Succes fech technologie")
        // getTechnology(setTechnology)

   start()
        
      } else {
        navigate("/Login");
      }
    });
  }

  // tutaj nie chciały się ładować technologie ale tylko na serwerze
  // useEffect(() => {
  //   if (effectRan.current === true) {
  //     checkToken()
  //   }
  //   return () => {
  //     effectRan.current = true;
  //   };
  // }, []);

  useEffect(() => {
    checkToken();
  }, []);


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