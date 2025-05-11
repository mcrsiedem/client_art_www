import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { getMaxID } from "actions/getMaxID";
import { TechnologyContext } from "context/TechnologyContext";

export function useGrupyWykonan(row){
  const techContext = useContext(TechnologyContext);
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const setWykonania = techContext.setWykonania;
  const grupaWykonan = techContext.grupaWykonan;
  const procesyElementowTech = techContext.procesyElementowTech;
  const grupyWykonanAll = techContext.grupyWykonanAll;


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



  function statusGrupy(grupa) {
  //jezeli wszystkie grupy z danego procesu będą zakończone to zakończ tez proces i zmien nastepny w kolejce przypisany do elementu na oczekujace
    
 let grupy_wykonan_aktualnego_procesu = grupyWykonanAll.map((t) => {
    if (t.id === grupa.id && t.technologia_id == grupa.technologia_id) {
      return grupa;
    } else {
      return t;
    }
  })
  grupy_wykonan_aktualnego_procesu = grupy_wykonan_aktualnego_procesu.filter(x=>x.proces_id == grupa.proces_id)  
   

  // tu potrzeba proces grupy z bazy
    let proces_grupy = procesyElementowTech.map(x=>x.id == grupa.proces_id)   // proces grupy
    // sprawdzamy czy wszystkie grupy z procesu mają status 4 czyli zakonczone
    let czy_wszystkie_takie_same;

    if(grupa.status == 4){
      czy_wszystkie_takie_same = grupy_wykonan_aktualnego_procesu.every(x=> x.status==grupa.status)
      if(czy_wszystkie_takie_same){
        console.log("Wszystie grupy zakonczone")
        // jesli wszystkie grupy zakonczone mozna zakonczyc proces i wyzwolic nastepny


      }
          // console.log("takie same "+ czy_wszystkie_takie_same);
    }
    


    let indeks_nastepnego_procesu = proces_grupy.indeks+1
    // console.log("status")
    }





  return [sumujGrupe,statusGrupy];
}



// użycie

// const [add] = useHistoria()

// add(   {
//   kategoria: "Status zamówienia",
//   event: "Zmiana statusu zamówienia z "+ _status_dokumentu.filter(x=>x.id == daneZamowienia.status )[0].nazwa + " na "+ _status_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa,
// })

// add(                    {
//   kategoria: "Stan zamówienia",
//   event: "Zmiana stanu zamówienia z "+ _stan_dokumentu.filter(x=>x.id == daneZamowienia.stan )[0].nazwa + " na "+ _stan_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa}
// );

// add({kategoria: "Etap zamówienia",
//   event: "Zmiana etapu zamówienia z "+ _etapy_produkcji.filter(x=>x.id == daneZamowienia.etap )[0].nazwa + " na "+ _etapy_produkcji.filter(x=>x.id == event.target.value )[0].nazwa}
// );