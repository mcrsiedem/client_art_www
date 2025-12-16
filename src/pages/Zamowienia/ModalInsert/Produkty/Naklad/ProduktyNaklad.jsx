import { useContext, useState } from "react";
import style from "./ProduktyNaklad.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useStatus } from "hooks/useStatus";
import { _typ_elementu, reg_int } from "utils/initialvalue";
import { useHistoria } from "hooks/useHistoria";
export default function ProduktyNaklad({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  const [setStatus] = useStatus();
  const [add] = useHistoria();
  const [valueIN, setValueIN] = useState(null);
  const daneZamowienia = contextModalInsert.daneZamowienia;

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Nakład </label>
      <input
        className={style.input}
        value={row?.naklad}
        onFocus={() => {
          setValueIN(row.naklad);
        }}
        onBlur={(e) => {
          if (valueIN != e.target.value) {
            add({
              kategoria: "Naklad",
              event:
                " Produkt - zmiana nakladu z " +
                valueIN +
                " na " +
                e.target.value +
                " szt. ",
              zamowienie_id: daneZamowienia.id,
            });
          }
        }}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowProdukty({
              ...row,
              naklad: e.target.value,
              update: true,
            });
            setStatus(3);
          }
        }}
      ></input>
    </div>
  );
}
