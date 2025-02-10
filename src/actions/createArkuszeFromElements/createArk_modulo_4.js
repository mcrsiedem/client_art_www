import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";



export function createArk_modulo_4(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega) {


//   for (let i = 0; i < ilosc_arkuszy; i++) {
//     const maxid = getMaxID(new_arkusze);
//     new_arkusze.push({
//       id: maxid,
//       indeks: getMaxIndeks(new_arkusze),
//       ...ark,
//       ilosc_leg: ilosc_leg_na_arkuszu,
//     });

//     for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
//       // do każdego ark dodaje odpowiednią ilość leg
//       new_legi.push({
//         id: getMaxID(new_legi),
//         indeks: getMaxIndeks(new_legi),
//         ...lega,
//         arkusz_id: maxid,
//       });
//     }
// }




for (let i = 0; i < ilosc_arkuszy - 2; i++) {
  const maxid = getMaxID(new_arkusze);
  new_arkusze.push({
    id: maxid,
    indeks: getMaxIndeks(new_arkusze),
    ...ark,
    ilosc_leg: 1,
  });
  for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
    // do każdego ark dodaje odpowiednią ilość leg
    new_legi.push({
      id: getMaxID(new_legi),
      indeks: getMaxIndeks(new_legi),
      ...lega,
      arkusz_id: maxid,
    });
  }

}

    new_arkusze.push({
      id: getMaxID(new_arkusze),
      indeks: getMaxIndeks(new_arkusze),
      ...ark,
      rodzaj_arkusza: 4,
      ilosc_leg: 1,
      naklad: ark.naklad / 4
    });

    for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
      // do każdego ark dodaje odpowiednią ilość leg
      new_legi.push({
        id: getMaxID(new_legi),
        indeks: getMaxIndeks(new_legi),
        ...lega,
        arkusz_id: getMaxID(new_arkusze)-1,
        naklad: ark.naklad / 4
      });
    }


new_arkusze.push({
  id: getMaxID(new_arkusze),
  indeks: getMaxIndeks(new_arkusze),
  ...ark,
  rodzaj_arkusza: 16,
  ilosc_leg: 1
});

for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
  // do każdego ark dodaje odpowiednią ilość leg
  new_legi.push({
    id: getMaxID(new_legi),
    indeks: getMaxIndeks(new_legi),
    ...lega,
    arkusz_id: getMaxID(new_arkusze)-1,
  });
}


}



