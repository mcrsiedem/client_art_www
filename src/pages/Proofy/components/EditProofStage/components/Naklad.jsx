import React, { useEffect, useState, useContext, useRef } from "react";
import style from "../EditProof.module.css";


import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";

import { _typ_elementu, reg_int } from "utils/initialvalue";

export default function  Naklad ({ row }) {

    // rowProcesProduktTemporary

  const contexModal = useContext(ModalInsertContext);
  const CONTEXT_MODAL = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);
  // daneTechEdit = JSON.parse(JSON.stringify(daneTech))
  const procesListEdit = JSON.parse(JSON.stringify(contexApp.procesList))
  const procesList = contexApp.procesList;
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


