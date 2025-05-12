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
              title={"grupa_globa_id :"+rowGrupa.global_id}
              className={style.grupa_container}>
                 <Procesor rowGrupa={rowGrupa} rowProces={rowProces}/>
                 <NakladGrupy rowGrupa={rowGrupa} />
                 <CzasGrupy rowGrupa={rowGrupa} />
                 <PredkoscGrupy rowGrupa={rowGrupa} />
                 <PrzelotyGrupy rowGrupa={rowGrupa} />
                 <MnoznikPredkosci rowGrupa={rowGrupa}/>
                 <Stangrupy rowGrupa={rowGrupa}/>
                 <StatusGrupy rowGrupa={rowGrupa} updateWykonaniaWszystkie={updateWykonaniaWszystkie}/>
                 <DodajGrupeWykonan rowGrupa={rowGrupa}/>
                 <SkasujGrupeWykonan rowGrupa={rowGrupa}/>
              </div>

              {show &&
                wykonania
                  .filter((f) => f.grupa_id == rowGrupa.id)
                  .map((rowWykonanie, i) => (
                    <div className={style.wykonania_container}>
                      {/* <WykonanieRow row={row}/> */}
                      <RowWykonanie rowWykonanie={rowWykonanie} updateWykonaniaWszystkie={updateWykonaniaWszystkie}/>

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
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const daneTech = techContext.daneTech;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const grupaWykonan = techContext.grupaWykonan;
  const [sumujGrupe] = useGrupyWykonan()
  const SumaCzasow = (grupa,new_wykonania) => {
    let  suma = new_wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.czas).reduce((a, b) => a + b, 0)
    return suma;
  };
  const SumaPrzelotow = (grupa,new_wykonania) => {
    let  suma = new_wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.przeloty).reduce((a, b) => a + b, 0)
    return suma;
  };
  return (
    <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(rowGrupa.id,rowProces.id,rowGrupa.id)}
     className={style.col_dane}>
      <label className={style.label}> Procesor </label>
      <select
        className={style.input}
        defaultValue={rowGrupa.procesor_id}
        onChange={(event) => {
          updateGrupaWykonan({ ...rowGrupa, procesor_id: event.target.value });
          dragDropProcesGrupaToProcesor(rowGrupa.global_id,event.target.value,fechGrupyAndWykonaniaForProcesor)
    
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
    if (sessionStorage.getItem("typ_drag") == "wykonanie" && sessionStorage.getItem("id_proces_wykonanie_drag") == proces_id) {

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
        onDrop={() => handleDrop()}
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
  // const global_id_grupa = row.global_id
  return (
    <div style={{ paddingTop: "13px" }}>
      <img
        title="Skasuj grupę"
        className={style.expand}
        src={iconDelete} 
        onClick={() => {
          //handleAddArkusz(row, grupaWykonan, setGrupaWykonan);
          // handleRemoveItem(row.indeks, row.id);
          // console.log(rowGrupa)
          updateSkasujGrupe(rowGrupa.global_id, fechparametryTechnologii,rowGrupa.zamowienie_id,rowGrupa.technologia_id);
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

function StatusGrupy({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
  const updateGrupaWykonan = techContext.updateGrupaWykonan
   const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie
   const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const wykonania = techContext.wykonania
  const setWykonania = techContext.setWykonania
  const [sumujGrupe,statusGrupy] = useGrupyWykonan()
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Status </label>
      <select 
        className={style.select}
        defaultValue={rowGrupa.status}
        onChange={(event) => {
  
          // technologia_id == 1 - przed pierwszym zapisem zmiany localnie
          // technologia_id != 1 - zmiany bezpośrednio na serwerze
     // 1 - status
            // 2 - stan

          if(rowGrupa.technologia_id == 1){

            updateWykonaniaWszystkie({ ...rowGrupa, status: event.target.value });
            updateGrupaWykonan({ ...rowGrupa, status: event.target.value });
          }else{

        
            updateWykonaniaOrazGrupa(rowGrupa.global_id,1,event.target.value,fechparametryTechnologii,rowGrupa.zamowienie_id)
            statusGrupy({...rowGrupa, status: event.target.value})
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
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Stan </label>
      <select 
        className={style.select}
        defaultValue={rowGrupa.stan}
        onChange={(event) => {
          



          if(rowGrupa.technologia_id == 1){

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


















