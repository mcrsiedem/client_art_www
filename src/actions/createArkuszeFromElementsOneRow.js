import axios from "axios";

import { IP } from "../utils/Host";

export function createArkuszeFromElemenetsOneRow(
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
const arkuszeEdit = arkusze.slice();
const legiEdit = legi.slice();
const legiFragmentyEdit = legiFragmenty.slice();
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
    maszyna_id:1

  }

  // console.log("elementyTech", elementyTech);

  elementyTech
  .filter(x => x.id == rowElement.id)
  .map((row) => {
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
    };

    const lega = {
      typ_elementu: row.typ,
      rodzaj_legi,
      element_id: row.id,
      ilosc_stron: row.ilosc_stron,
      naklad: row.naklad,
    };


    

    //-----------------------
    if (modulo == 0) {
    
      for (let i = 0; i < ilosc_arkuszy; i++) {
        const maxid = generateMaxID(new_arkusze);
        new_arkusze.push({
          id: maxid,
          indeks: generateMaxIndeks(new_arkusze),
          ...ark,
          ilosc_leg: ilosc_leg_na_arkuszu,
        });

        for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
          // do każdego ark dodaje odpowiednią ilość leg
          new_legi.push({
            id: generateMaxID(new_legi),
            indeks: generateMaxIndeks(new_legi),
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
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 2,
        ilosc_leg: rodzaj_arkusza / 2,
      });

      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
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
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 4,
        ilosc_leg: rodzaj_arkusza / 4,
      });

      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
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
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 2,
        ilosc_leg: rodzaj_arkusza / 2,
      });
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 4,
        ilosc_leg: rodzaj_arkusza / 4,
      });

      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
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
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 8,
        ilosc_leg: rodzaj_arkusza / 8,
      });

      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
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
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 2,
        ilosc_leg: rodzaj_arkusza / 2,
      });
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 8,
        ilosc_leg: rodzaj_arkusza / 8,
      });

      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
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
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 4,
        ilosc_leg: rodzaj_arkusza / 4,
      });
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 8,
        ilosc_leg: rodzaj_arkusza / 8,
      });

      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
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
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 2,
        ilosc_leg: rodzaj_arkusza / 2,
      });

      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 4,
        ilosc_leg: rodzaj_arkusza / 4,
      });
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 8,
        ilosc_leg: rodzaj_arkusza / 8,
      });

      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
        ilosc_leg: rodzaj_arkusza / 16,
      });
    }




    setArkusze(arkuszeEdit
      .filter(x => x.element_id !== rowElement.id)
      .concat(new_arkusze));

    setLegi(legiEdit
      .filter(x => x.element_id !== rowElement.id)
      .concat(new_legi));

  });


  new_legi
  .map((l, indeks) => {
    new_legiFragmenty.push({
      id: generateMaxID(new_legiFragmenty),
      indeks: generateMaxIndeks(new_legiFragmenty),
      // ...legaFragment,
      lega_id: l.id,
      naklad: l.naklad,
      fragment_id: l.id,
      // oprawa_id: l.oprawa_id,oprawaTech
      oprawa_id: oprawaTech[0]?.id,
      typ: l.typ_elementu,
      wersja: "",
      element_id: l.element_id,
    });
  });
  // setLegiFragmenty(new_legiFragmenty
  //   .sort((a,c)=>a.id-c.id).sort((a,c)=>a.oprawa_id-c.oprawa_id).map((x,i)=>{return {...x, indeks: i}}));

    setLegiFragmenty(legiFragmentyEdit
      .filter(x => x.element_id !== rowElement.id)
      .concat(new_legiFragmenty)
      .sort((a,c)=>a.id-c.id).sort((a,c)=>a.oprawa_id-c.oprawa_id).map((x,i)=>{return {...x, indeks: i}}));


}

const generateMaxID = (value) => {
  let maxID = null;
  if (value.length == 0) return (maxID = 1);
  maxID = Math.max(...value.map((f) => f.id)) + 1;

  return maxID;
};

const generateMaxIndeks = (value) => {
  let maxIndeks = null;
  if (value.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...value.map((f) => f.indeks)) + 1;

  return maxIndeks;
};

const generateMaxIndeksOprawa = (value,oprawa_id) => {
  let maxIndeks = null;
  if (value.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...value
    .filter(x=> x.oprawa_id == oprawa_id)
    .map((f) => f.indeks)) + 1;

  return maxIndeks;
};
