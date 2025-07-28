import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./GRUPA_WYKONAN.module.css";
import icon from "assets/copy.svg";
import logoExtract from "assets/extract_green.svg";
import iconDelete from "assets/trash2.svg";
import RowWykonanie from "../wykonanie/RowWykonanie";
import { updateWykonaniaOrazGrupa } from "actions/updateWykonaniaOrazGrupa";
import { updateWydzielWykonanieZgrupy } from "actions/updateWydzielWykonanieZgrupy";
import { updateSkasujGrupe } from "actions/updateSkasujGrupe";
import { reg_txt } from "utils/initialvalue";
import { getMaxID } from "actions/getMaxID";
import { useGrupyWykonan } from "hooks/useGrupyWykonan";
import DecodeToken from "pages/Login/DecodeToken";
import { useAccess } from "hooks/useAccess";
import NakladGrupy from "./components/NakladGrupy";
import { useHistoria } from "hooks/useHistoria";
import NarzadGrupy from "./components/NarzadGrupy";
import ProcesorGrupy from "./components/ProcesorGrupy";
import CzasGrupy from "./components/CzasGrupy";
import PredkoscGrupy from "./components/PredkoscGrupy";
import PrzelotyGrupy from "./components/PrzelotyGrupy";
import DodajGrupeWykonan from "./components/DodajGrupeWykonan";



export default  function GRUPA_WYKONAN ({ rowProces }) {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const [show, setShow] = useState(true);
  const updateWykonaniaWszystkie = techContext.updateWykonaniaWszystkie

  return (
    <>
      {show && grupaWykonan
          .filter((f) => f.proces_id == rowProces.id)
          .map((rowGrupa, i) => (
            <div>
              <div 
              title={"grupa_globa_id :"+rowGrupa.global_id +" Poczatek wykonania: "+rowGrupa.poczatek}
              className={style.grupa_container}>
                 <ProcesorGrupy rowGrupa={rowGrupa} rowProces={rowProces}/>
                 <NakladGrupy rowGrupa={rowGrupa} />
                 <CzasGrupy rowGrupa={rowGrupa} />
                 <PredkoscGrupy rowGrupa={rowGrupa} />
                 <NarzadGrupy rowGrupa={rowGrupa} />
                 <PrzelotyGrupy rowGrupa={rowGrupa} />
                 <StatusGrupy rowGrupa={rowGrupa} updateWykonaniaWszystkie={updateWykonaniaWszystkie} rowProces={rowProces}/>
                 <DodajGrupeWykonan rowGrupa={rowGrupa} rowProces={rowProces}/>
                 <SkasujGrupeWykonan rowGrupa={rowGrupa}/>
                 <AktualizujGrupe rowGrupa={rowGrupa}/>

                 
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







// function DodajGrupeWykonan({ rowGrupa,rowProces }) {
//   const techContext = useContext(TechnologyContext);
//   let grupaWykonan = techContext.grupaWykonan;
//   const setGrupaWykonan = techContext.setGrupaWykonan;
//   const fechparametryTechnologii = techContext.fechparametryTechnologii;
//   const daneTech = techContext.daneTech;
// const [wolno,wolno_procesor] = useAccess(false);
//   return (
//     <div style={{ paddingTop: "13px" }}>
//       <img
//         onDragOver={handleDragOver}
//         onDrop={() => {
//           if(wolno_procesor(rowProces.nazwa_id)){
//             handleDrop()
//           }
//         } }
//         className={style.expand}
//         src={icon}
//         onClick={() => {
//             if(daneTech.id==1){
//    let newGrupa = [...grupaWykonan]
//           //handleAddArkusz(row, grupaWykonan, setGrupaWykonan);
//           // handleRemoveItem(row.indeks, row.id);
//           newGrupa.push({...rowGrupa,id: getMaxID(grupaWykonan),czas:0,przeloty:0 })
//           setGrupaWykonan(newGrupa)
//           console.log(newGrupa)
//             }
       
//         }}
//         alt="Procesy"
//       />
//     </div>
//   );

//   function handleDragOver(e) {
//     e.preventDefault();
//   }

//   function handleDrop() {
//  if (sessionStorage.getItem("id_proces_wykonanie_drag") == rowGrupa.proces_id) {

 
//     if (sessionStorage.getItem("typ_drag") == "wykonanie") {
//       if(daneTech.id!=1){
//       let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
//       // console.log("id: "+id_drag_wykonania)
//       updateWydzielWykonanieZgrupy(id_drag_wykonania, fechparametryTechnologii,daneTech.zamowienie_id);
//       // let id_drop_grupa = id;
//       }
//       if(daneTech.id==1){
//         let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
//         // console.log("id: "+id_drag_wykonania)
//         // let id_drop_grupa = id;
        
//         }


//     }

    
//   }
//   }
// }

function AktualizujGrupe({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const daneTech = techContext.daneTech;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const grupaWykonan = techContext.grupaWykonan;

  // const global_id_grupa = row.global_id
  if(rowGrupa.update == true){
      return (
    <div style={{ paddingTop: "13px" }}>
      <img
        title="Nanieś zmiany na plan"
        className={style.expand_max}
        src={logoExtract} 
        onClick={() => {

          fechparametryTechnologii(rowGrupa.zamowienie_id,rowGrupa.technologia_id)
        //    if(DecodeToken(sessionStorage.getItem("token")).technologia_zapis==1)
        //     {

        //   if(daneTech.id !=1){
        //   updateSkasujGrupe(rowGrupa.global_id, fechparametryTechnologii,rowGrupa.zamowienie_id,rowGrupa.technologia_id);

        //   }else{
        // setGrupaWykonan(
        //   grupaWykonan.filter(e => e.id != rowGrupa.id)
        // )
        //   }


        //     }

        }}
        alt="Procesy"
      />
    </div>
  );
  }


}

function SkasujGrupeWykonan({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const daneTech = techContext.daneTech;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
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
             if (rowGrupa.global_id > 1 && daneTech.id > 1) {
               updateSkasujGrupe(
                 rowGrupa.global_id,
                 fechparametryTechnologii,
                 rowGrupa.zamowienie_id,
                 rowGrupa.technologia_id
               );

            dodajDoZamowienia(         {
              kategoria: "Technologia",
              event: "Skasowana grupa: " +rowGrupa.nazwa + " ID: " +rowGrupa.id,
              zamowienie_id: rowGrupa.zamowienie_id,
              user_id: DecodeToken(sessionStorage.getItem("token")).id
            })

             } else {
               setGrupaWykonan(grupaWykonan.filter((e) => e.id != rowGrupa.id));
               setWykonania(wykonania.filter((e) => e.grupa_id != rowGrupa.id));
             }
           }

        }}
        alt="Procesy"
      />
    </div>
  );
   }
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
            statusGrupyTechnologia({...rowGrupa, status: event.target.value, stary_status: rowGrupa.status,})
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


const StartDruku = ({ rowGrupa }) => {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const [sumujGrupe] = useGrupyWykonan()
  return (
    <div className={style.col_dane_start}>
      
      <label className={style.label}> Start </label>
      <input
      disable
        className={style.input}
        value={rowGrupa.poczatek}
        // onChange={(e) => {
        //   if (e.target.value == "" || reg_txt.test(e.target.value)) {
        //     updateGrupaWykonan({
        //       ...rowGrupa,
        //       czas: e.target.value,
        //       update:true
        //     });
        //   }

          
        // }}
      ></input>
    </div>
  );
};

// const PredkoscGrupy = ({ rowGrupa }) => {
//   const techContext = useContext(TechnologyContext);
//   const updateGrupaWykonan = techContext.updateGrupaWykonan
//   const [czasWykonania,statusWykonaniaTechnologia,updateGrupaWykonan_updateWykonania_narzad]=useWykonania()

//   return (
//     <div className={style.col_dane_przeloty}>
      
//       <label className={style.label}> Prędkość </label>
//       <input
      
//         className={style.input}
//         value={rowGrupa.predkosc}
//         onChange={(e) => {
//           if (e.target.value == "" || reg_txt.test(e.target.value)) {
//                        updateGrupaWykonan_updateWykonania_narzad({
//               ...rowGrupa,
//               predkosc: e.target.value,
//               update: true
//             });
//           }
//         }}
//       ></input>
//     </div>
//   );
// };


// const PrzelotyGrupy = ({ rowGrupa }) => {
//   const techContext = useContext(TechnologyContext);
//   const updateGrupaWykonan = techContext.updateGrupaWykonan
//   return (
//     <div className={style.col_dane_przeloty}>
      
//       <label className={style.label}> Przeloty </label>
//       <input
      
//        className={style.input}
//         value={rowGrupa.przeloty}
//         onChange={(e) => {
//           if (e.target.value == "" || reg_txt.test(e.target.value)) {
//             // updateGrupaWykonan({
//             //   ...rowGrupa,
//             //   predkosc: e.target.value,
//             // });
//           }
//         }}
//       ></input>
//     </div>
//   );
// };

// const Narzad = ({ rowGrupa }) => {
//   const techContext = useContext(TechnologyContext);
//   // const updateGrupaWykonan_updateWykonania_narzad = techContext.updateGrupaWykonan_updateWykonania_narzad
//   const [czasWykonania,statusWykonaniaTechnologia,updateGrupaWykonan_updateWykonania_narzad]=useWykonania()

//   return (
//     <div className={style.col_dane_przeloty}>
      
//       <label className={style.label}> Narzad </label>
//       <input
      
//        className={style.input}
//         value={rowGrupa.narzad}
//         onChange={(e) => {
//           if (e.target.value == "" || reg_txt.test(e.target.value)) {
//             updateGrupaWykonan_updateWykonania_narzad({
//               ...rowGrupa,
//               narzad: e.target.value,
//               update: true
//             });
//           }
//         }}
//       ></input>
//     </div>
//   );
// };

















