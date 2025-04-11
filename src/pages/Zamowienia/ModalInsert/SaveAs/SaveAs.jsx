import { useContext} from "react";
import style from "../SaveAs/SaveAs.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import { useZamowienieZapisz } from "hooks/useZamowienieZapisz";

export default function SaveAs({showSaveAs,setShowSaveAs,setSaveAs,dialogBox}) {
//   useEffect(() => {}, []);
const contextModal = useContext(ModalInsertContext);

  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const isSaveButtonDisabled = contextModalInsert.isSaveButtonDisabled;
  const produkty= contextModalInsert.produkty;
  // const daneZamowienia= contextModalInsert.daneZamowienia;
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
  const elementy= contextModalInsert.elementy;
  const fragmenty= contextModalInsert.fragmenty;
  const oprawa= contextModalInsert.oprawa;
  const setProdukty= contextModalInsert.setProdukty;
  const setElementy= contextModalInsert.setElementy;
  const setFragmenty= contextModalInsert.setFragmenty;
  const setOprawa= contextModalInsert.setOprawa;
  const setProcesyElementow= contextModalInsert.setProcesyElementow;
  const procesyElementow= contextModalInsert.procesyElementow;

  const contextApp = useContext(AppContext);
  const setZamowienia = contextApp.setZamowienia
  const setZamowieniaWyszukiwarka = contextApp.setZamowieniaWyszukiwarka
    const [zapiszZamowienie] = useZamowienieZapisz();
    if(showSaveAs){
        return (
    <div className={style.insertContainer}>
      <div className={style.saveas}>

      <Header />

      <Tytul
    
        setSaveAs={setSaveAs}
      />

      <div className={style.center}></div>

            <div className={style.row}>

                    <button
                    className={style.btn}
                    onClick={() => {
                    setShowSaveAs(!showSaveAs)
                    setSaveAs(false)
                    }}
                    >
                    Anuluj
                    </button>
                    
                    <button
                    className={style.btn}
                    onClick={() => {
                      zapiszZamowienie({dialogBox});
                      setShowSaveAs(!showSaveAs)
                    }}
                    >
                    Zapisz
                    </button>


            </div>
      </div>
      
    </div>
  );
    }

}

function Tytul() {
  const contextModal = useContext(ModalInsertContext);
  const daneZamowienia = contextModal.daneZamowienia;
const setDaneZamowienia= contextModal.setDaneZamowienia;
  return (
    <div className={style.col}>
      <label className={style.label}> </label>
      <input
        className={style.tytul}
        type="text"
        defaultValue={daneZamowienia.tytul}
        onChange={(event) => {
          setDaneZamowienia({ ...daneZamowienia, tytul: event.target.value });
        }}
      ></input>
    </div>
  );
}

function Header() {
  return (
    <div className={style.header}>
      <p className={style.title}>Zapisz jako... </p>
    </div>
  );
}
