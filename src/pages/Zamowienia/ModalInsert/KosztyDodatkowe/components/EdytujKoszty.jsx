import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../KosztyDodatkowe.module.css";

export default function EdytujKoszty() {
    const contextApp = useContext(AppContext);
    const contextModalInsert = useContext(ModalInsertContext);
    // const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
    const kosztyDodatkoweZamowienia = contextModalInsert.kosztyDodatkoweZamowienia;
    const kosztyDodatkowe = contextModalInsert.kosztyDodatkowe;

    const setKosztyDodatkoweZamowienia= contextModalInsert.setKosztyDodatkoweZamowienia;
      return (
        <button className={style.btn_edytuj}
        onClick={() => {
          contextModalInsert.setShowKosztyDodatkoweEdit(true);
          contextModalInsert.setSelecetedKosztyDodatkoweZamowienia({id:kosztyDodatkoweZamowienia[0].id,zamowienie_id:kosztyDodatkoweZamowienia[0].zamowienie_id,zamowienie_prime_id:kosztyDodatkoweZamowienia[0].zamowienie_prime_id})
          //kopia procesów do procesyElementowTemporary, aby mozna bylo zamknąć bez zapisywania
          contextModalInsert.setKosztyDodatkoweTemporary(kosztyDodatkowe)
          // console.log("typ: ",row)
        }}
        >Edytuj</button>
      );
    }