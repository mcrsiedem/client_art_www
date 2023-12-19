// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementTable.module.css";
import { _papiery } from "../../api";
import ElementTableHeader from "./ElementTableHeader";
import ElementTableCenter from "./ElementTableCenter";
import { useState } from "react";
import Logo_ustawienia from "../../../../../svg/settings.svg";



export default function ElementTable({elementy,setElementy,handleChangeCardElementy,
  selected_papier,setSelected_papier,fragmenty,setFragmenty,
info,setInfo,listaWykonczen,setListaWykonczen,listaPapierow,listaGramatur,setListaGramatur,isEdit,setIsEdit,procesyElementow,setProcesyElementow,listaDostepnychProcesow}) {

  return (
    <div className={style.elementCard}>
      <ElementTableHeader
        // card={card}
        elementy={elementy}
        setElementy={setElementy}
        fragmenty={fragmenty}
        setFragmenty={setFragmenty}
      />
      <ElementTableCenter/>

    </div>
  );
}


