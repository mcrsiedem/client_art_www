import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import iconSettings from "assets/settings.svg";
import style from "./WykonaniaTechStage.module.css";
import icon from "assets/copy.svg";
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
import RowWykonanieStage from "./RowWykonanieStage";

export default function WykonaniaTechStage() {
  return (
    <div className={style.container}>
      <Header />
      <WykonaniaTechPane />
    </div>
  );
}

const WykonaniaTechPane = () => {
  return (
  <div className={style.pane}>
    <MenuPane/> <ContentPane/>
  </div>
  )
}


const MenuPane = () => {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;
  const elementyTech = techContext.elementyTech;

  return (
    <div className={style.menu_pane}>
      {elementyTech.map((rowElement) => (
        <RowElement rowElement={rowElement}/>
      ))}
    </div>
  );
};

const RowElement = ({rowElement}) => {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;
  return (

    <div  className={style.element_row}>
      <p2 className={style.elementy_tekst}>{rowElement.typ_nazwa} {rowElement.nazwa}</p2>
    {procesyElementowTech
      .filter((x) => x.element_id == rowElement.id)
      .map((rowProcesy) => (
        <RowProces  rowProcesy={rowProcesy}/>
      ))}
  </div>

  );
};

const RowProces = ({rowProcesy}) => {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;
  const elementyTech = techContext.elementyTech;
  const grupaWykonan = techContext.grupaWykonan;
  const setSelectedGrupaTechROW = techContext.setSelectedGrupaTechROW;
  

  return (
    <div className={style.proces_row}>

    {grupaWykonan
      .filter((x) => x.proces_id == rowProcesy.id)
      .map((rowGrupa) => (

        <div onClick={()=> {setSelectedGrupaTechROW(rowGrupa)}}className={style.grupa_row}>
              <p2 className={style.procesy_tekst}>{rowProcesy.nazwa}</p2>
          <Procesor rowProces={rowProcesy} rowGrupa={rowGrupa}/>
          <CzasGrupy rowGrupa={rowGrupa}/>
          <PredkoscGrupy rowGrupa={rowGrupa}/>
          <MnoznikPredkosci rowGrupa={rowGrupa}/>
          <StatusGrupy rowGrupa={rowGrupa}/>
          {/* <DodajGrupeWykonan rowGrupa={rowGrupa}/> */}

          
          
           </div>
    
      ))}

  </div>

  );
};



const ContentPane = () => {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;
  const wykonania = techContext.wykonania;
  const selectedGrupaTechROW = techContext.selectedGrupaTechROW;
  const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie
  
  return (
  <div className={style.content_pane}>
    <div className={style.wykonania_title}>

   
    <p className={style. elementy_tekst}>Wykonania</p>
    </div>
    <div>
    {               wykonania
                  .filter((f) => f.grupa_id == selectedGrupaTechROW.id)
                  .map((rowWykonanie, i) => (
                    <div className={style.wykonania_container}>
                      {/* <WykonanieRow row={row}/> */}
                      <RowWykonanieStage rowWykonanie={rowWykonanie} updateWykonaniaWszystkie={updateWykonaniaWszystkie}/>

                    </div>
                  ))}
    </div>
  


  </div>
  )
}

const PredkoscGrupy = ({ rowGrupa }) => {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.grupa_tekst}>
      
   
      <input
      
        className={style.input_czas}
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

function DodajGrupeWykonan({ row }) {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;

  return (
    <div style={{ paddingLeft: "10px" }}>
      <img
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(1)}
        className={style.expand}
        src={icon}
        onClick={() => {
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
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
      updateWydzielWykonanieZgrupy(id_drag_wykonania, fechparametryTechnologii);
    }
  }
}


function Procesor({ rowGrupa,rowProces, handleChangeCardOprawa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const wykonania = techContext.wykonania;
  return (
    <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(rowGrupa.id,rowProces.id,rowGrupa.id)}
     className={style.grupa_tekst}>
      {/* <label className={style.label}> Procesor </label> */}
      <select
        className={style.input_procesor}
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
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");

        if(wykonania.filter(x => x.grupa_id == sessionStorage.getItem("id_grupa_wykonanie_drag")).length == 1){
          // console.log("Ostatnie wykonanie w grupie")
          updatePrzeniesWykonanieDoInnejGrupy(id_drag_wykonania, grupa_id_drop, fechparametryTechnologii, true)
        }

        if(wykonania.filter(x => x.grupa_id == sessionStorage.getItem("id_grupa_wykonanie_drag")).length > 1){
          // console.log("Nieostatnie wykonanie w grupie")
        updatePrzeniesWykonanieDoInnejGrupy(id_drag_wykonania, grupa_id_drop, fechparametryTechnologii, false)
        }
    }
  }


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
  return (
    <div className={style.grupa_tekst}>

      <select 
        className={style.input_procesor}
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

       
            updateWykonaniaOrazGrupa(rowGrupa.global_id,1,event.target.value,fechparametryTechnologii)

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


function MnoznikPredkosci({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const mnozniki = contextApp.mnozniki
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.grupa_tekst}>
      {/* <label className={style.label}> Mnożnik </label> */}
      <select 
        className={style.input_mnoznik}
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


const CzasGrupy = ({ rowGrupa }) => {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.grupa_tekst}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disable
        className={style.input_czas}
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


const ProcesBtn = ({ row, showMenu, setShowMenu }) => {
  const techContext = useContext(TechnologyContext);
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


  const elementyTech = techContext.elementyTech;
  return (
    <div style={{ display: "flex", justifyContent:"end", alignItems:"center"}} >

      <img
        className={style.iconMenuBtn}
        src={Logo_ustawienia2}
        title="Policz czasy wykonań"
        onClick={() => {
          // createArkuszeFromElemenets(
          //   arkusze,
          //   setArkusze,
          //   legi,
          //   setLegi,
          //   legiFragmenty,
          //   setLegiFragmenty,
          //   oprawaTech,
          //   setOprawaTech,
          //   fragmentyTech,
          //   setFragmentyTech,
          //   elementyTech,
          //   row, procesy, grupaWykonan, setGrupaWykonan,wykonania, setWykonania
          // );
          // setShowMenu(!showMenu);
          // dodaj_clikHandler();
          // console.log("z contextu :"+ token.rowSelected)
          //  sessionStorage.setItem("us",{id:1,imie:"Maciek"})
        }}
        alt="x"
      />
      {/* <ProduktyTechMenu
        row={row}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      /> */}
    </div>
  );
};


const Header = () => {
  const techContext = useContext(TechnologyContext);
  const procesyElementowTech = techContext.procesyElementowTech;

  return (
    <div className={style.header_procesy}>
    <div></div>
<p
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "grey",
    fontSize: "1.5rem",
  }}
>
  Procesy
</p>
<ProcesBtn />
</div>
  )
}