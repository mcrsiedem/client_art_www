import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./RowWykonanie.module.css";
import icon from "assets/copy.svg";

import { reg_int } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { updateWykonania } from "actions/updateWykonania";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { getMaxID } from "actions/getMaxID";
import { useWykonania } from "hooks/useWykonania";
import { useGrupyWykonan } from "hooks/useGrupyWykonan";
import { useAccess } from "hooks/useAccess";

export default function RowWykonanie  ({rowWykonanie,updateWykonaniaWszystkie,rowProces})  {
  return(<div
    draggable
    onDrag={() => handleDragWykonanieStart(rowWykonanie)}>
    <div  className={style.container}> 
      <IndeksWykonania rowWykonanie={rowWykonanie}/>
      <ArkuszWykonania rowWykonanie={rowWykonanie}/>
      <RodzajArkuszaWykonania rowWykonanie={rowWykonanie}/>
      <NakladWykonanie rowWykonanie={rowWykonanie}/>
      <CzasWykoniania rowWykonanie={rowWykonanie}/>
      <PredkoscWykoniania rowWykonanie={rowWykonanie}/>
      <NarzadWykonania rowWykonanie={rowWykonanie}/>
      <PrzelotyWykonania rowWykonanie={rowWykonanie}/>
      <StatusWykonania rowWykonanie={rowWykonanie} rowProces={rowProces}/>
      <DodajWykonanie rowWykonanie={rowWykonanie}/>
    </div>
  </div>)
  
  function handleDragWykonanieStart(rowWykonanie) {
    //   e.preventDefault();
    let id = null;
    // if(rowWykonanie.technologia_id==1){
    //   id= rowWykonanie.id
    // }
    // if(rowWykonanie.technologia_id!=1){
    //   id= rowWykonanie.global_id
    // }

    if(rowWykonanie.technologia_id==null){
      id= rowWykonanie.id
    }
    if(rowWykonanie.technologia_id>1){
      id= rowWykonanie.global_id
    }
    sessionStorage.setItem("id_wykonanie_drag", id);
    sessionStorage.setItem("typ_drag", "wykonanie");
    sessionStorage.setItem("id_proces_wykonanie_drag", rowWykonanie.proces_id);
    sessionStorage.setItem("id_grupa_wykonanie_drag", rowWykonanie.grupa_id);
  }
}

function DodajWykonanie({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _stan_wykonania = contextApp._stan_wykonania
  const updateWykonanie = techContext.updateWykonanie
  const daneTech = techContext.daneTech;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  return (
    <div className={style.col_dane_kopiuj}>
      <img
        // onDragOver={handleDragOver}
        // onDrop={() => handleDrop()}
        className={style.expand}
        src={icon}
        onClick={() => {

          // if(daneTech.id == 1){
          // let newWykonania = [...wykonania]
          // newWykonania.push({...rowWykonanie,id: getMaxID(wykonania),index:getMaxIndeks(wykonania),naklad:0,przeloty:0,czas:0,insert:true })
          // setWykonania(newWykonania)
          // }
          // if(daneTech.id != 1){

          //   }


          let newWykonania = [...wykonania]
          newWykonania.push({...rowWykonanie,id: getMaxID(wykonania),index:getMaxIndeks(wykonania),naklad:0,przeloty:0,czas:0,insert:true })
          setWykonania(newWykonania)
            

        }}
        alt="Procesy"
      />
    </div>
  );
}



function StatusWykonania({ rowWykonanie,rowProces }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
  const updateWykonanie = techContext.updateWykonanie
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  
  const [czasWykonania,statusWykonaniaTechnologia] = useWykonania(true);
const [wolno,wolno_procesor] = useAccess(false);


  return (
    <div className={style.col_dane}>
      {/* <label className={style.label}> Status </label> */}
      <select 
        className={style.select}
        value={rowWykonanie.status}
        onChange={(event) => {

          if(rowWykonanie.technologia_id==1){
            // updateWykonanie({ ...rowWykonanie, status: event.target.value });
            }else{
              if(wolno_procesor(rowProces.nazwa_id)){
                 statusWykonaniaTechnologia({...rowWykonanie,status:event.target.value,stary_status: rowWykonanie.status })
              }
             
              // updateWykonania(rowWykonanie.global_id,1,event.target.value,fechparametryTechnologii)
            }
      
        }}
      >
        {_status_wykonania.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}

const CzasWykoniania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane_przeloty}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disabled
        className={style.input}
        value={zamienNaGodziny(rowWykonanie.czas)}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              czas: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};

const IndeksWykonania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const arkusze = techContext.arkusze
  return (
    <div className={style.col_dane_indeks}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disabled
      title="Kolejność"
        className={style.input_indeks}
        value={rowWykonanie.indeks }
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              indeks: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};

const ArkuszWykonania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const arkusze = techContext.arkusze
  return (
    <div className={style.col_dane_arkusz}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disabled
        className={style.input}
        value={"ark. "+arkusze?.filter(x=>x.id == rowWykonanie.arkusz_id)[0]?.nr_arkusza }
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              czas: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};
const RodzajArkuszaWykonania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const arkusze = techContext.arkusze
  return (
    <div className={style.col_dane_rodzaj_arkusza}>
      
      <input
      disabled
        className={style.input}
        value={rowWykonanie.nazwa_wykonania }
        // value={parseInt(arkusze?.filter(x=>x.id == rowWykonanie.arkusz_id)[0]?.rodzaj_arkusza)/parseInt(arkusze?.filter(x=>x.id == rowWykonanie.arkusz_id)[0]?.ilosc_leg)+"ka"}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              czas: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};

const NakladWykonanie = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const procesyElementowTech = techContext.procesyElementowTech
  const wykonania = techContext.wykonania
  const [czasWykonania] = useWykonania()




  return (
    <div className={style.col_dane_przeloty}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
        className={style.input}
        value={rowWykonanie.naklad}
        onChange={(e) => {

          // proces =  procesyElementowTech.filter(x=>x.id == rowWykonanie.proces_id)[0].ilosc_uzytkow
          if (e.target.value == "" || reg_int.test(e.target.value)) {
            if(e.target.value == "" ) e.target.value =0
            if(rowWykonanie.nazwa=="Falcowanie")
              {
                updateWykonanie({
                  ...rowWykonanie,
                  naklad: e.target.value,
                  przeloty:e.target.value,
                  czas: czasWykonania(rowWykonanie,e.target.value,rowWykonanie.predkosc),
                  update:true
                });

           
              }else {
                            updateWykonanie({
              ...rowWykonanie,
              naklad: e.target.value,
              czas: czasWykonania(rowWykonanie,e.target.value,rowWykonanie.predkosc),
              update:true
            });
              }



            
          }
        }}
      ></input>
    </div>
  );
};

const StartDruku = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const procesyElementowTech = techContext.procesyElementowTech
  const wykonania = techContext.wykonania
  const [czasWykonania] = useWykonania()




  return (
    <div className={style.col_dane_start}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
        className={style.input}
        // value={rowWykonanie.naklad}

      ></input>
    </div>
  );
};

const MnoznikWykoniania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane_start}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disabled
        className={style.input}
        value={rowWykonanie.mnoznik}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              czas: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};

const PredkoscWykoniania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const [czasWykonania] = useWykonania()

  return (
    <div className={style.col_dane_przeloty}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
        className={style.input}
        value={rowWykonanie.predkosc}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              predkosc:e.target.value,
              czas: czasWykonania(rowWykonanie,rowWykonanie.naklad,e.target.value),
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
};

const PrzelotyWykonania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane_przeloty}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
        className={style.input}
        value={rowWykonanie.przeloty}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            if(e.target.value == "" ) e.target.value =0

            updateWykonanie({
              ...rowWykonanie,
              przeloty: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};


const NarzadWykonania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane_przeloty}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
        className={style.input}
        value={rowWykonanie.narzad}
        onChange={(e) => {


          // if (e.target.value == "" || reg_int.test(e.target.value)) {
          //   if(e.target.value == "" ) e.target.value =0

          //   updateWykonanie({
          //     ...rowWykonanie,
          //     przeloty: e.target.value,
          //   });
          // }
        }}
      ></input>
    </div>
  );
};

