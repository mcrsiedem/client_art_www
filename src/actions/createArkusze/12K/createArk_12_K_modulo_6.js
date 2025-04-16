import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { findNadkomplet } from "actions/findNadkomplet";


export function createArk_12_K_modulo_6(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety) {

let nr_arkusza = 0;
let nr_legi = 0;

pierwsza_12(ilosc_arkuszy,nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi)
ark_2(nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi)
ark_4(nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi)
ostatnia_12(nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi)
}



const pierwsza_12 = (ilosc_arkuszy,nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi) =>{
  for (let i = 0; i < ilosc_arkuszy - 2; i++) {
    const maxid = getMaxID(new_arkusze);
    nr_arkusza++
    new_arkusze.push({
      id: maxid,
      indeks: getMaxIndeks(new_arkusze),
      ...ark,
      nr_arkusza,
      ilosc_leg: ilosc_leg_na_arkuszu,
          nadkomplet: findNadkomplet(nadkomplety,ark.naklad) 
    });
    for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
      // do każdego ark dodaje odpowiednią ilość leg
      nr_legi++;
      new_legi.push({
        id: getMaxID(new_legi),
        indeks: getMaxIndeks(new_legi),
        ...lega,
        nr_legi,
        arkusz_id: maxid,
      });
    }
  
  }

}

const ark_2 = (nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi) =>{
  nr_arkusza++
  new_arkusze.push({
    id: getMaxID(new_arkusze),
    indeks: getMaxIndeks(new_arkusze),
    ...ark,
    nr_arkusza,
    rodzaj_arkusza: 2,
    ilosc_leg: lega.rodzaj_legi / 2 * ilosc_leg_na_arkuszu,
    naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 2 * ilosc_leg_na_arkuszu)),
    nadkomplet: findNadkomplet(nadkomplety, ark.naklad / (lega.rodzaj_legi / 2 * ilosc_leg_na_arkuszu) )
  });

  for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
    // do każdego ark dodaje odpowiednią ilość leg
    nr_legi++
    new_legi.push({
      id: getMaxID(new_legi),
      indeks: getMaxIndeks(new_legi),
      ...lega,
      nr_legi,
      rodzaj_legi:2,
      arkusz_id: getMaxID(new_arkusze)-1,
      naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 2 * ilosc_leg_na_arkuszu) *6)
    });
  }

}


const ark_4 = (nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi) =>{
  nr_arkusza++
  new_arkusze.push({
    id: getMaxID(new_arkusze),
    indeks: getMaxIndeks(new_arkusze),
    ...ark,
    nr_arkusza,
    rodzaj_arkusza: 4,
    ilosc_leg: lega.rodzaj_legi / 4 * ilosc_leg_na_arkuszu,
    naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 4 * ilosc_leg_na_arkuszu)),
    nadkomplet: findNadkomplet(nadkomplety, ark.naklad / (lega.rodzaj_legi / 4 * ilosc_leg_na_arkuszu) )
  });

  for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
    // do każdego ark dodaje odpowiednią ilość leg
    nr_legi++
    new_legi.push({
      id: getMaxID(new_legi),
      indeks: getMaxIndeks(new_legi),
      ...lega,
      nr_legi,
      rodzaj_legi:4,
      arkusz_id: getMaxID(new_arkusze)-1,
      naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 4 * ilosc_leg_na_arkuszu) *3)
    });
  }

}


const ostatnia_12 = (nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi) =>{
  nr_arkusza++
  new_arkusze.push({
    id: getMaxID(new_arkusze),
    indeks: getMaxIndeks(new_arkusze),
    ...ark,
    nr_arkusza,
    rodzaj_arkusza: 12,
    ilosc_leg: ilosc_leg_na_arkuszu,
    nadkomplet: findNadkomplet(nadkomplety,ark.naklad) 
  });
  
  for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
    // do każdego ark dodaje odpowiednią ilość leg
    nr_legi++
    new_legi.push({
      id: getMaxID(new_legi),
      indeks: getMaxIndeks(new_legi),
      ...lega,
      nr_legi,
      arkusz_id: getMaxID(new_arkusze)-1,
    });
  }

}