import style from "../SaveAs/SaveAs.module.css";

export default function SaveAs({ daneZamowienia,setDaneZamowienia, showSaveAs,setShowSaveAs,postZamowienieObj ,setSaveAs}) {
//   useEffect(() => {}, []);

  return (
    <div className={style.insertContainer}>
      <Header />

      <Tytul
        daneZamowienia={daneZamowienia}
        setDaneZamowienia={setDaneZamowienia}
        setSaveAs={setSaveAs}
      />

      <div className={style.center}></div>

            <div className={style.row}>

                    <button
                    className={style.btn}
                    onClick={() => {
                    setShowSaveAs(!showSaveAs)
                    }}
                    >
                    Anuluj
                    </button>
                    
                    <button
                    className={style.btn}
                    onClick={() => {
                        setSaveAs(true)
                        postZamowienieObj();
                        setShowSaveAs(!showSaveAs)
                    }}
                    >
                    Zapisz
                    </button>


            </div>
    </div>
  );
}

function Tytul({ daneZamowienia, setDaneZamowienia }) {
  return (
    <div className={style.col}>
      <label className={style.label}> </label>
      <input
        className={style.tytul}
        type="text"
        value={daneZamowienia.tytul}
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
