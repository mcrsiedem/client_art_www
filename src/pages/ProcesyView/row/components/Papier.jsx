import style from "../ProcesViewRow.module.css";

import iconRolka from "assets/rolka.svg";
import iconRolkaRed from "assets/rolkaRed.svg";
import iconArkusz from "assets/sheet2.svg";
import iconArkuszRed from "assets/sheet2red.svg";

export default function Papier ({ grup }){
const dyspersja = [2,3,5,6,12,13]
const uv = [15,17]

if(grup.papier_postac_id == 2 && grup.typ_grupy !=1 )

return(
                    <td title={grup.powleczenie+" Bulk:"+grup.bulk} className={style.td_tableProcesy_papier}><img
    className={style.icon_rolka}
     src={ grup.papier_info == "" ? iconRolka:iconRolkaRed}
     title={"Rolka "+grup.papier_info}
    />  { grup.arkusz_szerokosc+"x"+grup.arkusz_wysokosc+" "+grup.nazwa_papieru+ " "+grup.gramatura+" "+grup.wykonczenie}</td>
)


if(grup.papier_postac_id == 1 && grup.typ_grupy !=1 )

return(
                    <td title={grup.powleczenie+" Bulk:"+grup.bulk} className={style.td_tableProcesy_papier}> <img
    className={style.icon_rolka}
     src={ grup.papier_info == "" ? iconArkusz:iconArkuszRed}
     title={"Arkusz "+grup.papier_info}
    />  { grup.arkusz_szerokosc+"x"+grup.arkusz_wysokosc+" "+grup.nazwa_papieru+ " "+grup.gramatura+" "+grup.wykonczenie}</td>
)
 
 
};