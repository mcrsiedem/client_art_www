import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../KosztyDodatkowe.module.css";

export default function EdytujKoszty() {
    const contextApp = useContext(AppContext);
    const contextModalInsert = useContext(ModalInsertContext);
    // const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
    const kosztyDodatkoweZamowienia = contextModalInsert.kosztyDodatkoweZamowienia;
    const setKosztyDodatkoweZamowienia= contextModalInsert.setKosztyDodatkoweZamowienia;
      return (
        <button className={style.btn_edytuj}>Edytuj</button>
      );
    }