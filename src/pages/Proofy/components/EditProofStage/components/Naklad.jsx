import React, { useContext } from "react";
import style from "../EditProof.module.css";


import { ModalInsertContext } from "context/ModalInsertContext";

import {  reg_int } from "utils/initialvalue";

export default function  Naklad ({ row }) {

    // rowProcesProduktTemporary

  const CONTEXT_MODAL = useContext(ModalInsertContext);
  // daneTechEdit = JSON.parse(JSON.stringify(daneTech))
  return (
    <td>
<input
      className={style.input_naklad}
        value={row.naklad}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
  
          CONTEXT_MODAL.setProcesyProduktowTemporary((prev) =>
            prev.map((proces) =>
              proces.id === row.id
                ? {
                    ...row,
                    naklad:e.target.value,
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
};


