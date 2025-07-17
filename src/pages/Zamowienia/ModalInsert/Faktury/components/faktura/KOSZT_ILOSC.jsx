

import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./Faktura.module.css";
import DecodeToken from "pages/Login/DecodeToken";

export default function KOSZT_ILOSC({koszt}) {
    const contextModalInsert = useContext(ModalInsertContext);
    const handleKosztyDodatkoweZamowienia= contextModalInsert.handleKosztyDodatkoweZamowienia;
    const ksiegowosc= contextModalInsert.ksiegowosc;
    const setKsiegowosc= contextModalInsert.setKsiegowosc;
    
      return (
        <td>
          <input
            className={style.nazwa_input}
            type="text"
            value={koszt.ilosc}
            onChange={(event) => {

                const re2 = /^[0-9]+$/;
                // const re2 = /^\d{0,6}(?:\.\d{0,2}){0,1}$/;


              if (event.target.value === "" || re2.test(event.target.value)) {
                handleKosztyDodatkoweZamowienia({
                  ...koszt,
                  ilosc: event.target.value,
                  suma: (event.target.value * parseFloat( koszt.cena.replace(/,/g, '.'))).toFixed(2),

                  zmienil: DecodeToken(sessionStorage.getItem("token")).id,
                  update: true,
                });

                // zsumować koszty ale nie tu

               // setKsiegowosc({...ksiegowosc, koszty_wartosc: (event.target.value * parseFloat( koszt.cena.replace(/,/g, '.'))).toFixed(2), update:true})
              }
            }}
          ></input>
        </td>
      );
    }


