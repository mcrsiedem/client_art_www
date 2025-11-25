import style from "../ProcesViewRow.module.css";
import { useState } from "react"; 
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import Kalendarz from "./Kalendarz";

export default function Czas ({ grup }) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <td
      className={style.td_tableProcesy_czas}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
    >
      {isHovered ? (<Kalendarz grup={grup}/>) : ( zamienNaGodziny(grup.czas)) }
    </td>
  );
};


