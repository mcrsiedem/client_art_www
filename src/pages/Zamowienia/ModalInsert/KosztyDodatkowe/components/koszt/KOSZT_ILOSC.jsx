

import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./Koszt.module.css";
import DecodeToken from "pages/Login/DecodeToken";

export default function KOSZT_ILOSC({koszt}) {
    const contextModalInsert = useContext(ModalInsertContext);
    const handleKosztyDodatkoweZamowienia= contextModalInsert.handleKosztyDodatkoweZamowienia;
    
      return (
        <td>
          <input
            className={style.nazwa_input}
            type="text"
            value={koszt.ilosc}
            onChange={(event) => {

                const re2 = /^[0-9]+$/;

              if (event.target.value === "" || re2.test(event.target.value)) {
                handleKosztyDodatkoweZamowienia({
                  ...koszt,
                  ilosc: event.target.value,
                  zmienil: DecodeToken(sessionStorage.getItem("token")).id,
                  update: true,
                });
              }
            }}
          ></input>
        </td>
      );
    }


