import React, {  } from "react";


import { _etap_plikow, _status_wydania_papieru, _typ_elementu } from "utils/initialvalue";
import style from "../ProcesViewRow.module.css";
import { _status } from "utils/initialvalue";




export default function DyspersjaGrupa ({ grup }) {
const dyspersja = [2,3,5,6,12,13]
const uv = [15,17]


if(uv.includes(parseInt(grup.global_proces_id)))
{
   return (
    <td title="Klisza" className={style.td_tableProcesy_dyspersja}>K </td>)

   }

if(dyspersja.includes(parseInt(grup.global_proces_id)))
{
   return (
    <td title="Dyspersja" className={style.td_tableProcesy_nr_stary}>D </td>)

}else {
  return( <td className={style.td_tableProcesy_nr_stary}> </td>)
}
 
 
};