import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { getMaxID } from "actions/getMaxID";
import { TechnologyContext } from "context/TechnologyContext";
import { IP } from "utils/Host";
import axios from "axios";
import { AppContext } from "context/AppContext";

// grupa wykonan przed pierwszym zapisem technologi
export function useGrupyWykonanFirst(row){
  const techContext = useContext(TechnologyContext);
    const contextApp = useContext(AppContext);
  
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const procesory = contextApp.procesory;
  const setWykonania = techContext.setWykonania;
  const wykonania = techContext.wykonania;
  const grupaWykonan = techContext.grupaWykonan;
  const procesyElementowTech = techContext.procesyElementowTech;
  const grupyWykonanAll = techContext.grupyWykonanAll;
   const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const selectedProcesor = techContext.selectedProcesor
  const setWykonaniaAll = techContext.setWykonaniaAll
  const setGrupWykonanAll = techContext.setGrupWykonanAll
  const fechparametryTechnologii = techContext.fechparametryTechnologii;

  const SumaCzasow = (grupa,new_wykonania) => {
    let  suma = new_wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.czas).reduce((a, b) => a + b, 0)
    return suma;
  };


  const SumaPrzelotow = (grupa,new_wykonania) => {
    let  suma = new_wykonania.filter(x=> x.grupa_id == grupa.id).map(x => parseInt(x.przeloty)).reduce((a, b) => a + b, 0)
    return suma;
  };


function sumujGrupe(new_wykonania) {
  setGrupaWykonan(grupaWykonan.map( grupa=> ({...grupa,czas:SumaCzasow(grupa,new_wykonania), przeloty: SumaPrzelotow(grupa,new_wykonania)})))
  }



      const updateGrupaWykonan = (row) => {

      let new_proces = procesory.filter(x=>x.id == row.procesor_id)
      // console.log("new procesor predkosc: "+new_proces[0].predkosc)
      




        let new_wykonania =           wykonania.map((t) => {
            if (t.grupa_id === row.id) {
              return {...t,predkosc:new_proces[0].predkosc,czas: parseInt(((parseInt(t.naklad))/ new_proces[0].predkosc* t.mnoznik) * 60 + new_proces[0].narzad,10)}
            } else {
              return t;
            }
          })


          setWykonania(new_wykonania)


row = {...row, predkosc: new_proces[0].predkosc, czas: SumaCzasow(row,new_wykonania)}


        setGrupaWykonan(
          grupaWykonan.map((t) => {
            if (t.id === row.id) {
              return row;
            } else {
              return t;
            }
          })
        )



      };




  return [updateGrupaWykonan];
}

// użycie
// const [add] = useHistoria()



