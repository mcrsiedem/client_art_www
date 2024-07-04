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
  elementyTech
) {
  // generuje arkusze i legi z ilości stron elementu
  // row to jest ElementyTechRow czyli np okładka lub środek

  const new_arkusze = [];
  const new_legi = [];
  const new_legiFragmenty = [];
  console.log("elementyTech", elementyTech);

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
    };

    const lega = {
      typ_elementu: row.typ,
      rodzaj_legi,
      element_id: row.id,
      ilosc_stron: row.ilosc_stron,
      naklad: row.naklad,
    };

    const legaFragment = {
      wersja: "fr",
      element_id: row.id,
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

    fragmentyTech.forEach((frag, i) => {
      new_legi
        .filter((f) => frag.element_id == f.element_id)
        .filter((f) => row.typ == frag.typ)
        .map((l, indeks) => {
          new_legiFragmenty.push({
            id: generateMaxID(new_legiFragmenty),
            // indeks: generateMaxIndeks(new_legiFragmenty),
            // indeks: l.indeks,
            indeks: generateMaxIndeks(new_legiFragmenty),
            // indeks: generateMaxIndeksOprawa(new_legiFragmenty,frag.oprawa_id),
            ...legaFragment,
            // lega_id: generateMaxID(new_legiFragmenty),
            lega_id: l.id,
            naklad: frag.naklad,
            fragment_id: frag.id,
            oprawa_id: frag.oprawa_id,
            typ: frag.typ,
          });
        });
    });

    new_legiFragmenty
    // .sort((a,c)=>a.id-c.id)
    // .sort((a,c)=>a.oprawa_id-c.oprawa_id)
    .map((x)=>{return {...x, indeks:1}})

    // console.log("new_legiFragmenty :", new_legiFragmenty.sort((a,c)=>a.id-c.id).sort((a,c)=>a.oprawa_id-c.oprawa_id));

    // dla każdego fragmentu oprawy nalżey wygnerowac fragment legi

    setArkusze(new_arkusze);
    setLegi(new_legi);
    setLegiFragmenty(new_legiFragmenty);
    // generateLegi(new_arkusze)
  });
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
