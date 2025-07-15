import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./Koszt.module.css";
import DecodeToken from "pages/Login/DecodeToken";

export default function KOSZT_UWAGI({koszt}) {
    const contextModalInsert = useContext(ModalInsertContext);
    const handleKosztyDodatkoweZamowienia= contextModalInsert.handleKosztyDodatkoweZamowienia;
    
      return (
        <td>
          <input
            className={style.nazwa_input}
            type="text"
            value={koszt.info}
            onChange={(event) => {
              const re =
                /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ.-/-ŠšŽžČčĐđ,!:]+$/;
              if (event.target.value === "" || re.test(event.target.value)) {
                handleKosztyDodatkoweZamowienia({
                  ...koszt,
                  info: event.target.value,
                  zmienil: DecodeToken(sessionStorage.getItem("token")).id,
                  update: true,
                });
              }
            }}
          ></input>
        </td>
      );
    }


