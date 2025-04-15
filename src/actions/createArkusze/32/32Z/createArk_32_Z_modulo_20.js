import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { findNadkomplet } from "actions/findNadkomplet";


export function createArk_32_Z_modulo_20(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety) {

let nr_arkusza = 0;
let nr_legi = 0;


ark_4(nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi)
ark_16(nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi)
ostatnia_32(ilosc_arkuszy,nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi)
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
      naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 2 * ilosc_leg_na_arkuszu) *16)
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
      naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 4 * ilosc_leg_na_arkuszu) *8)
    });
  }

}



const ark_8 = (nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi) =>{
  nr_arkusza++
  new_arkusze.push({
    id: getMaxID(new_arkusze),
    indeks: getMaxIndeks(new_arkusze),
    ...ark,
    nr_arkusza,
    rodzaj_arkusza: 8,
    ilosc_leg: lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu,
    naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu)),
    nadkomplet: findNadkomplet(nadkomplety, ark.naklad / (lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu) )
  });

  for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
    // do każdego ark dodaje odpowiednią ilość leg
    nr_legi++
    new_legi.push({
      id: getMaxID(new_legi),
      indeks: getMaxIndeks(new_legi),
      ...lega,
      nr_legi,
      rodzaj_legi:8,
      arkusz_id: getMaxID(new_arkusze)-1,
      naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu) *4)
    });
  }

}


const ark_16 = (nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi) =>{
  nr_arkusza++
  new_arkusze.push({
    id: getMaxID(new_arkusze),
    indeks: getMaxIndeks(new_arkusze),
    ...ark,
    nr_arkusza,
    rodzaj_arkusza: 16,
    ilosc_leg: lega.rodzaj_legi / 16 * ilosc_leg_na_arkuszu,
    naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 16 * ilosc_leg_na_arkuszu)),
    nadkomplet: findNadkomplet(nadkomplety, ark.naklad / (lega.rodzaj_legi / 16 * ilosc_leg_na_arkuszu) )
  });

  for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
    nr_legi++
    new_legi.push({
      id: getMaxID(new_legi),
      indeks: getMaxIndeks(new_legi),
      ...lega,
      nr_legi,
      rodzaj_legi:16,
      arkusz_id: getMaxID(new_arkusze)-1,
      naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 16 * ilosc_leg_na_arkuszu) *2)
    });
  }

}





const ostatnia_32 = (ilosc_arkuszy,nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi) =>{
  for (let i = 0; i < Math.floor(ilosc_arkuszy); i++) {
  nr_arkusza++
  new_arkusze.push({
    id: getMaxID(new_arkusze),
    indeks: getMaxIndeks(new_arkusze),
    ...ark,
    nr_arkusza,
    rodzaj_arkusza: 32,
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
}