import style from "../ProcesViewRow.module.css";

export default function Nr ({ grup }) {


  return (
   <td className={style.td_tableProcesy_nr}>{grup.nr} / {grup.rok?.substring(2,4)}</td>
  );
};


