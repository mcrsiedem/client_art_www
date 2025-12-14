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
const ksiegowosc = contextModalInsert.ksiegowosc;

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
            const wartoscAsNumber = daneZamowienia.cena
              ? parseFloat(daneZamowienia.cena.replace(",", "."))
              : 0;
            handleUpdateRowProdukty({
              ...produkty[0],
              naklad: e.target.value,
              update: true,
            });


              let wartosc_zamowienia =(wartoscAsNumber * parseInt(e.target.value || 0)).toFixed(2)
              let status = daneZamowienia.stan == 3 ? 3 : daneZamowienia.status;
              let cena_z_kosztami = (((parseFloat(e.target.value) * wartoscAsNumber) + (parseFloat(ksiegowosc.koszty_wartosc) || 0)) / parseFloat(e.target.value) || 0).toFixed(2) 
              let skonto =((parseFloat(daneZamowienia.skonto) || 0) / 100 )
              let wartosc_koncowa =(parseFloat(daneZamowienia.cena.replace(",", ".") || 0) * parseFloat(e.target.value) || 0) + (parseFloat(ksiegowosc.koszty_wartosc) || 0)

            setDaneZamowienia({
              ...daneZamowienia,
              wartosc_zamowienia,
              cena_z_kosztami,
              wartosc_koncowa: (wartosc_koncowa - (wartosc_koncowa * skonto)).toFixed(2),
              status,
              update: true,
            }); // czemu to nie działa?
          }
        }}
      ></input>
    </div>
  );
}
