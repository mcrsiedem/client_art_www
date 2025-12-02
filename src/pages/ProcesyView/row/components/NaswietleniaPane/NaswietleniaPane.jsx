import React, { useState, useContext } from "react";
import style from "./NaswietleniaPane.module.css";
import iconX from "assets/x.svg";
import { TechnologyContext } from "context/TechnologyContext";
import { usePliki } from "hooks/usePliki";
export default function NaswietleniaPane({showNaswietlenia,setShowNaswietlenia}) {
  const techContext = useContext(TechnologyContext);
const [naswietlenia,setNaswietlenia] = useState();

  if (showNaswietlenia) {
    return (
      <div className={style.grayScaleBackground}>
        <div className={style.window}>
          <Header setShowNaswietlenia={setShowNaswietlenia}> </Header>
          <div className={style.center}>
            <Naswietlenia naswietlenia={naswietlenia} setNaswietlenia={setNaswietlenia}  />
          </div>
          <div className={style.footer}>
            <Zastosuj naswietlenia={naswietlenia}  setShowNaswietlenia={setShowNaswietlenia} />
          </div>
        </div>
      </div>
    );
  }
}

function Header({setShowNaswietlenia}) {
  return (
    <div className={style.header}>
      <p className={style.title}>Naświetlenia</p>
      <Zamknij setShowNaswietlenia={setShowNaswietlenia} />
    </div>
  );
}
function Zamknij({setShowNaswietlenia}) {
  const techContext = useContext(TechnologyContext);

  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
       setShowNaswietlenia(false)
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
        value={ techContext.selectedGrupaTechROW.ilosc_narzadow*8}
        onChange={(e) => {

          if (e.target.value != "" ) {
            setNaswietlenia(e.target.value)
            // setData(e.target.value)
            // techContext.setSelectedGrupaTechROW({...techContext.selectedGrupaTechROW, naswietlenia: e.target.value})


          }
        }}
      ></input>
  );
};

const Zastosuj = ({ naswietlenia,setShowNaswietlenia }) => {
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
           
setShowNaswietlenia(false)
          
        }}
      >Dodaj</button>
  );
};