import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./WykonaniaTech.module.css";
import logoExpand from "assets/expand.svg";
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import { _stan_wykonania, _status_wykonania, _typ_elementu, reg_txt } from "utils/initialvalue";
import { getNameOfElement } from "actions/getNameOfElement";
import { createGrupaWykonanManual } from "actions/createGrupaWykonanManual";
import GRUPA_WYKONAN from "./GRUPA_WYKONAN";
import { useProcesy } from "hooks/useProcesy";
import iconTrash from "assets/trashgray.svg";
import ROW_OPRAWA from "./ROW_OPRAWA";
import { getNameOfProces } from "actions/getNameOfProces";

export default function WykonaniaTech() {
  const [createWykonaniaFromArkuszeLegi] = useProcesy()
  const techContext = useContext(TechnologyContext);
  const showProcesy = techContext.showProcesy;
  const setShowProcesy = techContext.setShowProcesy;
  const arkusze = techContext.arkusze;
  const daneTech = techContext.daneTech;

  if(showProcesy || daneTech.id !=1 ){
      return (
    <div onDoubleClick={()=>{
      // createWykonaniaFromArkuszeLegi()

    }} className={style.container}>

       <div className={style.header_procesy}>
        <p className={style.header_txt}>Procesy</p>
        <Usun/>
      </div>

      <WykonaniaTechTable />
    </div>
  );
  }
  else {
    if(arkusze.length !=0){
      return (
      <div  className={style.btn_show_procesy_container}>
  <button className={style.btn_show_procesy} onClick={()=>{
        createWykonaniaFromArkuszeLegi()
        setShowProcesy(true)
        console.log("wykonania")
      }} >Dodaj procesy</button>
         
      </div>
    )
    }
    
  }

}
const WykonaniaTechTable = () => {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;
  const grupaOprawaTech = techContext.grupaOprawaTech;

  return (
  <div className={style.main}>
      {procesyElementowTech.sort((a, b) => a.element_id - b.element_id).map((rowProces) => (
        <ProcesRow rowProces={rowProces} />
      ))}
         {grupaOprawaTech.sort((a, b) => a.id - b.id).map((grupaOprawa) => (
        <OprawaRow grupaOprawa={grupaOprawa} />
      ))}
  </div>
  )
}

const OprawaRow = ({ grupaOprawa }) => {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const elementyTech = techContext.elementyTech;
  const [show, setShow] = useState(true);
  return (
    <>
      <div className={style.row1}>
        {/* <Rozwin rowProces={rowProces} show={show} setShow={setShow} /> */}
        <div className={style.procesy_container}>
        {/* <p className={style.nazwy_procesow3}>{rowProces.nazwa} </p> */}
        {/* <p  className={style.nazwy_procesow2}> {getNameOfElement(rowProces.element_id,elementyTech,_typ_elementu)}</p> */}
        </div>
        {/* { (grupaWykonan?.filter(p => p.proces_id == rowProces.id ).length ==0 &&      <ProcesBtn rowProces={rowProces}/>  )} */}
      </div>
   <ROW_OPRAWA grupaOprawa={grupaOprawa}/>
      {/* {show &&
          <GRUPA_WYKONAN rowProces={rowProces} />} */}
          <hr></hr>
    </>
  );
};


const ProcesRow = ({ rowProces }) => {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const elementyTech = techContext.elementyTech;
  const [show, setShow] = useState(true);
  return (
    <>
      <div className={style.row1}>
        <Rozwin rowProces={rowProces} show={show} setShow={setShow} />
        <div className={style.procesy_container}>
        <p className={style.nazwy_procesow3}>{rowProces.nazwa} </p>
        <p  className={style.nazwy_procesow2}> {getNameOfElement(rowProces.element_id,elementyTech,_typ_elementu)}</p>
        <p  className={style.nazwy_procesow4}>  { rowProces.status_nazwa}</p>
        </div>
        {/* <p className={style.nazwy_procesow}>Prędkość: {rowProces.predkosc} </p> */}
        {/* <p className={style.nazwy_procesow}>Narząd: {rowProces.narzad}  </p> */}
        {/* guzik widać tylko wtedy jak nie ma żadnej grupy wykonan */}
        { (grupaWykonan?.filter(p => p.proces_id == rowProces.id ).length ==0 &&      <ProcesBtn rowProces={rowProces}/>  )}
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
    <div  >
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


function Usun() {
  const techContext = useContext(TechnologyContext);
  const setShowProcesy = techContext.setShowProcesy;
  const daneTech = techContext.daneTech;
if(daneTech.id == 1){
   return (
    <div>
      <div>
        <img
        title="Skasuj procesy"
          className={style.expand2}
          src={iconTrash}
          onClick={() => {
            techContext.setGrupaWykonan([])
            techContext.setWykonania([])
            techContext.setGrupaOprawaTech([])
            setShowProcesy(false)
            // handleRemoveItem(row.indeks, row.id);
                      //  setStatus(3)
          }}
          alt="Procesy"
        />
      </div>
    </div>
  );
}
 
}