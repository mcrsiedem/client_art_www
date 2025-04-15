import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { findNadkomplet } from "actions/findNadkomplet";


export function createArk_16_K_single_ark(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety) {

  // jeden arkusz i jedna lega poniżej 32 stron
let nr_arkusza = 0;
let nr_legi = 0;


single_ark_lega(nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi)
}





const single_ark_lega = (nr_arkusza,new_arkusze,ark,nadkomplety,ilosc_leg_na_arkuszu,nr_legi,lega,new_legi) =>{
  nr_arkusza++
  new_arkusze.push({
    id: getMaxID(new_arkusze),
    indeks: getMaxIndeks(new_arkusze),
    ...ark,
    nr_arkusza,
    rodzaj_arkusza: 16,
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