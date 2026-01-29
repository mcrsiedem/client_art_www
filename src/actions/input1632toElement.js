import axios from "axios";

import { IP } from "../utils/Host";

export function input1632toElement(rodzaj_legi, elementyTech, setElementyTech) {
  setElementyTech(
    elementyTech.map((t) => {
      if (rodzaj_legi == 12) {
        if (t.typ == 1) {
          return { ...t, lega: 4, ilosc_leg: 4, lega_mnoznik:4 };
        }
        if (t.typ == 2) {
          return { ...t, lega: 12, ilosc_leg: 1, lega_mnoznik:1 };
        } else {
          return t;
        }
      }

      if (rodzaj_legi == 16) {
        if (t.typ == 1) {
          return { ...t, lega: 4, ilosc_leg: 4, lega_mnoznik:4 };
        }
        if (t.typ == 2) {
          return { ...t, lega: 16, ilosc_leg: 1, lega_mnoznik:1 };
        } else {
          return t;
        }
      }

      if (rodzaj_legi == 24) {
        if (t.typ == 1) {
          return { ...t, lega: 4, ilosc_leg: 4, lega_mnoznik:4 };
        }
        if (t.typ == 2) {
          return { ...t, lega: 24, ilosc_leg: 1 , lega_mnoznik:1};
        } else {
          return t;
        }
      }

      if (rodzaj_legi == 32) {
        if (t.typ == 1) {
          return { ...t, lega: 4, ilosc_leg: 4, lega_mnoznik:4 };
        }
        if (t.typ == 2) {
          return { ...t, lega: 32, ilosc_leg: 1, lega_mnoznik:1 };
        } else {
          return t;
        }
      }


      if (rodzaj_legi == 2) {
 
          return { ...t, lega: t.ilosc_stron, ilosc_leg: 1 };
 
      }



    })
  );
}
