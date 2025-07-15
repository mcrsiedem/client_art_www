

import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./Koszt.module.css";
import DecodeToken from "pages/Login/DecodeToken";

export default function KOSZT_CENA({koszt}) {
    const contextModalInsert = useContext(ModalInsertContext);
    const handleKosztyDodatkoweZamowienia= contextModalInsert.handleKosztyDodatkoweZamowienia;
    
      return (
        <td>
          <input
            className={style.nazwa_input}
            type="text"
            value={koszt.cena}
            onChange={(event) => {

                const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

              if (event.target.value === "" || re.test(event.target.value)) {
                handleKosztyDodatkoweZamowienia({
                  ...koszt,
                  cena: event.target.value,
                  zmienil: DecodeToken(sessionStorage.getItem("token")).id,
                  update: true,
                });
              }
            }}
          ></input>
        </td>
      );
    }


