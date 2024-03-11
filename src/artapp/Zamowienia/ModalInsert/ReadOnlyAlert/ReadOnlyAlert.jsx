import style from "../ReadOnlyAlert/ReadOnlyAlert.module.css";

export default function ReadOnlyAlert({ setReadOnly2, stanOtwarciaZamowienia }) {
  //   useEffect(() => {}, []);

  return (
    <div className={style.window}>
      
      <div className={style.readonly}>
        <Header />

          
<div className={style.center}>

  <p>Zamówienie otwarte {stanOtwarciaZamowienia.data} przez {stanOtwarciaZamowienia.user}</p>
</div>
            

              <div className={style.row}>
                <button
                  className={style.btn}
                  onClick={() => {
                    setReadOnly2(false);
                  
                  }}
                >
                  OK
                </button>
              </div>

      </div>
    </div>
  );
}

function Header() {
  return (
    <div className={style.header}>
      <p className={style.title}>Tylko do odczytu... </p>
    </div>
  );
}
