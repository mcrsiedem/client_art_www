import React, { useContext  } from "react";
import style from "../EditProof.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
export default function  Info  ({ row }) {
  // const contexModal = useContext(ModalInsertContext);
  // const handleUpdateRowProcesyElementow = contexModal.handleUpdateRowProcesyElementow;
    const CONTEXT_MODAL = useContext(ModalInsertContext);
  
  return (
    <td>
      <input
      className={style.input_opis}
        value={row.info}
        onChange={(e) => {
    
          CONTEXT_MODAL.setProcesyProduktowTemporary((prev) =>
            prev.map((proces) =>
              proces.id === row.id
                ? {
                    ...row,
                    info:e.target.value,
                    update: true,
                    historia: false,
                    id: row.id,
                  }
                : proces
            )
          );
        
        }}
      ></input>
    </td>
  );
}

