import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./Faktura.module.css";
import DecodeToken from "pages/Login/DecodeToken";

export default function FAKTURA_NAZWA2({faktura}) {
    const contextModalInsert = useContext(ModalInsertContext);
    const handleKosztyDodatkoweZamowienia= contextModalInsert.handleKosztyDodatkoweZamowienia;
    const handleFaktury= contextModalInsert.handleFaktury;

      return (
        <td>
          <input
            className={style.nazwa_input}
            type="text"
            value={faktura.nazwa}
            onChange={(event) => {
              const re =
                /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ.-/-ŠšŽžČčĐđ,!:]+$/;
              if (event.target.value === "" || re.test(event.target.value)) {
                handleFaktury({
                  ...faktura,
                  nazwa: event.target.value,
                  zmienil: DecodeToken(sessionStorage.getItem("token")).id,
                  update: true,
                });
              }
            }}
          ></input>
        </td>
      );
    }


