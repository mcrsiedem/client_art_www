import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./UstawieniaHeader.module.css";

import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";



function UstawieniaHeader() {
  const [value, setValue] = useState("cos2");
  const navigate = useNavigate();
  const show = localStorage.getItem("header");
  const techContext = useContext(TechnologyContext);
  const selectedProces = techContext.selectedProces;
  const setSelectedProces = techContext.setSelectedProces;
  const setSelectedProcesor = techContext.setSelectedProcesor;
  const selectedProcesor = techContext.selectedProcesor;
  const wykonaniaAll = techContext.wykonaniaAll;
  const grupyWykonanAll = techContext.grupyWykonanAll;


  const appContext = useContext(AppContext)

  // aby useEffect załadował się tylko raz
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
      // console.log("value: "+ value)
   //   console.log("Test tokenu"+ token.token)
      //console.log("Test pojedynczego rendera Header")
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  //---------------------------------------------------------



  return (
    <div className={style.container}>
    <header id="header" className={style.body}>


          <div className={style.leftHeaderContener}>

{/* <ProcesSelect selectedProces={selectedProces} setSelectedProces={setSelectedProces} setSelectedProcesor={setSelectedProcesor} selectedProcesor={selectedProcesor}/> */}
          <p className={style.ustawienia_txt}>Ustawienia </p> 
            {/* // wywietla zaznaczone zamowienia
          {appContext.zamowienia
          .filter(x=> x.select == true)
          .map((x=>{ return ( 
            <p> {x.id}, </p>
          )})) } */}



          </div>
          

      <div className={style.centerHeaderContener}>
        
             {/* <p>{selectedProcesor}</p> */}
       
        {/* <img
              className={style.icon}
              src={iconAdd}
              onClick={() => {
                // console.clear()
                console.log("Procesy: ")
                // console.log("Wykonania: ", wykonaniaAll)
                console.log("grupy: ",grupyWykonanAll)
              }}
              alt="React Logo"
            /> */}
       
      </div>
        <div className={style.rightHeaderContener}>
          {/* <input></input> */}
          <img
            className={style.icon}
            src={iconClose2}
            onClick={() => {
              navigate("/Panel");
            }}
            alt="React Logo"
          />
        </div>


    </header>
    </div>
  );
}

export default UstawieniaHeader;


function ProcesSelect({ selectedProces,setSelectedProces,setSelectedProcesor,selectedProcesor}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesListName = contextApp.procesListName
  const procesList = contextApp.procesList
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor

  const procesory = contextApp.procesory
  const setProcesory = contextApp.setProcesory
  return (
    <div className={style.col_dane}>
      
      <select
        className={style.procesy_input}
        defaultValue={selectedProces}
        onChange={(event) => {
          setSelectedProces(event.target.value)
          setSelectedProcesor(procesList.filter(x => x.nazwa_id == event.target.value)[0].procesor_domyslny )
           fechGrupyAndWykonaniaForProcesor(procesList.filter(x => x.nazwa_id == event.target.value)[0].procesor_domyslny )


           setProcesory(
            procesory
            .map((t) => {return{...t, select: false}})
            .map((t) => {
              if (t.id == procesList.filter(x => x.nazwa_id == event.target.value)[0].procesor_domyslny ) {
                return {...t, select: true }
              } else {
                return t;
              }
            })
          )


        }}
      >
        {procesListName?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );}