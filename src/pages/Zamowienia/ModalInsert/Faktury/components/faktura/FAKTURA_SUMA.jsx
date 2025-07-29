

import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./Faktura.module.css";
import DecodeToken from "pages/Login/DecodeToken";

export default function FAKTURA_SUMA({faktura}) {
    const contextModalInsert = useContext(ModalInsertContext);
    const handleKosztyDodatkoweZamowienia= contextModalInsert.handleKosztyDodatkoweZamowienia;
    const handleFaktury= contextModalInsert.handleFaktury;

    
      return (
        <td>
          <input
            className={style.nazwa_input}
            type="text"
            value={faktura.suma}
            onChange={(event) => {


              const re =  /^\d{0,6}(?:[.,]\d{0,2}){0,1}$/

              if (event.target.value === "" || re.test(event.target.value)) {
                handleFaktury({
                  ...faktura,
                  suma: event.target.value,
                  cena: (event.target.value.replace(/,/g, '.') / faktura.ilosc).toFixed(2),
                  zmienil: DecodeToken(sessionStorage.getItem("token")).id,
                  update: true,
                });
              }
            }}
          ></input>
        </td>
      );
    }


