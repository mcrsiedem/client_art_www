import { formatujDatePoPolsku } from "actions/formatujDatePoPolsku";
import style from "../ProcesViewRow.module.css";

export default function Narzady ({ grup }) {


  return (
   <td className={style.td_tableProcesy_przeloty}>{grup.ilosc_narzadow} </td>
  );
};


