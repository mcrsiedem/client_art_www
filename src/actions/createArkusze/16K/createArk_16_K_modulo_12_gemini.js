import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { findNadkomplet } from "actions/findNadkomplet";

export function createArk_16_K_modulo_12(new_arkusze, new_legi, ilosc_arkuszy, ark, ilosc_leg_na_arkuszu, lega, nadkomplety, row) {

  let nr_arkusza = 0;
  let nr_legi = 0;

  // Funkcja pomocnicza - robi całą brudną robotę
  const dodajArkuszZLegami = (config = {}) => {
    nr_arkusza++;
    
    // Domyślne wartości lub nadpisanie z configu
    const { 
      rodzaj_arkusza, 
      rodzaj_legi,
      custom_ilosc_leg, 
      custom_naklad,
      custom_naklad_legi 
    } = config;

    const currentNaklad = custom_naklad || ark.naklad;
    const currentIloscLeg = custom_ilosc_leg || ilosc_leg_na_arkuszu;

    // 1. Dodaj Arkusz
    const arkuszId = getMaxID(new_arkusze);
    
    const nowyArkusz = {
      id: arkuszId,
      indeks: getMaxIndeks(new_arkusze.filter(x => x.element_id == row.id)),
      ...ark,
      nr_arkusza,
      ilosc_leg: currentIloscLeg,
      nadkomplet: findNadkomplet(nadkomplety, currentNaklad),
    };

    // Dodajemy pole rodzaj_arkusza tylko jeśli zostało podane (w pętli głównej go nie było)
    if (rodzaj_arkusza) nowyArkusz.rodzaj_arkusza = rodzaj_arkusza;
    // Nadpisujemy nakład jeśli był liczony niestandardowo
    if (custom_naklad) nowyArkusz.naklad = custom_naklad;

    new_arkusze.push(nowyArkusz);

    // 2. Dodaj Legi w pętli
    for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
      nr_legi++;
      
      const nowaLega = {
        id: getMaxID(new_legi),
        indeks: getMaxIndeks(new_legi),
        ...lega,
        nr_legi,
        arkusz_id: arkuszId,
      };

      if (rodzaj_legi) nowaLega.rodzaj_legi = rodzaj_legi;
      if (custom_naklad_legi) nowaLega.naklad = custom_naklad_legi;

      new_legi.push(nowaLega);
    }
  };


  // --- GLÓWNA LOGIKA ---

  // 1. Pętla główna (standardowe arkusze)
  for (let i = 0; i < ilosc_arkuszy - 2; i++) {
    dodajArkuszZLegami(); 
  }

  // Obliczenia pomocnicze dla czytelności (zamiast wklejać wzory w parametrach)
  const baseDivisor = lega.rodzaj_legi * ilosc_leg_na_arkuszu;

  // 2. Arkusz "czwórka" (dzielnik 4)
  const div4 = baseDivisor / 4;
  dodajArkuszZLegami({
    rodzaj_arkusza: 4,
    rodzaj_legi: 4,
    custom_ilosc_leg: div4,
    custom_naklad: Math.ceil(ark.naklad / div4),
    custom_naklad_legi: Math.ceil(ark.naklad / div4 * 4)
  });

  // 3. Arkusz "ósemka" (dzielnik 8)
  const div8 = baseDivisor / 8;
  dodajArkuszZLegami({
    rodzaj_arkusza: 8,
    rodzaj_legi: 8,
    custom_ilosc_leg: div8,
    custom_naklad: Math.ceil(ark.naklad / div8),
    custom_naklad_legi: Math.ceil(ark.naklad / div8 * 2)
  });

  // 4. Arkusz "szesnastka" (końcowy)
  dodajArkuszZLegami({
    rodzaj_arkusza: 16
    // Reszta parametrów jest standardowa jak w pętli głównej
  });

}