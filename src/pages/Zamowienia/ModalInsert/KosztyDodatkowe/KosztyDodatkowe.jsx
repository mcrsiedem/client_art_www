import style from "./KosztyDodatkowe.module.css";
import TableKoszty from "./components/TableKoszty";
import { ModalInsertContext } from "context/ModalInsertContext";
import React, { useContext } from "react";
import { useKosztyDodatkowe } from "hooks/useKosztyDodatkowe";
export default function KosztyDodatkowe({ handleChangeCardPakowanie }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const kosztyDodatkoweZamowienia =
    contextModalInsert.kosztyDodatkoweZamowienia;

  const showTabs = contextModalInsert.showTabs;

  const [dodajKoszty] = useKosztyDodatkowe();
  if (showTabs.koszty) {
    if (kosztyDodatkoweZamowienia.length == 0) {
      return (
        <>
          <div className={style.container2}>
            <button
              className={style.btn_dodaj_koszty}
              onClick={() => dodajKoszty()}
            >
              Dodaj koszty dodatkowe
            </button>
          </div>
        </>
      );
    }
    return (
      <div className={style.container}>
        <div className={style.pakowanie}>
          <TableKoszty />
        </div>
      </div>
    );
  }
}
