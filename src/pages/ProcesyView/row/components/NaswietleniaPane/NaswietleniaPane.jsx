import React, { useState, useContext } from "react";
import style from "./NaswietleniaPane.module.css";
import iconX from "assets/x.svg";
import { TechnologyContext } from "context/TechnologyContext";
import { updateZmienCzasTrwaniaGrupy } from "actions/updateZmienCzasTrwaniaGrupy";
import { date_time } from "actions/date_time";
import { updateZmienCzasTrwaniaGrupyPrzerwa } from "actions/updateZmienCzasTrwaniaGrupyPrzerwa";
import { usePliki } from "hooks/usePliki";
export default function NaswietleniaPane() {
  const techContext = useContext(TechnologyContext);
  const [data, setData] = useState(techContext.selectedGrupaTechROW.koniec);
  // const [iloscNarzadow, setIloscNarzadow] = useState(techContext.selectedGrupaTechROW.ilosc_narzadow);
const [naswietlenia,setNaswietlenia] = useState(parseInt(techContext.selectedGrupaTechROW.ilosc_narzadow)*8);

  if (techContext.showNaswietlenia) {
    return (
      <div className={style.grayScaleBackground}>
        <div className={style.window}>
          <Header> </Header>
          <div className={style.center}>
            <Naswietlenia naswietlenia={naswietlenia} setNaswietlenia={setNaswietlenia}  />
          </div>
          <div className={style.footer}>
            <Zastosuj naswietlenia={naswietlenia}  />
          </div>
        </div>
      </div>
    );
  }
}

function Header() {
  return (
    <div className={style.header}>
      <p className={style.title}>Naświetlenia</p>
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
         techContext.setShowNaswietlenia(false)
      }}
      alt="Procesy"
    />
  );
}

const Naswietlenia = ({ naswietlenia,setNaswietlenia }) => {
  const techContext = useContext(TechnologyContext);
  

  return (
 

      <input
        disabled= {false}
        className={style.data_input}
        // type="datetime-local"
        value={ naswietlenia}
        onChange={(e) => {

          if (e.target.value != "" ) {
            setNaswietlenia(e.target.value)
            // setData(e.target.value)
            techContext.setSelectedGrupaTechROW({...techContext.selectedGrupaTechROW, naswietlenia: e.target.value})
          }
        }}
      ></input>
  );
};

const Zastosuj = ({ naswietlenia }) => {
  const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
    const [etapPlikow,etapPlikowGrupyWykonan] = usePliki()
  
  return (
 

      <button
        className={style.btn_zastosuj}
        onClick={(e) => {

// if(techContext.selectedGrupaTechROW.typ_grupy== 1){
//   updateZmienCzasTrwaniaGrupyPrzerwa( techContext.selectedGrupaTechROW.global_id,date_time( data),fechGrupyAndWykonaniaForProcesor)
// }
//      if(techContext.selectedGrupaTechROW.typ_grupy== 2){
//        updateZmienCzasTrwaniaGrupy( techContext.selectedGrupaTechROW.global_id,date_time( data),fechGrupyAndWykonaniaForProcesor)
// }

etapPlikowGrupyWykonan(naswietlenia,techContext.selectedGrupaTechROW,techContext.selectedGrupaTechROW.zamowienia_pliki_etap)
// techContext.setSelectedGrupaTechROW({...techContext.selectedGrupaTechROW, naswietlenia: naswietlenia})
           
techContext.setShowNaswietlenia(false)
          
        }}
      >Dodaj</button>
  );
};