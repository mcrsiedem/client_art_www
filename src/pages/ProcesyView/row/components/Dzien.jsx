import { formatujDateZGodzinaIDniemTygodniaPoPolsku } from "actions/formatujDateZGodzinaIDniemTygodniaPoPolsku";
import style from "../ProcesViewRow.module.css";
import { druk_alert } from "actions/druk_alert";


export default function Dzien ({ grup,style }) {


  return (
                  <td className={druk_alert(grup) ? style.td_tableProcesy_poczatek_alert_dzien: style.td_tableProcesy_poczatek_dzien}>{formatujDateZGodzinaIDniemTygodniaPoPolsku(grup.poczatek)}</td>

  );
};


