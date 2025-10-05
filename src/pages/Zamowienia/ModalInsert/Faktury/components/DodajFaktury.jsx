import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../Faktury.module.css";
import { useKosztyDodatkowe } from "hooks/useKosztyDodatkowe";

export default function DodajFaktury() {
    const contextApp = useContext(AppContext);
    const contextModalInsert = useContext(ModalInsertContext);
    // const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
    const ksiegowosc = contextModalInsert.ksiegowosc;
    const setKosztyDodatkoweZamowienia= contextModalInsert.setKosztyDodatkoweZamowienia;
      const [dodajKoszty,dodajFakture] = useKosztyDodatkowe();
    
      return (
          <div className={style.dodaj_koszty_td}>
                        <button
              className={style.btn_dodaj_koszty}
              onClick={() => {
              dodajFakture()
              }
                
                }
            >
              Nowa faktura
            </button>
          </div>

      );
    }