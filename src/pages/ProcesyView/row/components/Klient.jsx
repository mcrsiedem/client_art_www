import style from "../ProcesViewRow.module.css";

export default function Klient ({ grup }) {


  return (
   <td className={style.td_tableProcesy_klient}>{grup.klient}</td>
  );
};


