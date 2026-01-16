
// fukncja do generowania wykonań i grup po stworzeniu arkuszy
// podobna do useArkusze, ale rozdzielona na osobną część tylko do wykonań 
import axios from "axios";
import { IP } from "../../utils/Host";

import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { useOprawa } from "../useOprawa";
import { addNewGrupa } from "./addNewGrupa";
import { addNewWykonanieArkusz } from "./addNewWykonanieArkusz";
import { addNewGrupaOprawa } from "./addNewGrupaOprawa";
import { addNewWykonanieLegi } from "./addNewWykonanieLegi";
import { addNewGrupaPostProcesy } from "./addNewGrupaPostProcesy";

export function useProcesy(){
    const contextApp = useContext(AppContext);
  

  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  const arkusze = techContext.arkusze;
  const legi = techContext.legi;
  const grupaWykonan = techContext.grupaWykonan;
  const wykonania = techContext.wykonania;
    const procesy = techContext.procesyElementow;
    const procesyProduktowTech = techContext.procesyProduktowTech;
    const setGrupaWykonan = techContext.setGrupaWykonan;
    const setWykonania = techContext.setWykonania;
    const oprawaTech = techContext.oprawaTech;
    const legiFragmenty = techContext.legiFragmenty;
    const grupaOprawaTech = techContext.grupaOprawaTech;
    const setGrupaOprawaTech = techContext.setGrupaOprawaTech;
    const procesList = contextApp.procesList;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;

    const [czasOprawy,iloscZbieran] = useOprawa();


  // automatyczne generowanie grup leg i oprawy przy tworzeniu karty tech. 
   function createWykonaniaFromArkuszeLegi() {
   const new_arkusze = [...arkusze.filter(x=>x.delete != true)];
   const new_legi = [...legi.filter(x=>x.delete != true)];
   const new_grupaOprawaTech = [...grupaOprawaTech.filter(x=>x.delete != true)];
   const new_grupy = [...grupaWykonan];
   const new_wykonania = [...wykonania];

   

   oprawaTech.map((oprawa,i)=> {
    let grupa_id = MaxID(new_grupaOprawaTech)
    addNewGrupaOprawa({ new_grupaOprawaTech,oprawa,grupa_id,procesList,czasOprawy,iloscZbieran});
   })
   setGrupaOprawaTech(new_grupaOprawaTech)
   
    procesy.map((proces, i) => {
      if (proces.arkusz == 1) {
        let grupa_id = MaxID(new_grupy);
        addNewGrupa({ new_grupy, grupa_id, proces });
        addNewWykonanieArkusz({ new_arkusze, new_wykonania, grupa_id, proces });
      }

      if (proces.lega == 1) {
        let grupa_id = MaxID(new_grupy);
        addNewGrupa({ new_grupy, grupa_id, proces });
        addNewWykonanieLegi({ new_legi, new_wykonania, grupa_id, proces });
      }
    });


        procesyProduktowTech.map((proces, i) => {
          // dodaj nową grupę
          // dodaj wykonanie do grupy

        let grupa_id = MaxID(new_grupy);
        //addNewGrupaPostProcesy({ new_grupy, grupa_id, proces });

        
      //  addNewWykonanieArkusz({ new_arkusze, new_wykonania, grupa_id, proces });
      

    });



setGrupaWykonan(new_grupy.map( ng => ({...ng,czas:SumaCzasow(new_wykonania,ng),przeloty:SumaPrzelotow(new_wykonania,ng),ilosc_narzadow:SumaWykonan(new_wykonania,ng)}) ));
setWykonania(new_wykonania)
}







  // Tworzenie grupy i wykonan z jednego procesu. Wykorzystywane gdy dodajemy nagle jeden proces i trzeba go umieścić w planie
   function createGrupaWykonaniaFromOneProcess(proces) {
    // proces to rowProces procesy elementów tech
   const new_arkusze = [...arkusze.filter(x=>x.delete != true)];
   const new_legi = [...legi.filter(x=>x.delete != true)];
   const new_grupaOprawaTech = [...grupaOprawaTech.filter(x=>x.delete != true)];
   const new_grupy = [...grupaWykonan];
   const new_wykonania = [...wykonania];

  //  oprawaTech.map((oprawa,i)=> {
  //   let grupa_id = MaxID(new_grupaOprawaTech)
  //   addNewGrupaOprawa({ new_grupaOprawaTech,oprawa,grupa_id,procesList,czasOprawy,iloscZbieran});
  //  })
  //  setGrupaOprawaTech(new_grupaOprawaTech)
   

      if (proces.arkusz == 1) {
        let grupa_id = MaxID(new_grupy);
        addNewGrupa({ new_grupy, grupa_id, proces });
        addNewWykonanieArkusz({ new_arkusze, new_wykonania, grupa_id, proces });
      }

      if (proces.lega == 1) {
        let grupa_id = MaxID(new_grupy);
        addNewGrupa({ new_grupy, grupa_id, proces });
        addNewWykonanieLegi({ new_legi, new_wykonania, grupa_id, proces });
      }


setGrupaWykonan(new_grupy.map( ng => ({...ng,czas:SumaCzasow(new_wykonania,ng),przeloty:SumaPrzelotow(new_wykonania,ng),ilosc_narzadow:SumaWykonan(new_wykonania,ng)}) ));
setWykonania(new_wykonania)
}



























   function createProcesyFromArkuszONE(
    // używane do dwójek
  ) {
   const new_arkusze = [...arkusze.filter(x=>x.delete != true)];
   const new_legi = [...legi.filter(x=>x.delete != true)];
   const new_procesy = [...procesy.filter(x=>x.delete != true)];
   const new_grupaOprawaTech = [...grupaOprawaTech.filter(x=>x.delete != true)];
   const new_grupy = [];
   const new_wykonania = [];

procesy.map((proces,i)=> {
  if(proces.arkusz==1){ 
let grupa_id = MaxID(new_grupy)
    new_grupy.push({
      id: grupa_id,
      global_id:0,
      indeks: i + 1,
      element_id: proces.element_id,
      nazwa: proces.nazwa,
      poczatek: "2024-10-30 10:00:00",
      czas: 1,
      koniec: "2024-10-30 11:00:00",
      procesor_id:proces.procesor_domyslny,
      narzad: proces.narzad,
      naklad: proces.naklad,
      predkosc: proces.predkosc,
      proces_id: proces.id,
      mnoznik: proces.mnoznik,
      status:1,
      stan:1,
      uwagi: ""
    });

    new_arkusze
    .filter(a => a.element_id == proces.element_id)
    .map((a,i)=>{
      new_wykonania.push({
        id: MaxID(new_wykonania),
        indeks: i + 1,
        nazwa: proces.nazwa,
        element_id: a.element_id,
        arkusz_id: a.id,
        proces_id: proces.id,
        typ_elementu: a.typ_elementu,
        poczatek: "2024-10-30 10:00:00",
        czas: parseInt(((parseInt(a.naklad) + parseInt(a.nadkomplet))/ proces.predkosc * proces.mnoznik) * 60 + proces.narzad,10),
        koniec: "2024-10-30 11:00:00",
        procesor_id:proces.procesor_domyslny,
        grupa_id:grupa_id,
        narzad: proces.narzad,
        predkosc: proces.predkosc,
        naklad: a.naklad,
        mnoznik: proces.mnoznik,
        status:1,
        stan:1,
        przeloty: parseInt(a.naklad) + parseInt(a.nadkomplet) ,
        uwagi: ""
      });
    })

// new_grupy.map( ng => ({...ng,czas:new_wykonania.filter(x=> x.grupa_id == ng.id).map(x => x.czas).reduce((a, b) => a + b, 0)}) )

  }

  if(proces.lega==1){ 
    let grupa_id = MaxID(new_grupy)
    new_grupy.push({
      id: grupa_id,
      global_id:0,
      indeks: i + 1,
      element_id: proces.element_id,
      nazwa: proces.nazwa,
      poczatek: "2024-10-30 10:00:00",
      czas: 1,
      koniec: "2024-10-30 11:00:00",
      procesor_id:proces.procesor_domyslny,
      narzad: proces.narzad,
      naklad: proces.naklad,
      predkosc: proces.predkosc,
      proces_id: proces.id,
      mnoznik: proces.mnoznik,
      status:1,
      stan:1,
      uwagi: ""
    });

    new_legi
    .filter(a => a.element_id == proces.element_id)
    .map(a=>{
      new_wykonania.push({
        id: MaxID(new_wykonania),
        indeks: i + 1,
        nazwa: proces.nazwa,
        element_id: a.element_id,
        arkusz_id: a.arkusz_id, // bylo a.id
        lega_id: a.id,
        proces_id: proces.id,
        typ_elementu: a.typ_elementu,
        poczatek: "2024-10-30 10:00:00",
        czas: parseInt((a.naklad /  proces.predkosc / proces.ilosc_uzytkow * proces.mnoznik) * 60 + proces.narzad,10) ,
        koniec: "2024-10-30 11:00:00",
        procesor_id:proces.procesor_domyslny,
        grupa_id:grupa_id,
        narzad: proces.narzad,
        predkosc: proces.predkosc,
        naklad: a.naklad,
        mnoznik: proces.mnoznik,
        status:1,
        stan:1,
        przeloty: a.naklad / proces.ilosc_uzytkow,
        uwagi: ""
      });
    })

  }

  

})

setGrupaWykonan(new_grupy.map( ng => ({...ng,czas:SumaCzasow(new_wykonania,ng),przeloty:SumaPrzelotow(new_wykonania,ng),ilosc_narzadow:SumaWykonan(new_wykonania,ng)}) ));
setWykonania(new_wykonania)

}



   function createProcesyFromArkuszNewGrupa( arkusz) {
 // używane przy dodawaniu pojedynczych arkuszy gdy zmienia sie objetosc
    // dodaje nową grupę wykonan z jednym wykonaniem
    // nasteępnie tą grupę trzeba dodać do planu
    // po dodaniu można
   const new_legi = [...legi.filter(x=> (x.delete != true) && (x.arkusz_id == arkusz.id))];
  //  const new_procesy = [...procesy.filter(x=>x.delete != true)];
  //  const new_grupaOprawaTech = [...grupaOprawaTech.filter(x=>x.delete != true)];
   let new_grupy = [...grupaWykonan];
   const new_wykonania = [...wykonania];

procesy.filter(x=> x.element_id == arkusz.element_id).map((proces,i)=> {
  if(proces.arkusz==1){ 
let grupa_id = MaxID(new_grupy)
    new_grupy.push({
      id: grupa_id,
      global_id:0,
      indeks: i + 1,
      technologia_id: arkusz.technologia_id,
       zamowienie_id: arkusz.zamowienie_id,
      element_id: proces.element_id,
      nazwa: proces.nazwa,
      poczatek: "2024-10-30 10:00:00",
      czas: 1,
      koniec: "2024-10-30 11:00:00",
      procesor_id:proces.procesor_domyslny,
      narzad: proces.narzad,
      naklad: proces.naklad,
      predkosc: proces.predkosc,
      proces_id: proces.id,
      mnoznik: proces.mnoznik,
      status:1,
      stan:1,
      uwagi: ""
    });


      new_wykonania.push({
        id: MaxID(new_wykonania),
        indeks: i + 1,
        technologia_id: arkusz.technologia_id,
        zamowienie_id: arkusz.zamowienie_id,
          global_id:0,
        nazwa: proces.nazwa,
        element_id: arkusz.element_id,
        arkusz_id: arkusz.id,
        proces_id: proces.id,
        typ_elementu: arkusz.typ_elementu,
        poczatek: "2024-10-30 10:00:00",
        czas: parseInt(((parseInt(arkusz.naklad) + parseInt(arkusz.nadkomplet))/ proces.predkosc * proces.mnoznik) * 60 + proces.narzad,10),
        koniec: "2024-10-30 11:00:00",
        procesor_id:proces.procesor_domyslny,
        grupa_id:grupa_id,
        narzad: proces.narzad,
        predkosc: proces.predkosc,
        naklad: arkusz.naklad,
        mnoznik: proces.mnoznik,
        status:1,
        stan:1,
        przeloty: parseInt(arkusz.naklad) + parseInt(arkusz.nadkomplet) ,
        uwagi: "",
        nazwa_wykonania: arkusz.rodzaj_arkusza
      });
    

// new_grupy.map( ng => ({...ng,czas:new_wykonania.filter(x=> x.grupa_id == ng.id).map(x => x.czas).reduce((a, b) => a + b, 0)}) )

  }

  if(proces.lega==1){ 
    let grupa_id = MaxID(new_grupy)
    new_grupy.push({
      id: grupa_id,
      technologia_id: arkusz.technologia_id,
      zamowienie_id: arkusz.zamowienie_id,
      global_id:0,
      indeks: i + 1,
      element_id: proces.element_id,
      nazwa: proces.nazwa,
      poczatek: "2024-10-30 10:00:00",
      czas: 1,
      koniec: "2024-10-30 11:00:00",
      procesor_id:proces.procesor_domyslny,
      narzad: proces.narzad,
      naklad: proces.naklad,
      predkosc: proces.predkosc,
      proces_id: proces.id,
      mnoznik: proces.mnoznik,
      status:1,
      stan:1,
      uwagi: ""
    });
console.log(new_legi)
    new_legi
    // .filter(a => a.element_id == proces.element_id)
    .map(a=>{
      new_wykonania.push({
        id: MaxID(new_wykonania),
        indeks: i + 1,
        technologia_id: a.technologia_id,
        zamowienie_id: a.zamowienie_id,
                  global_id:0,
        nazwa: proces.nazwa,
        element_id: a.element_id,
        arkusz_id: a.arkusz_id, // bylo a.id
        lega_id: a.id,
        proces_id: proces.id,
        typ_elementu: a.typ_elementu,
        poczatek: "2024-10-30 10:00:00",
        czas: parseInt((a.naklad /  proces.predkosc / proces.ilosc_uzytkow * proces.mnoznik) * 60 + proces.narzad,10) ,
        koniec: "2024-10-30 11:00:00",
        procesor_id:proces.procesor_domyslny,
        grupa_id:grupa_id,
        narzad: proces.narzad,
        
        predkosc: proces.predkosc,
        naklad: a.naklad,
        mnoznik: proces.mnoznik,
        status:1,
        stan:1,
        przeloty: a.naklad / proces.ilosc_uzytkow,
        uwagi: "",
        nazwa_wykonania: a.rodzaj_legi
      });
    })

  }

  

})



setGrupaWykonan(new_grupy.map( ng => ({...ng,czas:SumaCzasow(new_wykonania,ng),przeloty:SumaPrzelotow(new_wykonania,ng),ilosc_narzadow:SumaWykonan(new_wykonania,ng)}) ));
setWykonania(new_wykonania)

}

const aktualizujProcesy = async () =>{
await saveGrupaWykonan(grupaWykonan.filter(x=>x.global_id == 0))
await saveWykonania(wykonania.filter(x=>x.global_id == 0))
await fechparametryTechnologii(daneTech.zamowienie_id, daneTech.id);
}




const saveGrupaWykonan = (grupaWykonan) =>{

  console.log(" grupa do zapisu: ",grupaWykonan)

  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertGrupyZammowienia/" + sessionStorage.getItem("token"),[grupaWykonan])
resolve(res)
  })
}


const saveWykonania = (wykonania) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertWykonania/" + sessionStorage.getItem("token"),[wykonania])
resolve(res)
  })
}









const MaxID = (value) => {
  let maxID = null;
  if (value.length == 0) return (maxID = 1);
  maxID = Math.max(...value.map((f) => f.id)) + 1;

  return maxID;
};

const MaxIndeks = (value) => {
  let maxIndeks = null;
  if (value.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...value.map((f) => f.indeks)) + 1;

  return maxIndeks;
};

const MaxIndeksOprawa = (value,oprawa_id) => {
  let maxIndeks = null;
  if (value.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...value
    .filter(x=> x.oprawa_id == oprawa_id)
    .map((f) => f.indeks)) + 1;

  return maxIndeks;
};


const SumaCzasow = (wykonania,grupa) => {
  // sumuje wszystkie czasy z dowolnej grupy
  let  suma = wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.czas).reduce((a, b) => a + b, 0)
  return suma;
};

const SumaPrzelotow = (wykonania,grupa) => {
  // sumuje wszystkie czasy z dowolnej grupy
  let  suma = wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.przeloty).reduce((a, b) => a + b, 0)
  return suma;
};

const SumaWykonan= (wykonania,grupa) => {

  return wykonania.filter(x=> x.grupa_id == grupa.id).length;
};


  return {
    createWykonaniaFromArkuszeLegi,
    createGrupaWykonaniaFromOneProcess,
    createProcesyFromArkuszONE,
    createProcesyFromArkuszNewGrupa,
    aktualizujProcesy,
  };

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