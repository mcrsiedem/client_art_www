import axios from "axios";

import { IP } from "../utils/Host";

export function createArkuszeFromElemenets(
  arkusze,
  setArkusze,
  legi,
  setLegi,
  legiFragmenty,
  setLegiFragmenty,
  oprawaTech,
  setOprawaTech,
  fragmentyTech,
  setFragmentyTech,
  elementyTech,
  rowElement, procesy, grupaWykonan,setGrupaWykonan,wykonania, setWykonania
) {
  // generuje arkusze i legi z ilości stron elementu
  // row to jest ElementyTechRow czyli np okładka lub środek

  // const new_arkusze = [{id:0, indeks:0}];
  // const new_legi = [{id:0}];
  // const new_legiFragmenty = [{id:0}];
  // const new_grupy = [{id:0}];
  // const new_wykonania = [{id:0}];


  const new_arkusze = [];
  const new_legi = [];
  const new_legiFragmenty = [];
  const new_grupy = [];
  const new_wykonania = [];

  const grupa ={
    id:1,
    element_id:1,
    proces_id:1,
    produkt_id:1,
    technologia_id:1,
    zamowienie_id:1,
    maszyna_id:1,
    uwagi: ""

  }

  // console.log("elementyTech", elementyTech);

  elementyTech.map((row) => {
    // console.log("row: ",row)

    const ilosc_leg_na_arkuszu = row.ilosc_leg;
    const rodzaj_legi = row.lega;
    const rodzaj_arkusza = rodzaj_legi * ilosc_leg_na_arkuszu;
    const ilosc_arkuszy = row.ilosc_stron / rodzaj_arkusza;
    const modulo = row.ilosc_stron % rodzaj_arkusza;

    const ark = {
      typ_elementu: row.typ,
      rodzaj_arkusza,
      naklad: row.naklad,
      element_id: row.id,
      ilosc_stron: row.ilosc_stron,
      uwagi: ""
    };

    const lega = {
      typ_elementu: row.typ,
      rodzaj_legi,
      element_id: row.id,
      ilosc_stron: row.ilosc_stron,
      naklad: row.naklad,
      uwagi: ""
    };



    //-----------------------
    if (modulo == 0) {
      for (let i = 0; i < ilosc_arkuszy; i++) {
            const maxid = MaxID(new_arkusze);
            new_arkusze.push({
              id: maxid,
              indeks: MaxIndeks(new_arkusze),
              ...ark,
              ilosc_leg: ilosc_leg_na_arkuszu,
            });

            for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
              // do każdego ark dodaje odpowiednią ilość leg
              new_legi.push({
                id: MaxID(new_legi),
                indeks: MaxIndeks(new_legi),
                ...lega,
                arkusz_id: maxid,
              });
            }
      }
    }

    //-----------------------
    if (modulo == 2) {
      for (let i = 0; i < ilosc_arkuszy - 2; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
          ilosc_leg: rodzaj_arkusza / 16,
        });
      }

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 2,
        ilosc_leg: rodzaj_arkusza / 2,
      });

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
        ilosc_leg: rodzaj_arkusza / 16,
      });
    }

    if (modulo == 4) {
      for (let i = 0; i < ilosc_arkuszy - 2; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
          ilosc_leg: 1,
        });
      }

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 4,
        ilosc_leg: rodzaj_arkusza / 4,
      });

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
        ilosc_leg: rodzaj_arkusza / 16,
      });
    }

    if (modulo == 6) {
      for (let i = 0; i < ilosc_arkuszy - 2; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
          ilosc_leg: rodzaj_arkusza / 16,
        });
      }

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 2,
        ilosc_leg: rodzaj_arkusza / 2,
      });
      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 4,
        ilosc_leg: rodzaj_arkusza / 4,
      });

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
        ilosc_leg: rodzaj_arkusza / 16,
      });
    }

    if (modulo == 8) {
      for (let i = 0; i < ilosc_arkuszy - 2; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
          ilosc_leg: rodzaj_arkusza / 16,
        });
      }

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 8,
        ilosc_leg: rodzaj_arkusza / 8,
      });

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
        ilosc_leg: rodzaj_arkusza / 16,
      });
    }

    if (modulo == 10) {
      for (let i = 0; i < ilosc_arkuszy - 2; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
          ilosc_leg: rodzaj_arkusza / 16,
        });
      }

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 2,
        ilosc_leg: rodzaj_arkusza / 2,
      });
      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 8,
        ilosc_leg: rodzaj_arkusza / 8,
      });

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
        ilosc_leg: rodzaj_arkusza / 16,
      });
    }

    if (modulo == 12) {
      for (let i = 0; i < ilosc_arkuszy - 2; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
          ilosc_leg: rodzaj_arkusza / 16,
        });
      }

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 4,
        ilosc_leg: rodzaj_arkusza / 4,
      });
      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 8,
        ilosc_leg: rodzaj_arkusza / 8,
      });

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
        ilosc_leg: rodzaj_arkusza / 16,
      });
    }

    if (modulo == 14) {
      for (let i = 0; i < ilosc_arkuszy - 2; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
          ilosc_leg: rodzaj_arkusza / 16,
        });
      }
      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 2,
        ilosc_leg: rodzaj_arkusza / 2,
      });

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 4,
        ilosc_leg: rodzaj_arkusza / 4,
      });
      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 8,
        ilosc_leg: rodzaj_arkusza / 8,
      });

      new_arkusze.push({
        id: MaxID(new_arkusze),
        indeks: MaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
        ilosc_leg: rodzaj_arkusza / 16,
      });
    }


    //  tworzy fragmety leg w jedej tablicy
    // fragmentyTech.forEach((frag, i) => {
    //   new_legi
    //     .filter((f) => frag.element_id == f.element_id)
    //     .filter((f) => row.typ == frag.typ)
    //     .map((l, indeks) => {
    //       new_legiFragmenty.push({
    //         id: MaxID(new_legiFragmenty),
    //         indeks: MaxIndeks(new_legiFragmenty),
    //         ...legaFragment,
    //         lega_id: l.id,
    //         naklad: frag.naklad,
    //         fragment_id: frag.id,
    //         oprawa_id: frag.oprawa_id,
    //         typ: frag.typ,
    //       });
    //     });
    // });




  


    // new_legiFragmenty
    // .sort((a,c)=>a.id-c.id)
    // .sort((a,c)=>a.oprawa_id-c.oprawa_id)
    // .map((x)=>{return {...x, indeks:1}})

    // console.log("new_legiFragmenty :", new_legiFragmenty.sort((a,c)=>a.id-c.id).sort((a,c)=>a.oprawa_id-c.oprawa_id));
    // console.log("new_legiFragmenty :", new_legiFragmenty);

    // dla każdego fragmentu oprawy nalżey wygnerowac fragment legi

    setArkusze(new_arkusze);
    setLegi(new_legi);


    // setLegiFragmenty(new_legiFragmenty);

    // const poj = null

    // new_legiFragmenty.forEach(x=> {
    //   if (poj.some(z=> z.oprawa_id != x.oprawa_id)){
    //       poj.push(x)
    //   }
    // })
    // setLegiFragmenty(poj.forEach(p=> {

    // }))
    // const legi_oprawa  = new_legiFragmenty.map
    // setLegiFragmenty(new_legiFragmenty.sort((a,c)=>a.id-c.id).sort((a,c)=>a.oprawa_id-c.oprawa_id).map((x,i)=>{return {...x, indeks: i+1}}));


    // generateLegi(new_arkusze)
  });

  // const legaFragment = {
  //   wersja: "fr",
  //   element_id: row.id,
  // };
  new_legi
  .map((l, indeks) => {
    new_legiFragmenty.push({
      id: MaxID(new_legiFragmenty),
      indeks: MaxIndeks(new_legiFragmenty),
      // ...legaFragment,
      lega_id: l.id,
      naklad: l.naklad,
      fragment_id: l.id,
      // oprawa_id: l.oprawa_id,oprawaTech
      oprawa_id: oprawaTech[0]?.id,
      typ: l.typ_elementu,
      wersja: "",
      element_id: l.element_id,
      arkusz_id: l.arkusz_id
    });
  });
  setLegiFragmenty(new_legiFragmenty.sort((a,c)=>a.id-c.id).sort((a,c)=>a.oprawa_id-c.oprawa_id).map((x,i)=>{return {...x, indeks: i}}));

  procesy.map((proc,i)=> {
    if(proc.nazwa_id==1){  // druk

      new_grupy.push({
        id: proc.id,
        global_id:0,
        indeks: i + 1,
        element_id: proc.element_id,
        nazwa: proc.nazwa,
        poczatek: "2024-10-30 10:00:00",
        czas: 1,
        koniec: "2024-10-30 11:00:00",
        procesor_id:proc.procesor_domyslny,
        narzad: proc.narzad,
        predkosc: proc.predkosc,
        proces_id: proc.id,
        mnoznik: proc.mnoznik,
        status:1,
        stan:1,
        uwagi: ""
      });

      new_arkusze
      .filter(a => a.element_id == proc.element_id)
      .map((a,i)=>{
        new_wykonania.push({
          id: MaxID(new_wykonania),
          indeks: i + 1,
          nazwa: proc.nazwa,
          element_id: a.element_id,
          arkusz_id: a.id,
          proces_id: proc.id,
          typ_elementu: a.typ_elementu,
          poczatek: "2024-10-30 10:00:00",
          czas: parseInt((a.naklad / proc.predkosc * proc.mnoznik) * 60 + proc.narzad,10),
          koniec: "2024-10-30 11:00:00",
          procesor_id:proc.procesor_domyslny,
          grupa_id:proc.id,
          narzad: proc.narzad,
          predkosc: proc.predkosc,
          naklad: a.naklad,
          mnoznik: proc.mnoznik,
          status:1,
          stan:1,
          uwagi: ""
        });
      })

  new_grupy.map( ng => ({...ng,czas:new_wykonania.filter(x=> x.grupa_id == ng.id).map(x => x.czas).reduce((a, b) => a + b, 0)}) )
  // console.log("czas:" , new_wykonania.filter(x=> x.grupa_id == 267).map(x => x.czas).reduce((a, b) => a + b, 0))
  // console.log("czas:" , new_wykonania.filter(x=> x.grupa_id == 267).map(x => x.czas).reduce((a, b) => a + b, 0))
      // new_grupa.map( ng => ng.czas+
      //   new_wykonania.filter(x=> x.grupa_id == ng.id).czas
      // )

      // new_wykonania.forEach( nw => )
    }

    if(proc.nazwa_id==3){ // falcowanie
      new_grupy.push({
        id: proc.id,
        global_id:0,
        indeks: i + 1,
        element_id: proc.element_id,
        nazwa: proc.nazwa,
        poczatek: "2024-10-30 10:00:00",
        czas: 1,
        koniec: "2024-10-30 11:00:00",
        procesor_id:proc.procesor_domyslny,
        narzad: proc.narzad,
        predkosc: proc.predkosc,
        proces_id: proc.id,
        mnoznik: proc.mnoznik,
        status:1,
        stan:1,
        uwagi: ""
      });

      new_legi
      .filter(a => a.element_id == proc.element_id)
      .map(a=>{
        new_wykonania.push({
          id: MaxID(new_wykonania),
          indeks: i + 1,
          nazwa: proc.nazwa,
          element_id: a.element_id,
          arkusz_id: a.id,
          proces_id: proc.id,
          typ_elementu: a.typ_elementu,
          poczatek: "2024-10-30 10:00:00",
          czas: parseInt((a.naklad / proc.predkosc * proc.mnoznik) * 60 + proc.narzad,10) ,
          koniec: "2024-10-30 11:00:00",
          procesor_id:proc.procesor_domyslny,
          grupa_id:proc.id,
          narzad: proc.narzad,
          predkosc: proc.predkosc,
          naklad: a.naklad,
          mnoznik: proc.mnoznik,
          status:1,
          stan:1,
          uwagi: ""
        });
      })


    }
    
  })
  // setGrupaWykonan(new_grupy);
  // setGrupaWykonan(new_grupy.map( ng => ({...ng,czas:new_wykonania.filter(x=> x.grupa_id == ng.id).map(x => x.czas).reduce((a, b) => a + b, 0)}) ));
  setGrupaWykonan(new_grupy.map( ng => ({...ng,czas:SumaCzasow(new_wykonania,ng)}) ));
  setWykonania(new_wykonania)

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
