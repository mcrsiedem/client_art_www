import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import iconSettings from "assets/settings.svg";
import style from "./WykonaniaTech.module.css";
import icon from "assets/copy.svg";
import iconDelete from "assets/trash2.svg";


import iconTrash from "assets/trash2.svg"
import logoExpand from "assets/expand.svg";
// import Logo_ustawienia2 from "assets/refresh.png";
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import { _typ_elementu, reg_txt } from "utils/initialvalue";
import { reg_int } from "utils/initialvalue";
import { getNameOfElement } from "actions/getNameOfElement";
import RowWykonanie from "./RowWykonanie";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { dragDropProcesGrupaToProcesor } from "actions/dragDropProcesGrupaToProcesor";
import { updateWykonaniaOrazGrupa } from "actions/updateWykonaniaOrazGrupa";
import { updateWydzielWykonanieZgrupy } from "actions/updateWydzielWykonanieZgrupy";
import { updatePrzeniesWykonanieDoInnejGrupy } from "actions/updatePrzeniesWykonanieDoInnejGrupy";
import { createGrupaWykonanManual } from "actions/createGrupaWykonanManual";
import { updateSkasujGrupe } from "actions/updateSkasujGrupe";
import GRUPA_WYKONAN from "./GRUPA_WYKONAN";




export default function WykonaniaTech() {
  return (
    <div className={style.container}>
       <div className={style.header_procesy}>
      <p></p>
        <p style={{ display: "flex", justifyContent:"center",alignItems:"center", color:"grey" , fontSize:"1.5rem"}}>Procesy</p>
      </div>
      <WykonaniaTechTable />
    </div>
  );
}
const WykonaniaTechTable = () => {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;

  return (
  <div className={style.container}>
    
      {procesyElementowTech.map((rowProces) => (
        <ProcesRow rowProces={rowProces} />
      ))}

  </div>
  )
}

const ProcesRow = ({ rowProces }) => {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const legi = techContext.legi;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const elementyTech = techContext.elementyTech;
  const appcontext = useContext(AppContext);

  const [show, setShow] = useState(true);
  return (
    <>
      <div className={style.row1}>
        <Rozwin rowProces={rowProces} show={show} setShow={setShow} />
        <div className={style.procesy_container}>
        <p className={style.nazwy_procesow3}>{rowProces.nazwa} </p>
        <p  className={style.nazwy_procesow2}> {getNameOfElement(rowProces.element_id,elementyTech,_typ_elementu)}</p>
        </div>
        <p className={style.nazwy_procesow}>Prędkość: {rowProces.predkosc} </p>
        <p className={style.nazwy_procesow}>Narząd: {rowProces.narzad}  </p>
        {/* guzik widać tylko wtedy jak nie ma żadnej grupy wykonan */}
        { (grupaWykonan.filter(p => p.proces_id == rowProces.id ).length ==0 &&      <ProcesBtn rowProces={rowProces}/>  )}
      </div>
      {show &&
          <GRUPA_WYKONAN rowProces={rowProces} />}
          <hr></hr>
    </>
  );
};


const Rozwin = ({  rowProces,show, setShow }) => {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;
  // if  (procesyElementowTech
  // .filter((f) => f.proces_id == rowProces.id).length !== 0){
  return (
    <div style={{ display: "block", margin : "auto"}} >
      <img
                      
        className={style.expand}
        src={logoExpand}
        onClick={() => {
          setShow(!show);
        }}
        alt="Procesy"
      />
    </div>
  );

}



const ProcesBtn = ({ rowProces,row, showMenu, setShowMenu }) => {
  const techContext = useContext(TechnologyContext);
  const appcontext = useContext(AppContext);
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  const procesy = techContext.procesyElementow;
  const grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const oprawaTech = techContext.oprawaTech;
  const setOprawaTech = techContext.setOprawaTech;
  const fragmentyTech = techContext.fragmentyTech;
  const setFragmentyTech = techContext.setFragmentyTech;
  const procesList =appcontext.procesList  // wszystkie procesy

  const elementyTech = techContext.elementyTech;
  return (
    <div style={{ display: "flex", justifyContent:"end", alignItems:"center"}} >

      <img
        className={style.iconMenuBtn}
        src={Logo_ustawienia2}
        title="Policz czasy wykonań"
        onClick={() => {

          createGrupaWykonanManual(rowProces,procesList,grupaWykonan,setGrupaWykonan,legi,wykonania,setWykonania,arkusze,setArkusze)
        }}
        alt="x"
      />

    </div>
  );
};