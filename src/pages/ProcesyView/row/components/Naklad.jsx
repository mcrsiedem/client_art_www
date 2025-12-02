import style from "../ProcesViewRow.module.css";

export default function Naklad ({ grup }) {


  return (
   <td className={style.td_tableProcesy_przeloty}>{grup.naklad} </td>
  );
};


