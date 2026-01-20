import React, { useContext } from "react";
import style from "../EditProof.module.css";

import iconTrash from "assets/trash2.svg";
import { ModalInsertContext } from "context/ModalInsertContext";
export default function Usun({ row}) {



      const CONTEXT_MODAL = useContext(ModalInsertContext);
    
  return (
    <td className={style.col_button}>
      <div>
        <img
          className={style.expand}
          src={iconTrash}
          onClick={() => {

            if(row.zamowienie_id === 1){
              CONTEXT_MODAL.setProcesyProduktowTemporary(CONTEXT_MODAL.procesyProduktowTemporary.filter((p) => p.id !== row.id));



            }else{
          CONTEXT_MODAL.setProcesyProduktowTemporary((prev) =>
            prev.map((proces) =>
              proces.id === row.id
                ? {
                    ...row,
                    delete: true,
                    historia: false,
                    id: row.id,
                  }
                : proces
            )
          );
        

      

            }
          
 
      
          }}
          alt="Procesy"
        />
      </div>
    </td>
  );
}