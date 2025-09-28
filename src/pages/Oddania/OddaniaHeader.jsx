import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./OddaniaHeader.module.css";
import iconClose2 from "assets/x2.svg";
import iconCopy from "assets/copy.svg";

import iconWC from "assets/wc.svg";
import { useNavigate } from "react-router-dom";
import { TechnologyContext } from "context/TechnologyContext";
import { updateDeletePrzerwaOprawa } from "actions/updateDeletePrzerwaOprawa";
import Szukaj from "./Szukaj/Szukaj";
import { AppContext } from "context/AppContext";

function OddaniaHeader() {
  const navigate = useNavigate();
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
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
          <p className={style.title2}>ODDANIA </p>
           {/* <DataWyswietlania/> */}
        </div>

        <div className={style.centerHeaderContener}>
        </div>
        <div className={style.rightHeaderContener}>
          <FILTROWANIE_ODDANYCH/>
     <Szukaj/>
     <KOPIUJ_ZAZNACZONE_BTN/>
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

export default OddaniaHeader;

function KOPIUJ_ZAZNACZONE_BTN() {
   const techContext = useContext(TechnologyContext);
      const grupyWykonanAll = techContext.grupyWykonanAll;
      const setGrupWykonanAll = techContext.setGrupWykonanAll;
       const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
    const grupyOprawaAll = techContext.grupyOprawaAll;
  return (

      <div  className={style.przerwa_container}>
              <img
              className={style.icon_copy}
              src={iconCopy}
title="Kopiuj zaznaczone..."
    onClick={(event) => {
            // console.log(" select" + grup.global_id + " " + event.target.checked);
let mes='';

            for( let grupa of grupyOprawaAll.filter(x=> x.select == true)){
              // mes += grupa.poczatek+"\t"
              // mes +=  grupa.nr_stary+"-"+grupa.nr+"\t"
              mes += grupa.nr+"\t"
              mes += grupa.klient+"\t"
              mes += grupa.tytul+"\t"
              mes += grupa.typ_procesu+"\t"
              // mes += grupa.arkusz_szerokosc+"x"+grupa.arkusz_wysokosc +" "+ grupa.nazwa_papieru+" "+grupa.gramatura+" "+grupa.wykonczenie+"\t"
              mes += grupa.naklad+ "\t"
              mes += grupa.data_spedycji+ "\t"
              mes += grupa.uwagi+ "\t"
              mes += "\n"

            }

            // setGrupWykonanAll(
            //   grupyWykonanAll.map((t) => {
            //       return { ...t, select: false};
            //   })
            // );

            navigator.clipboard.writeText(mes);
          }
    }


              alt="React Logo"
            />
      </div>

        
  );

}

function PrzerwaBTN() {
  const techContext = useContext(TechnologyContext);
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
      <input className={style.selectDataWyswietlania} type="date"
         value={dniWstecz}
         onChange={(event) => {
           fechGrupyAndWykonaniaForProcesor_dni_wstecz_oprawa(selectedProcesor,event.target.value)
          setDniWstecz( event.target.value);
         }}></input>
    </div>
  );
}


function FILTROWANIE_ODDANYCH() {
  const contextApp = useContext(AppContext);
  const setWidokOddan= contextApp.setWidokOddan;
  const widokOddan= contextApp.widokOddan;
  const fechOddaniaGrupy= contextApp.fechOddaniaGrupy;

  const _oddane = [
    {
      id: 1,
      nazwa: "Do oddania",
    },
    {
      id: 2,
      nazwa: "Oddane",
    },
        {
      id: 3,
      nazwa: "Wszystkie",
    },

  ];

    return (
  
        <select
          className={style.szukajInputSort}
          value={widokOddan}
          onChange={(event) => {
            setWidokOddan(event.target.value)
          fechOddaniaGrupy(event.target.value)


          }}
        >
          {_oddane.map((option) => (
            <option key={option.id} value={option.id}>
            {option.nazwa}
            </option>
          ))}
        </select>
    );
  }