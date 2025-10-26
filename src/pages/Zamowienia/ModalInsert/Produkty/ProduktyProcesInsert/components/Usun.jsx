import React, { useEffect, useState, useContext, useRef } from "react";
import style from "../ProcesProdukt.module.css";

import iconTrash from "assets/trash2.svg";
import { ModalInsertContext } from "context/ModalInsertContext";
import { _typ_elementu, reg_int } from "utils/initialvalue";
import { useHistoria } from "hooks/useHistoria";
export default function Usun({ row}) {
  const contexModal = useContext(ModalInsertContext);
  const procesyElementowTemporary = contexModal.procesyElementowTemporary;
  const setProcesyElementowTemporary = contexModal.setProcesyElementowTemporary;
    const [add] = useHistoria()
  return (
    <td className={style.col_button}>
      <div>
        <img
          className={style.expand}
          src={iconTrash}
          onClick={() => {

            if(row.zamowienie_id == 1){
              setProcesyElementowTemporary(procesyElementowTemporary.filter((p) => p.id !== row.id));

            }else{
           setProcesyElementowTemporary((prev) =>
              prev.map((t, a) => {
                if (t.id == row.id) {
                  return {
                    ...t,
                    delete: true
                  };
                } else {
                  return t;
                }
              })
            );

      

            }
          
 
      
          }}
          alt="Procesy"
        />
      </div>
    </td>
  );
}