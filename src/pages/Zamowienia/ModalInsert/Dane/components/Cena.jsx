import style from "../Dane.module.css";
import { useContext, useState } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useHistoria } from "hooks/useHistoria";

export default function Cena() {
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia = contextModalInsert.setDaneZamowienia;
  const produkty = contextModalInsert.produkty;
const ksiegowosc = contextModalInsert.ksiegowosc;
  const [add] = useHistoria();
    const [valueIN, setValueIN] = useState(null);
  

  return (
    <div className={style.col}>
      <label className={style.label}> Cena szt. </label>
      <input
        className={style.input}
        type="text"
        title="Wartość / nakład"
        value={daneZamowienia.cena}
                onFocus={() => { setValueIN(daneZamowienia.cena); 
        }}
        onChange={(event) => {
          const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;
          if (event.target.value === "" || re.test(event.target.value)) {
            const cenaAsNumber = event.target.value
              ? Number(event.target.value.replace(",", "."))
              : 0;

              let text = `
              wartosc: ${(cenaAsNumber * produkty[0].naklad)} 
              koszty: ${parseFloat(ksiegowosc.koszty_wartosc) || 0}
              koszty + wartosc:  ${(cenaAsNumber * produkty[0].naklad) + (parseFloat(ksiegowosc.koszty_wartosc) || 0)} 
              naklad: ${produkty[0].naklad }
              cena : ${(( (cenaAsNumber * produkty[0].naklad) + (parseFloat(ksiegowosc.koszty_wartosc) || 0) )/ produkty[0].naklad ).toFixed(2)}
              `
              console.log(text)

              let wartosc_koncowa =(cenaAsNumber * produkty[0].naklad) + (parseFloat(ksiegowosc.koszty_wartosc) || 0)
              let skonto =((parseFloat(daneZamowienia.skonto) || 0) / 100 )

            setDaneZamowienia({
              ...daneZamowienia,
              cena: event.target.value,
              cena_z_kosztami: (( (cenaAsNumber  * produkty[0].naklad) + (parseFloat(ksiegowosc.koszty_wartosc) || 0) )/ produkty[0].naklad || 0).toFixed(2),
              wartosc_zamowienia: (cenaAsNumber * produkty[0].naklad).toFixed(2),
              wartosc_koncowa: (wartosc_koncowa - (wartosc_koncowa * skonto)).toFixed(2),
              status: daneZamowienia.stan == 3 ? 3 : daneZamowienia.status,
              update: true,

            });
          }
        }}

            onBlur={(e) => {
            // Zapisujemy czystą wartość po blur, do logiki historii, aby porównanie było poprawne
            const currentValue = e.target.value; 
            if (valueIN != currentValue) {
                add({
                    kategoria: "Cena ",
                    event:
                        " Zmiana ceny z " +
                        valueIN +
                        " na " +
                        currentValue +
                        " ",
                    zamowienie_id: daneZamowienia.id,
                });
            }
        }}
      ></input>
    </div>
  );
}
