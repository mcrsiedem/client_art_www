import React, {  } from "react";
import style from "./TABLE_ROW_ZAMOWIENIA.module.css";
import {
  _etapy_produkcji,
  _stan_dokumentu,
  _status_dokumentu,
} from "utils/initialvalue";

export default function Klient ({ row })  {
  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.klient}
      className={style.firma_nazwa}
      value={row.klient}
      readOnly

    />
    </td>
   
  );
};
