import style from "../ProcesViewRow.module.css";

export default function Element ({ grup,selectedProces,procesList,typ_elementu }) {


  return (
                     <td className={style.td_tableProcesy_nr_stary}>{selectedProces==3? grup.rodzaj_procesu+" "+procesList?.filter(x => x.id == grup.oprawa_produktu)[0]?.typ.substring(0,1):typ_elementu?.filter(x => x.id == grup.typ_elementu)[0]?.skrot  } </td>

  );
};


