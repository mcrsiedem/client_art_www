import axios from "axios";

import { IP } from "../utils/Host";
import DecodeToken from "pages/Login/DecodeToken";


export function formatujDatePoPolsku(dataString) {
  const data = new Date(dataString);
  const dzien = data.getDate();
  const nazwyMiesiecyPolskie = [
    "sty", "lut", "mar", "kwi", "maj", "cze",
    "lip", "sie", "wrz", "paź", "lis", "gru"
  ];
  const miesiac = nazwyMiesiecyPolskie[data.getMonth()];

  return `${dzien} ${miesiac}`;
}