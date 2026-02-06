import { useContext, useState } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../KosztyDodatkowe.module.css";
import { getNameStatus } from "actions/getNameStatus";
import { useHistoria } from "hooks/useHistoria";
import { _waluta } from "utils/initialvalue";
import { useKosztyDodatkowe } from "hooks/useKosztyDodatkowe";

export default function ImportujKoszty() {
  const contextApp = useContext(AppContext);
  const contextModalInsert = useContext(ModalInsertContext);
  const ksiegowosc = contextModalInsert.ksiegowosc;
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setKsiegowosc = contextModalInsert.setKsiegowosc;
  const _status_koszty_dodatkowe = contextApp._status_koszty_dodatkowe;
  const kosztyDodatkoweZamowienia =
    contextModalInsert.kosztyDodatkoweZamowienia;

  const [add] = useHistoria();
        const {importKosztyDodatkowwe} = useKosztyDodatkowe();
  

  const copyToClipboard = () => {

  };

   const [nr, setNr] = useState();
   const [rok, setRok] = useState();

  return (
    <div className={style.importuj_koszty}>
      <button
        className={style.btn_kopiuj_koszty}
        onClick={() => {
          importKosztyDodatkowwe(nr, rok);
        }}
      >
        Importuj koszty
      </button>


      <div  className={style.btn_nr_rok_container}>

      <div className={style.col}>
        <input
          className={style.input_nr_rok}
          placeholder="nr"
          type="text"
          title="Numer zamówienia"
          value={nr}
                             onChange={(event) => {

              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setNr(event.target.value);
               
              }
            }} 
        ></input>
      </div>

            <div className={style.col}>
        {/* <label className={style.label_nr_rok}> ROK </label> */}
        <input
          className={style.input_nr_rok}
          placeholder="rok"
          type="text"
          title="Numer zamówienia"
          value={rok}
                  onChange={(event) => {

              const re = /^[0-9]+$/;
              if (event.target.value === '' || re.test(event.target.value)) {
              setRok(event.target.value);
               
              }
            }}
        ></input>
      </div>


      </div>



    </div>
  );
}
