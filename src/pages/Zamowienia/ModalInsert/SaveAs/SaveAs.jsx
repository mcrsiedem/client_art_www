import { useContext} from "react";
import style from "../SaveAs/SaveAs.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { PreOrderContext } from "context/PreOrderContext";

export default function SaveAs({showSaveAs,setShowSaveAs,postZamowienieObj ,postZamowienieObjSaveAs,setSaveAs}) {
//   useEffect(() => {}, []);
const contextModal = useContext(ModalInsertContext);
const daneZamowienia = contextModal.daneZamowienia;
const setDaneZamowienia= contextModal.setDaneZamowienia;
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
                      // setDaneZamowienia({...daneZamowienia, prime_id: daneZamowienia.id} )
                        setSaveAs(true)
                        // postZamowienieObj();
                        postZamowienieObjSaveAs();
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
