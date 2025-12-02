import style from "../ProcesViewRow.module.css";


export default function Koniec ({ grup }) {


  return (
<td className={style.td_tableProcesy_koniec}>{grup.koniec}</td>
  );
};


