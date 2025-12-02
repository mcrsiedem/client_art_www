import { formatujDatePoPolsku } from "actions/formatujDatePoPolsku";
import style from "../ProcesViewRow.module.css";

export default function NaswietleniaIlosc ({ grup }) {


  return (
   <td className={style.td_tableProcesy_przeloty}>{grup.naswietlenia || "-"} </td>
  );
};


