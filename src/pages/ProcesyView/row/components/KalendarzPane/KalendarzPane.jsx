import React, { useState, useContext } from "react";
import style from "./KalendarzPane.module.css";
import iconX from "assets/x.svg";
// import Zapisz from "./Zapisz";
import { reg_int } from "utils/initialvalue";
import { TechnologyContext } from "context/TechnologyContext";
import { updateZmienCzasTrwaniaGrupy } from "actions/updateZmienCzasTrwaniaGrupy";
import { date_time } from "actions/date_time";
import { updateZmienCzasTrwaniaGrupyPrzerwa } from "actions/updateZmienCzasTrwaniaGrupyPrzerwa";
export default function KalendarzPane({ setShow, show, wykonanie,value, setValue,grup }) {
  const techContext = useContext(TechnologyContext);
  const [data, setData] = useState(techContext.selectedGrupaTechROW.koniec);


  if ( techContext.showKalendarz) {
    return (
      <div className={style.grayScaleBackground}>
        <div className={style.window} >
          <Header setShow={setShow}></Header>
          <div className={style.center}>
            <Koniec data={data}  setData={setData}/>
          </div>
          <div className={style.footer}>

            <Zastosuj data={data}  setData={setData}/>

            {/* <Zapisz setShow={setShow} wykonanie={wykonanie} value={value}  grup={grup}/> */}
          </div>
        </div>
      </div>
    );
  }
}

function Header() {
  return (
    <div className={style.header}>
      <p className={style.title}>Zmień czas </p>
      <Zamknij  />
    </div>
  );
}
function Zamknij() {
  const techContext = useContext(TechnologyContext);

  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
         techContext.setShowKalendarz(false)
      }}
      alt="Procesy"
    />
  );
}

const Koniec = ({ data, setData }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie;
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  return (
 

      <input
        disabled= {false}
        className={style.data_input}
        type="datetime-local"
  //        min="2023-06-07T00:00"
  // max="2023-06-14T00:00"
       
        date-
        // value={data}
        value={  techContext.selectedGrupaTechROW.koniec}
        onChange={(e) => {


          if (e.target.value != "" ) {
            setData(e.target.value)
            //  setData(e.target.value)
            techContext.setSelectedGrupaTechROW({...techContext.selectedGrupaTechROW, koniec: e.target.value})
          }
        }}
      ></input>
  );
};

const Zastosuj = ({ data, setData }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie;
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  return (
 

      <button
        // disabled= {false}
        className={style.btn_zastosuj}

  //        min="2023-06-07T00:00"
  // max="2023-06-14T00:00"
       
   
        // value={data}
        // value={  techContext.selectedGrupaTechROW.koniec}
        onClick={(e) => {

if(techContext.selectedGrupaTechROW.typ_grupy== 1){
  updateZmienCzasTrwaniaGrupyPrzerwa( techContext.selectedGrupaTechROW.global_id,date_time( data),fechGrupyAndWykonaniaForProcesor)
}
     if(techContext.selectedGrupaTechROW.typ_grupy== 2){
       updateZmienCzasTrwaniaGrupy( techContext.selectedGrupaTechROW.global_id,date_time( data),fechGrupyAndWykonaniaForProcesor)
}
           
techContext.setShowKalendarz(false)
            // console.log("data: "+ date_time( e.target.value))
          
        }}
      >Zastosuj</button>
  );
};