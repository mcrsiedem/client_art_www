import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./ProcesyHeader.module.css";

import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import iconWC from "assets/wc.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { updateDeletePrzerwa } from "actions/updateDeletePrzerwa";



function ProcesyHeader() {
  const [value, setValue] = useState("cos2");
  const navigate = useNavigate();
  const show = localStorage.getItem("header");
  const techContext = useContext(TechnologyContext);
  const selectedProces = techContext.selectedProces;
  const setSelectedProces = techContext.setSelectedProces;
  const setSelectedProcesor = techContext.setSelectedProcesor;
  const selectedProcesor = techContext.selectedProcesor;
  const wykonaniaAll = techContext.wykonaniaAll;
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;


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

  function handleDragStart(){
     sessionStorage.setItem("typ_drag", "przerwa");
  
   }

     function handleDrop() {
      //  if (sessionStorage.getItem("typ_drag") == "grupa_proces") {
      //    let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
      //    let id_drop_grupa_proces = id;
      //    dragDropProcesGrupa(id_drag_grupa_proces,id_drop_grupa_proces,fechGrupyAndWykonaniaForProcesor)
      //  }
   
   
       if (sessionStorage.getItem("typ_drag") == "przerwa") {
        updateDeletePrzerwa(sessionStorage.getItem("id_grupa_proces_drag"),fechGrupyAndWykonaniaForProcesor)
       }
   
   
       
     }

     function handleDragOver(e) {
      e.preventDefault();
    }

  return (
    <div className={style.container}>
    <header id="header" className={style.body}>


          <div className={style.leftHeaderContener}>

<ProcesSelect selectedProces={selectedProces} setSelectedProces={setSelectedProces} setSelectedProcesor={setSelectedProcesor} selectedProcesor={selectedProcesor}/>
          {/* <p>Procesy </p>  */}
            {/* // wywietla zaznaczone zamowienia
          {appContext.zamowienia
          .filter(x=> x.select == true)
          .map((x=>{ return ( 
            <p> {x.id}, </p>
          )})) } */}



          </div>
          

      <div className={style.centerHeaderContener}>
        
             {/* <p>{selectedProcesor}</p> */}
       
        <img
        onDragStart={() => handleDragStart()}
        onDragOver={handleDragOver}
        onDrop={()=>handleDrop()}
              className={style.icon}
              src={iconWC}
              onClick={() => {
              }}
              alt="React Logo"
            />
       
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

export default ProcesyHeader;


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