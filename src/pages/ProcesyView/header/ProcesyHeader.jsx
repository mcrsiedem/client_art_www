import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./ProcesyHeader.module.css";
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import iconClose2 from "assets/x2.svg";
import iconCopy from "assets/copy.svg";
import iconCalc from "assets/calc.svg";
import iconCalc2 from "assets/ok.svg";
import iconWytnij from "assets/wytnij.svg";
import iconWklej from "assets/wklej.svg";
import iconSheet from "assets/extract.svg";
import iconPrzerwa from "assets/magic_przerwa.svg";

import iconWC from "assets/wc.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { updateDeletePrzerwa } from "actions/updateDeletePrzerwa";
import axios from "axios";
import { IP } from "../../../utils/Host";
import { getZamowieniaInfoGrupy } from "actions/getZamowieniaInfoGrupy";
import { wagaArkuszy } from "actions/wagaArkuszy";
import DecodeToken from "pages/Login/DecodeToken";
import { useSocket } from "context/SocketContext";
import { sprawdzDostep } from "actions/sprawdzDostep";
import { verifyTimelineContinuity } from "actions/verifyTimelineContinuity";

import { 
  Copy, 
  ClipboardPaste,
  ClipboardX,
  ChevronDown, 
  ChevronUp,
  X,
  CirclePlus,
  KeySquare
} from "lucide-react";

function ProcesyHeader({handleCtrlV,handleCtrlC}) {
  const [value, setValue] = useState("cos2");
  const navigate = useNavigate();
  const show = localStorage.getItem("header");
  const techContext = useContext(TechnologyContext);
  const selectedProces = techContext.selectedProces;
  const setSelectedProces = techContext.setSelectedProces;
  const setSelectedProcesor = techContext.setSelectedProcesor;
  const selectedProcesor = techContext.selectedProcesor;
  const multiSelect = techContext.multiSelect;
  const setMultiSelect = techContext.setMultiSelect;
  const wykonaniaAll = techContext.wykonaniaAll;
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;

   const grupyWykonanAll = techContext.grupyWykonanAll;

  const appContext = useContext(AppContext)
 const { podgladRealizacji,lokalizacja } = useSocket()


  useEffect(() => {

    return () => {

    };
  }, []);
  //---------------------------------------------------------



  return (
    <div onDoubleClick={()=>{
      // console.log(multiSelect)
      
    }} className={style.container}>
      <header
      onDoubleClick={()=>{
        console.log("Co widzę: "+lokalizacja.current )
        console.log("podgladRealizacji: ",podgladRealizacji )
      }}
      id="header" className={style.body}>
        <div className={style.leftHeaderContener}>
          <ProcesSelect
            selectedProces={selectedProces}
            setSelectedProces={setSelectedProces}
            setSelectedProcesor={setSelectedProcesor}
            selectedProcesor={selectedProcesor}
          />
          <DataWyswietlania/>
        <PrzerwaMagicBTN />
        </div>
        <div className={style.centerHeaderContener}>
        {/* <CTRX handleCtrlC={handleCtrlC}/>
        <CTRV handleCtrlV={handleCtrlV}/> */}
        <Wytnij handleCtrlC={handleCtrlC}/>
        <Wklej handleCtrlV={handleCtrlV}/>
        <SprawdzKolejnoscDat />
        <BTN_INFO_ZAMOWIENIA_GRUPY />
        <PrzerwaBTN />
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
            k.tytul.concat(" ", k.nr ).concat(" ", k.nr_stary ).concat(" ", k.klient ).toLowerCase().includes(event.target.value.toLowerCase()) 
          )
        setGrupWykonanAll(
         m
        );

      }}
    ></input>
  );
}

function DataWyswietlania(){
    const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor_dni_wstecz = techContext.fechGrupyAndWykonaniaForProcesor_dni_wstecz
  const dniWstecz = techContext.dniWstecz;
  const setDniWstecz = techContext.setDniWstecz;
  const selectedProcesor = techContext.selectedProcesor
  return(
      <div className={style.col}>
      <input className={style.selectDataWyswietlania} type="date"
         value={dniWstecz}
         onChange={(event) => {
          fechGrupyAndWykonaniaForProcesor_dni_wstecz(selectedProcesor,event.target.value) 
          setDniWstecz( event.target.value);
         }}></input>
    </div>
  );
}


function KOPIUJ_ZAZNACZONE_BTN() {
  const techContext = useContext(TechnologyContext);
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const setGrupWykonanAll = techContext.setGrupWykonanAll;

  // Funkcja czyszcząca dane przed wysłaniem do schowka
  const formatujPole = (tekst) => {
    if (!tekst && tekst !== 0) return "";
    return String(tekst)
      .replace(/"/g, '„') // Zamiana cudzysłowu prostego na drukarski (rozwiązuje Twój główny problem)
      .replace(/[\n\r\t]/g, " ") // Zamiana enterów i tabulatorów na spacje
      .trim();
  };

  const obslugaKopiowania = () => {
    let mes = '';
    const wybraneGrupy = grupyWykonanAll.filter(x => x.select === true);

    for (let grupa of wybraneGrupy) {
      // Budowanie wiersza z użyciem funkcji czyszczącej
      mes += formatujPole(grupa.poczatek) + "\t";
      mes += formatujPole(`${grupa.nr_stary}-${grupa.nr}`) + "\t";
      mes += formatujPole(grupa.klient) + "\t";
      mes += formatujPole(grupa.tytul) + "\t";
      
      // Składanie opisu papieru w jedno bezpieczne pole
      const opisPapieru = `${grupa.arkusz_szerokosc}x${grupa.arkusz_wysokosc} ${grupa.nazwa_papieru} ${grupa.gramatura} ${grupa.wykonczenie}`;
      mes += formatujPole(opisPapieru) + "\t";
      
      mes += formatujPole(grupa.przeloty) + " ark.\t";
      
      const waga = wagaArkuszy(grupa.arkusz_szerokosc, grupa.arkusz_wysokosc, grupa.gramatura, grupa.przeloty);
      mes += formatujPole(waga) + " kg\t";
      
      mes += "\r\n"; // Standardowy znak końca linii (Windows/Excel)
    }

    // Kopiowanie do schowka
    if (mes) {
      navigator.clipboard.writeText(mes).then(() => {
        // Po udanym skopiowaniu odznaczamy elementy
        setGrupWykonanAll(
          grupyWykonanAll.map((t) => ({ ...t, select: false }))
        );
      }).catch(err => {
        console.error("Błąd kopiowania do schowka: ", err);
      });
    }
  };

  return (
    <div className={style.przerwa_container}>
      <img
        className={style.icon_copy}
        src={iconCopy}
        title="Kopiuj wydanie papieru"
        alt="Kopiuj"
        onClick={obslugaKopiowania}
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


          const formatujPole = (tekst) => {
    if (!tekst && tekst !== 0) return "";
    return String(tekst)
      .replace(/"/g, '„') // Zamiana cudzysłowu prostego na drukarski (rozwiązuje Twój główny problem)
      .replace(/[\n\r\t]/g, " ") // Zamiana enterów i tabulatorów na spacje
      .trim();
  };


    const obslugaKopiowania = () => {
    let mes = '';
    const wybraneGrupy = grupyWykonanAll.filter(x => x.select === true);

    for (let grupa of wybraneGrupy) {
      // Budowanie wiersza z użyciem funkcji czyszczącej
      mes += formatujPole(grupa.poczatek) + "\t";
      mes += formatujPole(`${grupa.nr_stary}-${grupa.nr}`) + "\t";
      mes += formatujPole(grupa.klient) + "\t";
      mes += formatujPole(grupa.tytul) + "\t";
      
      // Składanie opisu papieru w jedno bezpieczne pole
      const opisPapieru = `${grupa.arkusz_szerokosc}x${grupa.arkusz_wysokosc} ${grupa.nazwa_papieru} ${grupa.gramatura} ${grupa.wykonczenie}`;
      mes += formatujPole(opisPapieru) + "\t";
      
      mes += formatujPole(grupa.przeloty) + " ark.\t";
      
      const waga = wagaArkuszy(grupa.arkusz_szerokosc, grupa.arkusz_wysokosc, grupa.gramatura, grupa.przeloty);
      mes += formatujPole(waga) + " kg\t";
      
      mes += "\r\n"; // Standardowy znak końca linii (Windows/Excel)
    }

    // Kopiowanie do schowka
    if (mes) {
      navigator.clipboard.writeText(mes).then( async () => {
        // Po udanym skopiowaniu odznaczamy elementy
        setGrupWykonanAll(
          grupyWykonanAll.map((t) => ({ ...t, select: false }))
        );

await axios.post(IP + "insertWydaniePapieru_status_multiselect/" + sessionStorage.getItem("token"), grupyWykonanAll.filter(x=> x.select == true));
            fechGrupyAndWykonaniaForProcesor(selectedProcesor)


      }).catch(err => {
        console.error("Błąd kopiowania do schowka: ", err);
      });
    }
  };

  return (

      <div  className={style.przerwa_container}>
              <img
              className={style.icon_copy}
              src={iconSheet}
              title="Wydaj papier"

    onClick={obslugaKopiowania}


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

      <div title="Wstaw przerwę..." className={style.przerwa_container}>
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
       updateDeletePrzerwa(sessionStorage.getItem("id_grupa_proces_drag"),fechGrupyAndWykonaniaForProcesor)
      }
  
      
    }

    function handleDragOver(e) {
     e.preventDefault();
   }

}

function PrzerwaMagicBTN() {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesListName = contextApp.procesListName
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor

  const [czas,setCzas] = useState(60)
  const [show,setShow] = useState(false)

  const [initTime,setInitTime] = useState(1)
  const [initMinuty,setInitMintuty] = useState(60)

  // if(DecodeToken(sessionStorage.getItem("token")).id==1){
  return (

      <div  className={style.przerwa_container}>
              <img
              title="Przerwa Magic"
        onDragStart={() => handleDragStart()}
        onDragOver={handleDragOver}
        onDrop={()=>handleDrop()}
              className={style.icon3}
              src={iconPrzerwa}
            //   onClick={() => {
            // setShow(!show)
            //   }}
              alt="React Logo"
            />
           {/* <TimeSelect show={show} setCzas={setCzas} initTime={initTime} setInitTime={setInitTime} initMinuty={initMinuty} setInitMintuty={setInitMintuty}/> */}
      </div>

        
  );

  // }



  function handleDragStart(){
    sessionStorage.setItem("typ_drag", "przerwa_magic");
    sessionStorage.setItem("czas_przerwy", czas);
 
  }

    function handleDrop() {

      if (sessionStorage.getItem("typ_drag") == "grupa_proces" && sessionStorage.getItem("typ_grupy") == 1) {
       updateDeletePrzerwa(sessionStorage.getItem("id_grupa_proces_drag"),fechGrupyAndWykonaniaForProcesor)
      }
  
      
    }

    function handleDragOver(e) {
     e.preventDefault();
   }

}
// ------- 


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
        className={style.selectProcesy}
        value={selectedProces}
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
        {procesListName
  ?.filter(x => 
    x.id !== 6 && // Zawsze odfiltruj 6
    (!sprawdzDostep("procesy_kooperacja") || x.id == 17) // Jeśli dostęp=true, to odfiltruj też 1
  )
  .map((option) => (
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
  

  function BTN_INFO_ZAMOWIENIA_GRUPY() {
  const contextApp = useContext(AppContext);
  const setShowZamowieniaInfo = contextApp.setShowZamowieniaInfo;
  const setZamowieniaInfo = contextApp.setZamowieniaInfo;
    const techContext = useContext(TechnologyContext);
    const grupyWykonanAll = techContext.grupyWykonanAll;
  
  const grupy = grupyWykonanAll.filter(x=>x.select==true).map(x => {return {global_id: x.global_id}}  );
  return (
    <img
      title="Policz przeloty"
      className={style.icon2}
      src={iconCalc}
      onClick={() => {
              getZamowieniaInfoGrupy(grupy)
              // sendMail(zamowienia,setShowZamowieniaInfo,setZamowieniaInfo)

      }}
      alt="React Logo"
    />
  );
}

  function SprawdzKolejnoscDat() {
  const contextApp = useContext(AppContext);
  const setShowZamowieniaInfo = contextApp.setShowZamowieniaInfo;
  const setZamowieniaInfo = contextApp.setZamowieniaInfo;
    const techContext = useContext(TechnologyContext);
    const grupyWykonanAll = techContext.grupyWykonanAll;
  
  // const grupy = grupyWykonanAll.filter(x=>x.select==true).map(x => {return {global_id: x.global_id}}  );
  return (
    <img
      title="Sprawdź ciągłość czasu kalendarza..."
      className={style.icon2}
      src={iconCalc2}
      onClick={() => {

        const raport = verifyTimelineContinuity(grupyWykonanAll)
        if (!raport.isValid) {
    alert(`Znaleziono błędy w ciągłości (${raport.totalErrors}):`);
    raport.errors.forEach(err => {
        console.error(`- Między ID ${err.afterGlobalId} a ${err.beforeGlobalId}: ${err.type} (${err.gapMinutes} min)`);
    });
} else {
    alert("Ciągłość czasu jest zachowana.");
}
        // console.log(raport)
              // getZamowieniaInfoGrupy(grupy)
              // sendMail(zamowienia,setShowZamowieniaInfo,setZamowieniaInfo)

      }}
      alt="React Logo"
    />
  );
}


  function Wytnij({handleCtrlC}) {
  const contextApp = useContext(AppContext);
  const setShowZamowieniaInfo = contextApp.setShowZamowieniaInfo;
  const setZamowieniaInfo = contextApp.setZamowieniaInfo;
    const techContext = useContext(TechnologyContext);
    const grupyWykonanAll = techContext.grupyWykonanAll;
  
  // const grupy = grupyWykonanAll.filter(x=>x.select==true).map(x => {return {global_id: x.global_id}}  );
  return (
    <img
      title="Wytnij prace... CTRL + X" 
      className={style.icon2}
      src={iconWytnij}
      onClick={() => {

   handleCtrlC()

      }}
      alt="React Logo"
    />
  );
}



  function Wklej({handleCtrlV}) {
  const contextApp = useContext(AppContext);
  const setShowZamowieniaInfo = contextApp.setShowZamowieniaInfo;
  const setZamowieniaInfo = contextApp.setZamowieniaInfo;
    const techContext = useContext(TechnologyContext);
    const grupyWykonanAll = techContext.grupyWykonanAll;
  
  // const grupy = grupyWykonanAll.filter(x=>x.select==true).map(x => {return {global_id: x.global_id}}  );
  return (
    <img
      title="Wstaw prace... CTRL + V"
      className={style.icon2}
      src={iconWklej}
      onClick={() => {

   handleCtrlV()

      }}
      alt="React Logo"
    />
  );
}

  function CTRX({handleCtrlC}) {
  const contextApp = useContext(AppContext);
  const setShowZamowieniaInfo = contextApp.setShowZamowieniaInfo;
  const setZamowieniaInfo = contextApp.setZamowieniaInfo;
    const techContext = useContext(TechnologyContext);
    const grupyWykonanAll = techContext.grupyWykonanAll;
  
  // const grupy = grupyWykonanAll.filter(x=>x.select==true).map(x => {return {global_id: x.global_id}}  );
  return (

    <button
      title="Wytnij zaznaczone prace..."
      className={style.icon4}
      src={iconCalc2}
      onClick={() => {
          handleCtrlC()

      }}
      alt="React Logo"
    >
ctrl + x    
      </button>
  );
}

  function CTRV({handleCtrlV}) {
  const contextApp = useContext(AppContext);
  const setShowZamowieniaInfo = contextApp.setShowZamowieniaInfo;
  const setZamowieniaInfo = contextApp.setZamowieniaInfo;
    const techContext = useContext(TechnologyContext);
    const grupyWykonanAll = techContext.grupyWykonanAll;
  
  // const grupy = grupyWykonanAll.filter(x=>x.select==true).map(x => {return {global_id: x.global_id}}  );
  return (

    <button
      title="Wklej prace..."
      className={style.icon4}
      src={iconCalc2}
      onClick={() => {
          handleCtrlV()

      }}
      alt="React Logo"
    >
      ctrl + v
                                  {/* <ClipboardX size={10} style={{ opacity: 1 }} /> */}
      
      </button>
  );
}