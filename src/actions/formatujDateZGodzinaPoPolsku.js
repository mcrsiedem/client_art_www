import axios from "axios";

import { IP } from "../utils/Host";
import DecodeToken from "pages/Login/DecodeToken";


export function formatujDateZGodzinaPoPolsku(dataString) {
  const data = new Date(dataString);
  const dzien = data.getDate();
  const nazwyMiesiecyPolskie = [
    "sty", "lut", "mar", "kwi", "maj", "cze",
    "lip", "sie", "wrz", "paź", "lis", "gru"
  ];
  const miesiac = nazwyMiesiecyPolskie[data.getMonth()];

  // Pobierz godzinę i minuty i upewnij się, że mają dwie cyfry (np. 09 zamiast 9)
  const godziny = String(data.getHours()).padStart(2, '0');
  const minuty = String(data.getMinutes()).padStart(2, '0');

  return `${dzien} ${miesiac} ${godziny}:${minuty}`;
}