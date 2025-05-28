import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { getMaxID } from "actions/getMaxID";
import { TechnologyContext } from "context/TechnologyContext";
import { IP } from "utils/Host";
import axios from "axios";

export function useGrupyWykonan(row){
  const techContext = useContext(TechnologyContext);
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const setWykonania = techContext.setWykonania;
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

  async function  statusGrupyProcesView(grupa) {
  //jezeli wszystkie grupy z danego procesu będą zakończone to zakończ tez proces i zmien nastepny w kolejce przypisany do elementu na oczekujace
    
     const res= await axios.put(IP + "zakoncz_proces_elementu_uwolnij_nastepny/" + sessionStorage.getItem("token"), {
              technologia_id: grupa.technologia_id,
              proces_id: grupa.proces_id,
              element_id: grupa.element_id,
              grupa_id: grupa.id,
              status: grupa.status,
              global_id: grupa.global_id
                });
  // fechGrupyAndWykonaniaForProcesor(selectedProcesor)
      await axios.get(IP + "technologie_grupy_an_wykonania_for_procesor/"+selectedProcesor).then((res)=>{
      setWykonaniaAll(res.data[0])
      setGrupWykonanAll(res.data[1])
      return res
    }).then((res) =>{
      
      setGrupWykonanAll(prev=>{return prev})
    });

  
    }


  async function  statusGrupyProcesViewPrzerwa(grupa) {
  //jezeli wszystkie grupy z danego procesu będą zakończone to zakończ tez proces i zmien nastepny w kolejce przypisany do elementu na oczekujace
    
     const res= await axios.put(IP + "zmien_status_przerwy/" + sessionStorage.getItem("token"), {
              status: grupa.status,
              global_id: grupa.global_id
                });
  // fechGrupyAndWykonaniaForProcesor(selectedProcesor)
      await axios.get(IP + "technologie_grupy_an_wykonania_for_procesor/"+selectedProcesor).then((res)=>{
      setWykonaniaAll(res.data[0])
      setGrupWykonanAll(res.data[1])
      return res
    }).then((res) =>{
      
      setGrupWykonanAll(prev=>{return prev})
    });

  
    }







      async function statusGrupyTechnologia(grupa) {
        const res = await axios.put(
          IP +
            "zakoncz_proces_elementu_uwolnij_nastepny/" +
            sessionStorage.getItem("token"),
          {
            technologia_id: grupa.technologia_id,
            proces_id: grupa.proces_id,
            element_id: grupa.element_id,
            grupa_id: grupa.id,
            status: grupa.status,
            global_id: grupa.global_id,
          }
        );

        fechparametryTechnologii(grupa.zamowienie_id, grupa.technologia_id);
      }

      
      async function statusGrupyTechnologia_OPRAWA(grupa) {
        const res = await axios.put(
          IP +
            "zakoncz_oprawe/" +
            sessionStorage.getItem("token"),
          {
            technologia_id: grupa.technologia_id,
            proces_id: grupa.proces_id,
            element_id: grupa.element_id,
            grupa_id: grupa.id,
            status: grupa.status,
            global_id: grupa.global_id,
          }
        );

        fechparametryTechnologii(grupa.zamowienie_id, grupa.technologia_id);
      }



  return [sumujGrupe,statusGrupyProcesView,statusGrupyTechnologia,statusGrupyProcesViewPrzerwa,statusGrupyTechnologia_OPRAWA];
}

// użycie
// const [add] = useHistoria()



