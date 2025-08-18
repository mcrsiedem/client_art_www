import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./GRUPA_WYKONAN_OPRAWA.module.css";
import icon from "assets/copy.svg";
import iconDelete from "assets/trash2.svg";
import RowWykonanie from "../wykonanie/RowWykonanie";
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
import { updateSkasujGrupeOprawa } from "actions/updateSkasujGrupeOprawa";
import DecodeToken from "pages/Login/DecodeToken";
import { useHistoria } from "hooks/useHistoria";



export default  function GRUPA_WYKONAN_OPRAWA ({ grupaOprawa }) {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const [show, setShow] = useState(true);
  const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie

  return (
   
      
              <div 

              className={style.grupa_container}>
                 <Procesor grupaOprawa={grupaOprawa} />
                 <NakladGrupy grupaOprawa={grupaOprawa} />
                 <CzasGrupy rowGrupa={grupaOprawa} />
                 <PredkoscGrupy rowGrupa={grupaOprawa} />
                 <IloscZbieran grupaOprawa={grupaOprawa} />
                 <MnoznikPredkosci grupaOprawa={grupaOprawa}/>
                 {/* <Stangrupy grupaOprawa={grupaOprawa}/> */}
                 <StatusGrupy grupaOprawa={grupaOprawa} />
                 {/* <DodajGrupeWykonan grupaOprawa={grupaOprawa}/> */}
                 <SkasujGrupeWykonan grupaOprawa={grupaOprawa}/>
              </div>

  );

};


function Procesor({ grupaOprawa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const daneTech = techContext.daneTech;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const grupaWykonan = techContext.grupaWykonan;
  const [sumujGrupe] = useGrupyWykonan()

  return (
    <div
              
     className={style.col_dane}>
      <label className={style.label}> Procesor </label>
      <select
        className={style.input}
        defaultValue={grupaOprawa.procesor_id}

      >
        {procesory
        .filter(x => x.id == grupaOprawa.procesor_id )
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
    if (sessionStorage.getItem("typ_drag") == "wykonanie" && sessionStorage.getItem("id_proces_wykonanie_drag") == proces_id) {

if(daneTech.technologia_id !=null){
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
        if(wykonania.filter(x => x.grupa_id == sessionStorage.getItem("id_grupa_wykonanie_drag")).length == 1){
          updatePrzeniesWykonanieDoInnejGrupy(id_drag_wykonania, grupa_id_drop, fechparametryTechnologii, true)
        }
        if(wykonania.filter(x => x.grupa_id == sessionStorage.getItem("id_grupa_wykonanie_drag")).length > 1){
        updatePrzeniesWykonanieDoInnejGrupy(id_drag_wykonania, grupa_id_drop, fechparametryTechnologii, false)
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

function DodajGrupeWykonan({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  let grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const daneTech = techContext.daneTech;

  return (
    <div style={{ paddingTop: "13px" }}>
      <img
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(1)}
        className={style.expand}
        src={icon}
        onClick={() => {
          let newGrupa = [...grupaWykonan]
          //handleAddArkusz(row, grupaWykonan, setGrupaWykonan);
          // handleRemoveItem(row.indeks, row.id);
          newGrupa.push({...rowGrupa,id: getMaxID(grupaWykonan),czas:0,przeloty:0 })
          setGrupaWykonan(newGrupa)
          console.log(newGrupa)
        }}
        alt="Procesy"
      />
    </div>
  );

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "wykonanie") {
      if(daneTech.id!=1){
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
      // console.log("id: "+id_drag_wykonania)
      updateWydzielWykonanieZgrupy(id_drag_wykonania, fechparametryTechnologii);
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

function SkasujGrupeWykonan({ grupaOprawa }) {
  const techContext = useContext(TechnologyContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const grupaOprawaTech = techContext.grupaOprawaTech;
  const setGrupaOprawaTech = techContext.setGrupaOprawaTech;
  const daneTech = techContext.daneTech;
  const [add,dodajDoZamowienia] = useHistoria()
  
  // const global_id_grupa = row.global_id
   if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1) {
  return (
    <div style={{ paddingTop: "13px" }}>
      <img
        title="Skasuj grupę"
        className={style.expand}
        src={iconDelete} 
        onClick={() => {
           if (DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1) {

             if (grupaOprawa.global_id > 1 && daneTech.id > 1) {
                        updateSkasujGrupeOprawa(grupaOprawa.global_id, fechparametryTechnologii,grupaOprawa.zamowienie_id,grupaOprawa.technologia_id);
                    dodajDoZamowienia(         {
                      kategoria: "Technologia",
                      event: "Skasowana oprawa ID: " +grupaOprawa.id,
                      zamowienie_id: grupaOprawa.zamowienie_id,
                      user_id: DecodeToken(sessionStorage.getItem("token")).id
                    })
             }else {
               setGrupaOprawaTech(grupaOprawaTech.filter((e) => e.id != grupaOprawa.id));
              
             }

        
        }
      }
      
      }
        alt="Procesy"
      />
    </div>
  );
}

}

function MnoznikPredkosci({ grupaOprawa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const mnozniki = contextApp.mnozniki
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane_przeloty}>
      <label className={style.label}> Mnożnik </label>
      <select 
        className={style.select_mnoznik}
        defaultValue={grupaOprawa.mnoznik}
        onChange={(event) => {
          // updateGrupaWykonan({ ...rowGrupa, mnoznik: event.target.value });
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

function StatusGrupy({ grupaOprawa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania

  const daneTech = techContext.daneTech

  const [sumujGrupe,statusGrupyProcesView,statusGrupyTechnologia,statusGrupyProcesViewPrzerwa,statusGrupyTechnologia_OPRAWA] = useGrupyWykonan()
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Status </label>
      <select 
        className={style.select}
        value={grupaOprawa.status}
                onChange={(event) => {
  
          if(daneTech.id != 1){
            statusGrupyTechnologia_OPRAWA({...grupaOprawa, status: event.target.value,stary_status: grupaOprawa.status})
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

function Stangrupy({ grupaOprawa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _stan_wykonania = contextApp._stan_wykonania
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Stan </label>
      <select 
        className={style.select}
        value={grupaOprawa.stan}
        // onChange={(event) => {
          



        //   if(rowGrupa.technologia_id == 1){

        //     updateWykonaniaWszystkie({ ...rowGrupa, stan: event.target.value });
        //     updateGrupaWykonan({ ...rowGrupa, stan: event.target.value });
        //   }else{

        //     // 1 - status
        //     // 2 - stan
        //     updateWykonaniaOrazGrupa(rowGrupa.global_id,2,event.target.value,fechparametryTechnologii)

        //   }





        // }}
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
const NakladGrupy = ({ grupaOprawa }) => {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Naklad </label>
      <input
      disable
        className={style.input}
        value={grupaOprawa.naklad}
        // value={zamienNaGodziny(rowGrupa.czas)}
        // onChange={(e) => {
        //   if (e.target.value == "" || reg_txt.test(e.target.value)) {
        //     updateGrupaWykonan({
        //       ...rowGrupa,
        //       czas: e.target.value,
        //     });
        //   }
        // }}
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


const IloscZbieran = ({ grupaOprawa }) => {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Zbierania </label>
      <input
      
        className={style.input}
        value={grupaOprawa.ilosc_zbieran}
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


















