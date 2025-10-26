import React, { useEffect, useState, useContext, useRef } from "react";
import style from "../ProcesProdukt.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { _typ_elementu, reg_int } from "utils/initialvalue";

export default function Indeks ({ row }) {
      const CONTEXT_MODAL = useContext(ModalInsertContext);
  
  return (
    <td>
      <input
      className={style.select_indeks}
        value={row.indeks}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
          CONTEXT_MODAL.setProcesyProduktowTemporary((prev) =>
            prev.map((proces) =>
              proces.id === row.id
                ? {
                    ...row,
                    indeks:e.target.value,
                    update: true,
                    historia: false,
                    id: row.id,
                  }
                : proces
            )
          );
          }
        }}
      ></input>
    </td>
  );
}

