import axios from "axios";

import { IP } from "../utils/Host";
import DecodeToken from "pages/Login/DecodeToken";


export function formatujDateZGodzinaICalyDniemTygodniaPoPolsku(dataString) {
  const data = new Date(dataString);
  const dzien = data.getDate();
  
  const nazwyMiesiecyPolskie = [
    "sty", "lut", "mar", "kwi", "maj", "cze",
    "lip", "sie", "wrz", "paź", "lis", "gru"
  ];
  const miesiac = nazwyMiesiecyPolskie[data.getMonth()];

  const skrotyDniTygodniaPolskie = [
    "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"
  ];
  const dzienTygodniaSkrot = skrotyDniTygodniaPolskie[data.getDay()]; // getDay() zwraca 0 dla niedzieli

  const godziny = String(data.getHours()).padStart(2, '0');
  const minuty = String(data.getMinutes()).padStart(2, '0');

  // return ` ${dzien} ${miesiac} ${godziny}:${minuty} ${dzienTygodniaSkrot} `;
  return `${dzienTygodniaSkrot} `;
}