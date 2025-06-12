import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./GRUPA_WYKONAN.module.css";
import icon from "assets/copy.svg";
import iconDelete from "assets/trash2.svg";
import RowWykonanie from "./RowWykonanie";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { dragDropProcesGrupaToProcesor } from "actions/dragDropProcesGrupaToProcesor";
import { updateWykonaniaOrazGrupa } from "actions/updateWykonaniaOrazGrupa";
import { updateWydzielWykonanieZgrupy } from "actions/updateWydzielWykonanieZgrupy";
import { updatePrzeniesWykonanieDoInnejGrupy } from "actions/updatePrzeniesWykonanieDoInnejGrupy";
import { updateSkasujGrupe } from "actions/updateSkasujGrupe";
import { reg_txt } from "utils/initialvalue";
import { getMaxID } from "actions/getMaxID";
import { getSumaCzasow } from "actions/getSumaCzasow";
import { getSumaPrzelotow } from "actions/getSumaPrzelotow";
import { useGrupyWykonan } from "hooks/useGrupyWykonan";
import { useGrupyWykonanFirst } from "hooks/useGrupyWykonanFirst";
import DecodeToken from "pages/Login/DecodeToken";
import { useAccess } from "hooks/useAccess";
import { dragDropProcesGrupaToProcesorFromTech } from "actions/dragDropProcesGrupaToProcesorFromTech";
import { useWykonania } from "hooks/useWykonania";



export default  function GRUPA_WYKONAN ({ rowProces }) {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const [show, setShow] = useState(true);
  const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie
  // const SumaCzasow = (wykonania,grupa) => {
  //   // sumuje wszystkie czasy z dowolnej grupy
  //   let  suma = wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.czas).reduce((a, b) => a + b, 0)
  //   return suma;
  // };
  
  // const SumaPrzelotow = (wykonania,grupa) => {
  //   // sumuje wszystkie czasy z dowolnej grupy
  //   let  suma = wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.przeloty).reduce((a, b) => a + b, 0)
  //   return suma;
  // };
  return (
    <>
      {show && grupaWykonan
          .filter((f) => f.proces_id == rowProces.id)
          .map((rowGrupa, i) => (
            <div>
              <div 
              title={"grupa_globa_id :"+rowGrupa.global_id +" Poczatek wykonania: "+rowGrupa.poczatek}
              className={style.grupa_container}>
                 <Procesor rowGrupa={rowGrupa} rowProces={rowProces}/>
                 <NakladGrupy rowGrupa={rowGrupa} />
                 <CzasGrupy rowGrupa={rowGrupa} />
                 <PredkoscGrupy rowGrupa={rowGrupa} />
                 <Narzad rowGrupa={rowGrupa} />
                 <PrzelotyGrupy rowGrupa={rowGrupa} />
                 <MnoznikPredkosci rowGrupa={rowGrupa}/>
                 <Stangrupy rowGrupa={rowGrupa}/>
                 <StatusGrupy rowGrupa={rowGrupa} updateWykonaniaWszystkie={updateWykonaniaWszystkie} rowProces={rowProces}/>
                 <DodajGrupeWykonan rowGrupa={rowGrupa} rowProces={rowProces}/>
                 <SkasujGrupeWykonan rowGrupa={rowGrupa}/>
              </div>

              {show &&
                wykonania
                  .filter((f) => f.grupa_id == rowGrupa.id)
                  .map((rowWykonanie, i) => (
                    <div className={style.wykonania_container}>
                      {/* <WykonanieRow row={row}/> */}
                      <RowWykonanie rowWykonanie={rowWykonanie} updateWykonaniaWszystkie={updateWykonaniaWszystkie} rowProces={rowProces}/>

                    </div>
                  ))}
            </div>
          ))
          
          }

    </>
  );

};


function Procesor({ rowGrupa,rowProces, handleChangeCardOprawa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  // const updateGrupaWykonan = techContext.updateGrupaWykonan
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const daneTech = techContext.daneTech;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const grupaWykonan = techContext.grupaWykonan;
  const [sumujGrupe] = useGrupyWykonan()
  const [updateGrupaWykonan] = useGrupyWykonanFirst()
  const [wolno,wolno_procesor] = useAccess(false);
  // const SumaCzasow = (grupa,new_wykonania) => {
  //   let  suma = new_wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.czas).reduce((a, b) => a + b, 0)
  //   return suma;
  // };
  // const SumaPrzelotow = (grupa,new_wykonania) => {
  //   let  suma = new_wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.przeloty).reduce((a, b) => a + b, 0)
  //   return suma;
  // };
  return (
    <div
                onDragOver={handleDragOver}
                onDrop={() => {

                     if(wolno_procesor(rowProces.nazwa_id)){
                      handleDrop(rowGrupa.id,rowProces.id,rowGrupa.id)}
                     }
                }
     className={style.col_dane}>
      <label className={style.label}> Procesor </label>
      <select
        className={style.input}
        value={rowGrupa.procesor_id}
        onChange={(event) => {

          if(wolno_procesor(rowProces.nazwa_id)){
            if(daneTech.id !=1){
               dragDropProcesGrupaToProcesorFromTech(rowGrupa.global_id,event.target.value,fechparametryTechnologii,rowGrupa.zamowienie_id,rowGrupa.technologia_id)
            }else{
              updateGrupaWykonan({ ...rowGrupa, procesor_id: event.target.value });
            }
                
         
          }
      
    
        }}
      >
        {procesory
        .filter(x => x.grupa == rowProces.nazwa_id )
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );

  function handleDragOver(e) {
    e.preventDefault();
  
  }

 
  function handleDrop(id,proces_id,grupa_id_drop) {
    if (sessionStorage.getItem("typ_drag") == "wykonanie" && sessionStorage.getItem("id_proces_wykonanie_drag") == proces_id && sessionStorage.getItem("id_grupa_wykonanie_drag") != grupa_id_drop) {

if(daneTech.id !=1){
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
        if(wykonania.filter(x => x.grupa_id == sessionStorage.getItem("id_grupa_wykonanie_drag")).length == 1){
          updatePrzeniesWykonanieDoInnejGrupy(id_drag_wykonania, grupa_id_drop, fechparametryTechnologii, true,daneTech.zamowienie_id)
        }
        if(wykonania.filter(x => x.grupa_id == sessionStorage.getItem("id_grupa_wykonanie_drag")).length > 1){
        updatePrzeniesWykonanieDoInnejGrupy(id_drag_wykonania, grupa_id_drop, fechparametryTechnologii, false,daneTech.zamowienie_id)
        }
}else{

  // przed pierwszym zapisem
  let new_wykonania;
  new_wykonania = wykonania.map((t) => {
    if (t.id == sessionStorage.getItem("id_wykonanie_drag")) {
      return {...t,grupa_id: grupa_id_drop};
    } else {
      return t;
    }
  })

  setWykonania(new_wykonania);
  sumujGrupe(new_wykonania)
  

}

    }
  }


}

function DodajGrupeWykonan({ rowGrupa,rowProces }) {
  const techContext = useContext(TechnologyContext);
  let grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const daneTech = techContext.daneTech;
const [wolno,wolno_procesor] = useAccess(false);
  return (
    <div style={{ paddingTop: "13px" }}>
      <img
        onDragOver={handleDragOver}
        onDrop={() => {
          if(wolno_procesor(rowProces.nazwa_id)){
            handleDrop()
          }
        } }
        className={style.expand}
        src={icon}
        onClick={() => {
            if(daneTech.id==1){
   let newGrupa = [...grupaWykonan]
          //handleAddArkusz(row, grupaWykonan, setGrupaWykonan);
          // handleRemoveItem(row.indeks, row.id);
          newGrupa.push({...rowGrupa,id: getMaxID(grupaWykonan),czas:0,przeloty:0 })
          setGrupaWykonan(newGrupa)
          console.log(newGrupa)
            }
       
        }}
        alt="Procesy"
      />
    </div>
  );

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop() {
    if (sessionStorage.getItem("typ_drag") == "wykonanie") {
      if(daneTech.id!=1){
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
      // console.log("id: "+id_drag_wykonania)
      updateWydzielWykonanieZgrupy(id_drag_wykonania, fechparametryTechnologii,daneTech.zamowienie_id);
      // let id_drop_grupa = id;
      }
      if(daneTech.id==1){
        let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
        // console.log("id: "+id_drag_wykonania)
        // let id_drop_grupa = id;
        
        }


    }
  }
}

function SkasujGrupeWykonan({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const daneTech = techContext.daneTech;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const grupaWykonan = techContext.grupaWykonan;

  // const global_id_grupa = row.global_id
  return (
    <div style={{ paddingTop: "13px" }}>
      <img
        title="Skasuj grupę"
        className={style.expand}
        src={iconDelete} 
        onClick={() => {

           if(DecodeToken(sessionStorage.getItem("token")).technologia_zapis==1)
            {

          if(daneTech.id !=1){
          updateSkasujGrupe(rowGrupa.global_id, fechparametryTechnologii,rowGrupa.zamowienie_id,rowGrupa.technologia_id);

          }else{
        setGrupaWykonan(
          grupaWykonan.filter(e => e.id != rowGrupa.id)
        )
          }
          //handleAddArkusz(row, grupaWykonan, setGrupaWykonan);
          // handleRemoveItem(row.indeks, row.id);
          // console.log(rowGrupa)

            }

        }}
        alt="Procesy"
      />
    </div>
  );

}

function MnoznikPredkosci({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const mnozniki = contextApp.mnozniki
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane_przeloty}>
      <label className={style.label}> Mnożnik </label>
      <select 
        className={style.select_mnoznik}
        defaultValue={rowGrupa.mnoznik}
        onChange={(event) => {
          updateGrupaWykonan({ ...rowGrupa, mnoznik: event.target.value });
        }}
      >
        {mnozniki.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}

function StatusGrupy({ rowGrupa,rowProces }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
  const updateGrupaWykonan = techContext.updateGrupaWykonan
   const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie
   const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const wykonania = techContext.wykonania
  const setWykonania = techContext.setWykonania
  const daneTech = techContext.daneTech
  const [sumujGrupe,statusGrupy,statusGrupyTechnologia] = useGrupyWykonan()
const [wolno,wolno_procesor] = useAccess(false);

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Status </label>
      <select 
        className={style.select}
        value={rowGrupa.status}
        onChange={(event) => {
  
   if(wolno_procesor(rowProces.nazwa_id)){
         if(daneTech.id != 1){
            statusGrupyTechnologia({...rowGrupa, status: event.target.value})
          }
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

function Stangrupy({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _stan_wykonania = contextApp._stan_wykonania
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const daneTech = techContext.daneTech

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Stan </label>
      <select 
        className={style.select}
        defaultValue={rowGrupa.stan}
        onChange={(event) => {
          


   if(daneTech.id != 1){

            updateWykonaniaWszystkie({ ...rowGrupa, stan: event.target.value });
            updateGrupaWykonan({ ...rowGrupa, stan: event.target.value });
          }else{

            // 1 - status
            // 2 - stan
            updateWykonaniaOrazGrupa(rowGrupa.global_id,2,event.target.value,fechparametryTechnologii)

          }





        }}
      >
        {_stan_wykonania.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}

const CzasGrupy = ({ rowGrupa }) => {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Czas </label>
      <input
      disable
        className={style.input}
        value={zamienNaGodziny(rowGrupa.czas)}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
            updateGrupaWykonan({
              ...rowGrupa,
              czas: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};
const NakladGrupy = ({ rowGrupa }) => {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const [sumujGrupe] = useGrupyWykonan()
  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Naklad </label>
      <input
      disable
        className={style.input}
        // value={rowGrupa.nazwa}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
            updateGrupaWykonan({
              ...rowGrupa,
              czas: e.target.value,
              update:true
            });
          }

          
        }}
      ></input>
    </div>
  );
};

const PredkoscGrupy = ({ rowGrupa }) => {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Prędkość </label>
      <input
      
        className={style.input}
        value={rowGrupa.predkosc}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
            updateGrupaWykonan({
              ...rowGrupa,
              predkosc: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};


const PrzelotyGrupy = ({ rowGrupa }) => {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Przeloty </label>
      <input
      
        className={style.input}
        value={rowGrupa.przeloty}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
            // updateGrupaWykonan({
            //   ...rowGrupa,
            //   predkosc: e.target.value,
            // });
          }
        }}
      ></input>
    </div>
  );
};

const Narzad = ({ rowGrupa }) => {
  const techContext = useContext(TechnologyContext);
  // const updateGrupaWykonan_updateWykonania_narzad = techContext.updateGrupaWykonan_updateWykonania_narzad
  const [czasWykonania,statusWykonaniaTechnologia,updateGrupaWykonan_updateWykonania_narzad]=useWykonania()

  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Narzad </label>
      <input
      
        className={style.input}
        value={rowGrupa.narzad}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
            updateGrupaWykonan_updateWykonania_narzad({
              ...rowGrupa,
              narzad: e.target.value,
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
};

















