import axios from "axios";

import { IP } from "../utils/Host";

export function createArkusze(row, arkusze, setArkusze) {
  const rodzaj_arkusza = 16;

  const new_arkusze = [];

  const ilosc_arkuszy = row.ilosc_stron / 16;
  const modulo = row.ilosc_stron % 16

  const ark = {
    typ_elementu: row.typ,
    rodzaj_arkusza,
    naklad: row.naklad,
    element_id: row.id,
    ilosc_stron: row.ilosc_stron,
  };

    if (modulo == 0) {
      for (let i = 0; i < ilosc_arkuszy; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
        });
      }
    }

    if (modulo == 2) {
      for (let i = 0; i < ilosc_arkuszy - 2; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
        });
      }

      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 2,
      });

      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
      });
}

if (modulo == 4) {
  for (let i = 0; i < ilosc_arkuszy - 2; i++) {
    new_arkusze.push({
      id: i + 1,
      indeks: i + 1,
      ...ark,
    });
  }

  new_arkusze.push({
    id: generateMaxID(new_arkusze),
    indeks: generateMaxIndeks(new_arkusze),
    ...ark,
    rodzaj_arkusza: 4,
  });

  new_arkusze.push({
    id: generateMaxID(new_arkusze),
    indeks: generateMaxIndeks(new_arkusze),
    ...ark,
    rodzaj_arkusza: 16,
  });
}


if (modulo == 6) {
  for (let i = 0; i < ilosc_arkuszy - 2; i++) {
    new_arkusze.push({
      id: i + 1,
      indeks: i + 1,
      ...ark,
    });
  }

  new_arkusze.push({
    id: generateMaxID(new_arkusze),
    indeks: generateMaxIndeks(new_arkusze),
    ...ark,
    rodzaj_arkusza: 2,
  });
  new_arkusze.push({
    id: generateMaxID(new_arkusze),
    indeks: generateMaxIndeks(new_arkusze),
    ...ark,
    rodzaj_arkusza: 4,
  });

  new_arkusze.push({
    id: generateMaxID(new_arkusze),
    indeks: generateMaxIndeks(new_arkusze),
    ...ark,
    rodzaj_arkusza: 16,
  });
}

    if (modulo == 8) {
              for (let i = 0; i < ilosc_arkuszy - 2; i++) {
                new_arkusze.push({
                  id: i + 1,
                  indeks: i + 1,
                  ...ark,
                });
              }

              new_arkusze.push({
                id: generateMaxID(new_arkusze),
                indeks: generateMaxIndeks(new_arkusze),
                ...ark,
                rodzaj_arkusza: 8,
              });

              new_arkusze.push({
                id: generateMaxID(new_arkusze),
                indeks: generateMaxIndeks(new_arkusze),
                ...ark,
                rodzaj_arkusza: 16,
              });
    }


    if (modulo == 10) {
      for (let i = 0; i < ilosc_arkuszy - 2; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
        });
      }
    
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 2,
      });
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 8,
      });
    
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
      });
    }

    if (modulo == 12) {
      for (let i = 0; i < ilosc_arkuszy - 2; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
        });
      }
    
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 4,
      });
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 8,
      });
    
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
      });
    }


    if (modulo == 14) {
      for (let i = 0; i < ilosc_arkuszy - 2; i++) {
        new_arkusze.push({
          id: i + 1,
          indeks: i + 1,
          ...ark,
        });
      }
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 2,
      });
    
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 4,
      });
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 8,
      });
    
      new_arkusze.push({
        id: generateMaxID(new_arkusze),
        indeks: generateMaxIndeks(new_arkusze),
        ...ark,
        rodzaj_arkusza: 16,
      });
    }

  setArkusze(new_arkusze);

}

const generateMaxID = (kosztyDodatkoweTemporary) => {
  let maxID = null;
  if (kosztyDodatkoweTemporary.length == 0) return (maxID = 1);
  maxID = Math.max(...kosztyDodatkoweTemporary.map((f) => f.id)) + 1;

  return maxID;
};

const generateMaxIndeks = (kosztyDodatkoweTemporary) => {
  let maxIndeks = null;
  if (kosztyDodatkoweTemporary.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...kosztyDodatkoweTemporary.map((f) => f.indeks)) + 1;

  return maxIndeks;
};
