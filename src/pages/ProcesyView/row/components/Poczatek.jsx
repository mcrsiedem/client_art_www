import style from "../ProcesViewRow.module.css";


export default function Poczatek ({ grup }) {


  return (
<td className={style.td_tableProcesy_poczatek}>{grup.poczatek}</td>
  );
};


