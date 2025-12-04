import style from "../Dane.module.css";
import { useContext, useState} from "react";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status_dokumentu,_stan_dokumentu,_vat,_waluta,_rodzaj,_fsc, _etapy_produkcji, reg_int } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useHistoria } from "hooks/useHistoria";


import { useStatus } from "hooks/useStatus";
export default function NAKLAD() {
  const contextModalInsert = useContext(ModalInsertContext);
  const produkty = contextModalInsert.produkty;
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  const [setStatus] = useStatus();
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia = contextModalInsert.setDaneZamowienia;
  const [add] = useHistoria();
  const [valueIN, setValueIN] = useState(null);

  return (
    <div className={style.col}>
      <label className={style.label}> Nakład </label>
      <input
        className={style.input}
        type="text"
        // disabled
        title="Nakład dodaj w parametrach"
        // value={produkty[0].naklad.toLocaleString()}
        value={produkty[0].naklad}
        onFocus={() => {
          setValueIN(produkty[0].naklad);
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
            const wartoscAsNumber = daneZamowienia.cena ? parseFloat(daneZamowienia.cena.replace(',', '.')) : 0;
            handleUpdateRowProdukty({
              ...produkty[0],
              naklad: e.target.value,
              update: true,
            }
          );



        setDaneZamowienia({...daneZamowienia, wartosc_zamowienia:(wartoscAsNumber*parseInt(e.target.value || 0)).toFixed(2) , status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true}); // czemu to nie działa?


   
          }
        }}
      ></input>
    </div>
  );
}
