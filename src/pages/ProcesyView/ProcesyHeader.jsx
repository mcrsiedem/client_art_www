import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./ProcesyHeader.module.css";
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import iconClose2 from "assets/x2.svg";
import iconCopy from "assets/copy.svg";
import iconSheet from "assets/extract.svg";

import iconWC from "assets/wc.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { updateDeletePrzerwa } from "actions/updateDeletePrzerwa";
import axios from "axios";
import { IP } from "../../utils/Host";


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
          <ProcesSelect
            selectedProces={selectedProces}
            setSelectedProces={setSelectedProces}
            setSelectedProcesor={setSelectedProcesor}
            selectedProcesor={selectedProcesor}
          />
          {/* <p> {selectedProces}</p> */}
        </div>

        <div className={style.centerHeaderContener}>
        {/* <PokazStany /> */}
        <PrzerwaBTN />
        {/* <ODZNACZ_BTN /> */}
        {/* <KOPIUJ_ZAZNACZONE_BTN2 /> */}
        

        </div>
        <div className={style.rightHeaderContener}>
        <Szukaj />

        <WYDAJ_ZAZNACZONE_BTN />
        <KOPIUJ_ZAZNACZONE_BTN />
     
          <img
            className={style.icon_close}
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

// const ODZNACZ_BTN = () =>{
//      const techContext = useContext(TechnologyContext);
//       const grupyWykonanAll = techContext.grupyWykonanAll;
//       const setGrupWykonanAll = techContext.setGrupWykonanAll;
//   return(
//     <button 
//     onClick={(event) => {
//             // console.log(" select" + grup.global_id + " " + event.target.checked);
//             setGrupWykonanAll(
//               grupyWykonanAll.map((t) => {
//                   return { ...t, select: false};
//               })
//             );
//           }
//     }
//     >Odznacz</button>
//   )
// }

function Szukaj() {
  const techContext = useContext(TechnologyContext);
;
  const grupyWykonanAll = techContext.grupyWykonanAll;
    const setGrupWykonanAll = techContext.setGrupWykonanAll;
    const grupyWykonanAllWyszukiwarka = techContext.grupyWykonanAllWyszukiwarka;


  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
  return (
    <input
      className={style.szukajInput}
      type="text"
      title="Znajdź tytuł pracy..."
      placeholder=""
      onChange={(event) => {
  
      

         let  m =  grupyWykonanAllWyszukiwarka.filter(x=> x.tytul !=null  ).filter((k) =>
                      //  k.tytul.toLowerCase().includes(event.target.value.toLowerCase()) 
            k.tytul.concat(" ", k.nr ).concat(" ", k.nr_stary ).concat(" ", k.klient ).toLowerCase().includes(event.target.value.toLowerCase()) 


          )

        setGrupWykonanAll(
         m
        );







      }}
    ></input>
  );
}



function KOPIUJ_ZAZNACZONE_BTN() {
   const techContext = useContext(TechnologyContext);
      const grupyWykonanAll = techContext.grupyWykonanAll;
      const setGrupWykonanAll = techContext.setGrupWykonanAll;
  return (

      <div  className={style.przerwa_container}>
              <img
              className={style.icon_copy}
              src={iconCopy}
title="Kopiuj wydanie papieru"
    onClick={(event) => {
            // console.log(" select" + grup.global_id + " " + event.target.checked);
let mes='';

            for( let grupa of grupyWykonanAll.filter(x=> x.select == true)){
              mes += grupa.poczatek+"\t"
              mes +=  grupa.nr_stary+"-"+grupa.nr+"\t"
              mes += grupa.klient+"\t"
              mes += grupa.tytul+"\t"
              mes += grupa.arkusz_szerokosc+"x"+grupa.arkusz_wysokosc +" "+ grupa.nazwa_papieru+" "+grupa.gramatura+" "+grupa.wykonczenie+"\t"
              mes += grupa.przeloty+ " ark. \t"
              mes += "\n"

            }

            setGrupWykonanAll(
              grupyWykonanAll.map((t) => {
                  return { ...t, select: false};
              })
            );

            navigator.clipboard.writeText(mes);
          }
    }


              alt="React Logo"
            />
      </div>

        
  );

}


function WYDAJ_ZAZNACZONE_BTN() {
   const techContext = useContext(TechnologyContext);
      const grupyWykonanAll = techContext.grupyWykonanAll;
      const setGrupWykonanAll = techContext.setGrupWykonanAll;
        const selectedProcesor = techContext.selectedProcesor
        const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  return (

      <div  className={style.przerwa_container}>
              <img
              className={style.icon_copy}
              src={iconSheet}
              title="Wydaj papier"

    onClick={async (event) => {
            // console.log(" select" + grup.global_id + " " + event.target.checked);
let mes='';

            for( let grupa of grupyWykonanAll.filter(x=> x.select == true)){
              mes += grupa.poczatek+"\t"
              mes +=  grupa.nr_stary+"-"+grupa.nr+"\t"
              mes += grupa.klient+"\t"
              mes += grupa.tytul+"\t"
              mes += grupa.arkusz_szerokosc+"x"+grupa.arkusz_wysokosc +" "+ grupa.nazwa_papieru+" "+grupa.gramatura+" "+grupa.wykonczenie+"\t"
              mes += grupa.przeloty+ " ark. \t"
              mes += "\n"

            }

            setGrupWykonanAll(
              grupyWykonanAll.map((t) => {
                  return { ...t, select: false};
              })
            );

            navigator.clipboard.writeText(mes);

            await axios.post(IP + "insertWydaniePapieru_status_multiselect/" + sessionStorage.getItem("token"), grupyWykonanAll.filter(x=> x.select == true));
            fechGrupyAndWykonaniaForProcesor(selectedProcesor)
          }
    }


              alt="React Logo"
            />
      </div>

        
  );

}


function PrzerwaBTN() {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesListName = contextApp.procesListName
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor

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
              className={style.icon}
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
       updateDeletePrzerwa(sessionStorage.getItem("id_grupa_proces_drag"),fechGrupyAndWykonaniaForProcesor)
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
  <select className={style.select} defaultValue={initMinuty} onChange={(event)=>{
    setInitMintuty(event.target.value)
    setCzas(initTime * event.target.value)}}>
  <option key={1} value={1}> min. </option>
  <option key={2} value={60}> godz. </option>
  <option key={3} value={1440}> dni </option>
  </select>
  </div>)
  
}


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


  function PokazStany2({  }) {
    const techContext = useContext(TechnologyContext);
    const grupyWykonanAll = techContext.grupyWykonanAll
    return (
      <button
        onClick={async () => {
          console.clear()
          console.log("Prces Viev: ")
          console.log("GrupyAll : ",grupyWykonanAll)

  
        }}
        className={ style.btn}
      >
        Stany...
      </button>
    );
  }

  const PokazStany = () => {
    const techContext = useContext(TechnologyContext);
    const grupyWykonanAll = techContext.grupyWykonanAll
    return (
      <div className={style.menu_produkty}>
        <img
          className={style.iconMenuBtn}
          src={Logo_ustawienia2}
          title="Auto wszystkie arkusze + legi"
          onClick={() => {

            console.clear()
            console.log("Prces Viev: ")
            console.log("GrupyAll : ",grupyWykonanAll)

          }}
          alt="x"
        />
      </div>
    );
  };
  