import { formatujDatePoPolsku } from "actions/formatujDatePoPolsku";
import style from "../ProcesViewRow.module.css";

export default function Spedycja ({ grup }) {


  return (
   <td className={style.td_tableProcesy_spedycja}>{formatujDatePoPolsku( grup.data_spedycji)}</td>
  );
};


