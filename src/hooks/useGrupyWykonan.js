import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { getMaxID } from "actions/getMaxID";
import { TechnologyContext } from "context/TechnologyContext";
import { IP } from "utils/Host";
import axios from "axios";
import { useHistoria } from "./useHistoria";
import { AppContext } from "context/AppContext";
import { useNavigate } from "react-router-dom";

export function useGrupyWykonan(row){
  const techContext = useContext(TechnologyContext);
  const appContext = useContext(AppContext);

  const setGrupaWykonan = techContext.setGrupaWykonan;
  const setWykonania = techContext.setWykonania;
  const grupaWykonan = techContext.grupaWykonan;
  const procesyElementowTech = techContext.procesyElementowTech;
  const grupyWykonanAll = techContext.grupyWykonanAll;
   const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const selectedProcesor = techContext.selectedProcesor
  const setWykonaniaAll = techContext.setWykonaniaAll
  const setGrupWykonanAll = techContext.setGrupWykonanAll
  const setGrupWykonanAllWyszukiwarka = techContext.setGrupWykonanAllWyszukiwarka
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const dniWstecz = techContext.dniWstecz;
  const fechGrupyOprawaForProcesor = techContext.fechGrupyOprawaForProcesor
  const fechGrupyAndWykonaniaForProcesor_dni_wstecz_oprawa = techContext.fechGrupyAndWykonaniaForProcesor_dni_wstecz_oprawa
      const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
    const grupyOprawaAll = techContext.grupyOprawaAll;
   const [add,dodajDoZamowienia] = useHistoria()
  const navigate = useNavigate();

  const nazwaStatusuWykonania = appContext.nazwaStatusuWykonania

  


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
              global_id: grupa.global_id,
              zamowienie_id: grupa.zamowienie_id,
              grupa_nazwa: grupa.nazwa,
              stary_status: grupa.stary_status,
                });
  // fechGrupyAndWykonaniaForProcesor(selectedProcesor)
      await axios.get(IP + "technologie_grupy_an_wykonania_for_procesor_dni_wstecz/"+selectedProcesor+"/"+dniWstecz).then((res)=>{
      setWykonaniaAll(res.data[0])
      setGrupWykonanAll(res.data[1])
      setGrupWykonanAllWyszukiwarka(res.data[1])
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
      await axios.get(IP + "technologie_grupy_an_wykonania_for_procesor_dni_wstecz/"+selectedProcesor+"/"+dniWstecz).then((res)=>{
      setWykonaniaAll(res.data[0])
      setGrupWykonanAll(res.data[1])
      setGrupWykonanAllWyszukiwarka(res.data[1])
      return res
    }).then((res) =>{
      
      setGrupWykonanAll(prev=>{return prev})
      setGrupWykonanAllWyszukiwarka(prev=>{return prev})


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
              zamowienie_id: grupa.zamowienie_id,
              grupa_nazwa: grupa.nazwa,
              stary_status: grupa.stary_status,
          }
        );

        fechparametryTechnologii(grupa.zamowienie_id, grupa.technologia_id);
      }

      
      async function statusGrupyTechnologia_OPRAWA(grupa) {
   
        // z widoku technologia stage
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
                       zamowienie_id: grupa.zamowienie_id,
              grupa_nazwa: grupa.nazwa,
              stary_status: grupa.stary_status,
          }
        );


        fechparametryTechnologii(grupa.zamowienie_id, grupa.technologia_id);


      }

            async function statusGrupyTechnologia_OPRAWA_PROCESY(grupa) {


        // z widoku technologia stage
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
              zamowienie_id: grupa.zamowienie_id,
              grupa_nazwa: grupa.nazwa,
              stary_status: grupa.stary_status,
          }
        );
 console.log(res)
                 if(res.data =='OK'){
                // if(res.status == 200){
                  setGrupyOprawaAll(
                    grupyOprawaAll.map((t) => {
                      if (t.global_id == grupa.global_id) {
                        return { ...t, status: grupa.status };
                      } else {
                        return t;
                      }
                    })
                  );
                }else navigate("/Login");
// fechGrupyAndWykonaniaForProcesor_dni_wstecz_oprawa(selectedProcesor,dniWstecz)


      }


  return [sumujGrupe,statusGrupyProcesView,statusGrupyTechnologia,statusGrupyProcesViewPrzerwa,statusGrupyTechnologia_OPRAWA,statusGrupyTechnologia_OPRAWA_PROCESY];
}

// użycie
// const [add] = useHistoria()



