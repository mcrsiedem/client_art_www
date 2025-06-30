import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./OprawaProcesyHeader.module.css";
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import iconWC from "assets/wc.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { updateDeletePrzerwa } from "actions/updateDeletePrzerwa";
import { updateDeletePrzerwaOprawa } from "actions/updateDeletePrzerwaOprawa";



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



  return (
    <div className={style.container}>
      <header id="header" className={style.body}>
        <div className={style.leftHeaderContener}>
          <p className={style.title2}>OPRAWA </p>
           <DataWyswietlania/>
          {/* <ProcesSelect
            selectedProces={selectedProces}
            setSelectedProces={setSelectedProces}
            setSelectedProcesor={setSelectedProcesor}
            selectedProcesor={selectedProcesor}
          /> */}
        </div>

        <div className={style.centerHeaderContener}>
        {/* <PokazStany2 /> */}
        <PrzerwaBTN />

        </div>
        <div className={style.rightHeaderContener}>
     
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


function PrzerwaBTN() {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesListName = contextApp.procesListName
  const fechGrupyOprawaForProcesor = techContext.fechGrupyOprawaForProcesor

  const [czas,setCzas] = useState(60)
  const [show,setShow] = useState(false)

  const [initTime,setInitTime] = useState(1)
  const [initMinuty,setInitMintuty] = useState(60)
  return (

      <div  className={style.przerwa_container}>
              <img
        onDragStart={() => handleDragStart()}
        onDragOver={handleDragOver}
        onDrop={()=>handleDrop()}
              className={style.icon2}
              src={iconWC}
              onClick={() => {
            setShow(!show)
              }}
              alt="React Logo"
            />
           <TimeSelect show={show} setCzas={setCzas} initTime={initTime} setInitTime={setInitTime} initMinuty={initMinuty} setInitMintuty={setInitMintuty}/>
      </div>

        
  );

 



  function handleDragStart(){
    sessionStorage.setItem("typ_drag", "przerwa");
    sessionStorage.setItem("czas_przerwy", czas);
 
  }

    function handleDrop() {
     //  if (sessionStorage.getItem("typ_drag") == "grupa_proces") {
     //    let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
     //    let id_drop_grupa_proces = id;
     //    dragDropProcesGrupa(id_drag_grupa_proces,id_drop_grupa_proces,fechGrupyAndWykonaniaForProcesor)
     //  }
  
  
      if (sessionStorage.getItem("typ_drag") == "grupa_proces" && sessionStorage.getItem("typ_grupy") == 1) {
       updateDeletePrzerwaOprawa(sessionStorage.getItem("id_grupa_proces_drag"),fechGrupyOprawaForProcesor)
      }
  
  
      
    }

    function handleDragOver(e) {
     e.preventDefault();
   }

}

const TimeSelect = ({show,setCzas,initTime,setInitTime,initMinuty,setInitMintuty})=>{

  if(show)
  return(<div className={style.time_selec_container}>
  <input  value={initTime} className={style.input} onChange={(event)=>{ 

const re = /^[0-9]+$/;

if (event.target.value === '' || re.test(event.target.value)) {
setInitTime(event.target.value)
    setCzas(initMinuty * event.target.value)}} 
}


    >
      
    </input>
  <select className={style.select} value={initMinuty} onChange={(event)=>{
    setInitMintuty(event.target.value)
    setCzas(initTime * event.target.value)}}>
  <option key={1} value={1}> min. </option>
  <option key={2} value={60}> godz. </option>
  <option key={3} value={1440}> dni </option>
  </select>
  </div>)
  
}






  function DataWyswietlania(){
    const techContext = useContext(TechnologyContext);
  // const fechGrupyAndWykonaniaForProcesor2 = techContext.fechGrupyAndWykonaniaForProcesor2
  // const fechGrupyAndWykonaniaForProcesor_dni_wstecz = techContext.fechGrupyAndWykonaniaForProcesor_dni_wstecz
  const fechGrupyAndWykonaniaForProcesor_dni_wstecz_oprawa = techContext.fechGrupyAndWykonaniaForProcesor_dni_wstecz_oprawa
  
  const dniWstecz = techContext.dniWstecz;
  const setDniWstecz = techContext.setDniWstecz;
  const selectedProcesor = techContext.selectedProcesor



  return(
      <div className={style.col}>
      {/* <label className={style.label}> Wyświetl od... </label> */}
      <input className={style.selectDataWyswietlania} type="date"
         value={dniWstecz}
        //  disabled= {DecodeToken(sessionStorage.getItem("token")).zamowienie_przyjmij==1? false:true}
         onChange={(event) => {

          // fechGrupyAndWykonaniaForProcesor2(selectedProcesor,event.target.value) 
          // fechGrupyAndWykonaniaForProcesor_dni_wstecz(selectedProcesor,event.target.value) 
          //  fechGrupyOprawaForProcesor(selectedProcesor)
           fechGrupyAndWykonaniaForProcesor_dni_wstecz_oprawa(selectedProcesor,event.target.value)
          setDniWstecz( event.target.value);



            
     

         }}></input>
    </div>
  );
}
