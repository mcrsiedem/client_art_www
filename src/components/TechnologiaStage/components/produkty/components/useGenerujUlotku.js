import { useContext } from "react";
import { PreOrderContext } from "context/PreOrderContext";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { findNadkomplet } from "actions/findNadkomplet";
import { getMaxID } from "actions/getMaxID";

export function useGenerujUlotku(status_id){

  const contextTech = useContext(TechnologyContext);
  const legi = contextTech.legi;
  const setLegi = contextTech.setLegi;
  const arkusze = contextTech.arkusze;
  const setArkusze = contextTech.setArkusze;
  let elementyTech = contextTech.elementyTech;
  const setElementyTech = contextTech.setElementyTech;
      const oprawaTech = contextTech.oprawaTech;
      const procesyElementowTech = contextTech.procesyElementowTech;
      const setProcesyElementowTech = contextTech.setProcesyElementowTech;

    const legiFragmenty = contextTech.legiFragmenty;
    const setLegiFragmenty = contextTech.setLegiFragmenty;
         const contextApp = useContext(AppContext);
   const nadkomplety = contextApp.nadkomplety;



const legiKazdaUlotka = () =>{

 elementyTech = elementyTech.map((t) => {
    return { ...t, lega: t.ilosc_stron, ilosc_leg: 1};
    })

  // setElementyTech(
  //   elementyTech.map((t) => {
  //   return { ...t, lega: t.ilosc_stron, ilosc_leg: 1};
  //   })
  // );
      const new_arkusze = [];
  const new_legi = [];
  const new_legiFragmenty = [];
  const new_grupy = [];
  const new_wykonania = [];
   let arkusz_id = 1;

 elementyTech.map((row) => {
    
    const ilosc_leg_na_arkuszu = row.ilosc_leg;
    const rodzaj_legi = row.lega;
    let rodzaj_arkusza = 0;
    if(row.ilosc_stron == row.lega ){
    rodzaj_arkusza = rodzaj_legi * ilosc_leg_na_arkuszu / ilosc_leg_na_arkuszu; // wszystkie legi na rkuszu są takie same
    } else{
      rodzaj_arkusza = rodzaj_legi * ilosc_leg_na_arkuszu // rózne legi na arkuszu
    }

    const ilosc_arkuszy = row.ilosc_stron / rodzaj_arkusza /ilosc_leg_na_arkuszu;
    const modulo = row.ilosc_stron % rodzaj_arkusza;


    const ark = {
      typ_elementu: row.typ,
      rodzaj_arkusza,
      naklad: row.naklad,
      nadkomplet: "",
      element_id: row.id,
      ilosc_stron: row.lega,
      uwagi: "",
      nr_arkusza: "",
      arkusz_szerokosc: row.arkusz_szerokosc,
      arkusz_wysokosc: row.arkusz_wysokosc,
      papier_id: row.papier_id,
      papier_postac_id: row.papier_postac_id,
      technologia_id: row.technologia_id,
      insert: true
    };

    const lega = {
      typ_elementu: row.typ,
      rodzaj_legi,
      element_id: row.id,
      ilosc_stron: row.lega,
      naklad: row.naklad,
      uwagi: "",
      nr_legi: "",
      technologia_id: row.technologia_id,
      insert: true
    };


  new_arkusze.push({
    // id: getMaxID(new_arkusze),
    id: arkusz_id++,
    indeks: getMaxIndeks(new_arkusze.filter(x=> x.element_id == row.id)),
    ...ark,
    nr_arkusza:1,
    naklad:Math.ceil( ark.naklad /  ilosc_leg_na_arkuszu),
    ilosc_leg: ilosc_leg_na_arkuszu,
    nadkomplet: findNadkomplet(nadkomplety,ark.naklad /  ilosc_leg_na_arkuszu) 
  });



    // do każdego ark dodaje odpowiednią ilość leg
    new_legi.push({
      id: getMaxID(new_legi),
      indeks: getMaxIndeks(new_legi.filter(x=> x.element_id == row.id)),
      ...lega,
      nr_legi:1,
      // arkusz_id: 1, // lega zawsze do pierwzsego arkusza
      arkusz_id: arkusz_id, // każda lega do innego arkusza
    });






  });
  new_legi
  .map((l, indeks) => {
    new_legiFragmenty.push({
      id: getMaxID(new_legiFragmenty),
      indeks: getMaxIndeks(new_legiFragmenty),
      // ...legaFragment,
      lega_id: l.id,
      nr_legi: l.nr_legi,
      naklad: l.naklad,
      fragment_id: l.id,
      rodzaj_legi: l.rodzaj_legi,
      // oprawa_id: l.oprawa_id,oprawaTech
      oprawa_id: oprawaTech[0]?.id,
      typ: l.typ_elementu,
      wersja: "",
      element_id: l.element_id,
      arkusz_id: l.arkusz_id,
      insert: true
    });
  });

setArkusze(new_arkusze)
setLegi(new_legi)
setLegiFragmenty(new_legiFragmenty)

setElementyTech(
    elementyTech.map((t) => {
    return { ...t, lega: t.ilosc_stron, ilosc_leg: 1};
    })
  );


  }


const legiKazdaUlotkaJedenArkusz = () =>{

 elementyTech = elementyTech.map((t) => {
    return { ...t, lega: t.ilosc_stron, ilosc_leg: 1};
    })

  // setElementyTech(
  //   elementyTech.map((t) => {
  //   return { ...t, lega: t.ilosc_stron, ilosc_leg: 1};
  //   })
  // );
      const new_arkusze = [];
  const new_legi = [];
  const new_legiFragmenty = [];
  const new_grupy = [];
  const new_wykonania = [];
   let arkusz_id = 1;

 elementyTech.map((row) => {
    
    const ilosc_leg_na_arkuszu = row.ilosc_leg;
    const rodzaj_legi = row.lega;
    let rodzaj_arkusza = 0;
    if(row.ilosc_stron == row.lega ){
    rodzaj_arkusza = rodzaj_legi * ilosc_leg_na_arkuszu / ilosc_leg_na_arkuszu; // wszystkie legi na rkuszu są takie same
    } else{
      rodzaj_arkusza = rodzaj_legi * ilosc_leg_na_arkuszu // rózne legi na arkuszu
    }

    const ilosc_arkuszy = row.ilosc_stron / rodzaj_arkusza /ilosc_leg_na_arkuszu;
    const modulo = row.ilosc_stron % rodzaj_arkusza;


    const ark = {
      typ_elementu: row.typ,
      rodzaj_arkusza,
      naklad: row.naklad,
      nadkomplet: "",
      element_id: row.id,
      ilosc_stron: row.lega,
      uwagi: "",
      nr_arkusza: "",
      arkusz_szerokosc: row.arkusz_szerokosc,
      arkusz_wysokosc: row.arkusz_wysokosc,
      papier_id: row.papier_id,
      papier_postac_id: row.papier_postac_id,
      technologia_id: row.technologia_id,
      insert: true
    };

    const lega = {
      typ_elementu: row.typ,
      rodzaj_legi,
      element_id: row.id,
      ilosc_stron: row.lega,
      naklad: row.naklad,
      uwagi: "",
      nr_legi: "",
      technologia_id: row.technologia_id,
      insert: true
    };


  new_arkusze.push({
    // id: getMaxID(new_arkusze),
    id: arkusz_id++,
    indeks: getMaxIndeks(new_arkusze.filter(x=> x.element_id == row.id)),
    ...ark,
    nr_arkusza:1,
    naklad:Math.ceil( ark.naklad /  ilosc_leg_na_arkuszu),
    ilosc_leg: ilosc_leg_na_arkuszu,
    nadkomplet: findNadkomplet(nadkomplety,ark.naklad /  ilosc_leg_na_arkuszu) 
  });



    // do każdego ark dodaje odpowiednią ilość leg
    new_legi.push({
      id: getMaxID(new_legi),
      indeks: getMaxIndeks(new_legi.filter(x=> x.element_id == row.id)),
      ...lega,
      nr_legi:1,
      arkusz_id: 1, // lega zawsze do pierwzsego arkusza
      // arkusz_id: arkusz_id, // każda lega do innego arkusza
    });






  });
  new_legi
  .map((l, indeks) => {
    new_legiFragmenty.push({
      id: getMaxID(new_legiFragmenty),
      indeks: getMaxIndeks(new_legiFragmenty),
      // ...legaFragment,
      lega_id: l.id,
      nr_legi: l.nr_legi,
      naklad: l.naklad,
      fragment_id: l.id,
      rodzaj_legi: l.rodzaj_legi,
      // oprawa_id: l.oprawa_id,oprawaTech
      oprawa_id: oprawaTech[0]?.id,
      typ: l.typ_elementu,
      wersja: "",
      element_id: l.element_id,
      arkusz_id: l.arkusz_id,
      insert: true
    });
  });

setArkusze(new_arkusze.filter(x => x.id ==1)) // arkusze poza id 1 bo są puste
setLegi(new_legi)
setLegiFragmenty(new_legiFragmenty)

setElementyTech(
    elementyTech.map((t) => {
    return { ...t, lega: t.ilosc_stron, ilosc_leg: 1};
    })
  );



  setProcesyElementowTech(procesyElementowTech.filter(x=> x.element_id ==1))

  }




  return {legiKazdaUlotka,legiKazdaUlotkaJedenArkusz};



}

// const [add] = useHistoria()

