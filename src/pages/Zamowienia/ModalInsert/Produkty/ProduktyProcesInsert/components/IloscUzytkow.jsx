import React, { useEffect, useState, useContext, useRef } from "react";
import style from "../ProcesProdukt.module.css";


import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";

import { _typ_elementu, reg_int } from "utils/initialvalue";

export default function  IloscUzytkow ({ row }) {

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
      className={style.input_ilosc_uzytkow}
        value={row.ilosc_uzytkow}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
  
          CONTEXT_MODAL.setProcesyProduktowTemporary((prev) =>
            prev.map((proces) =>
              proces.id === row.id
                ? {
                    ...row,
                    ilosc_uzytkow:e.target.value,
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


