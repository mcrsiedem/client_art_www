import style from "../ReadOnlyAlert/ReadOnlyAlert.module.css";

export default function ReadOnlyAlert({ readAlert, setReadAlert, stanOtwarciaZamowienia }) {
  //   useEffect(() => {}, []);

  if(readAlert){
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
                    setReadAlert(false);
                  
                  }}
                >
                  OK
                </button>
              </div>

      </div>
    </div>
  );
  }

}

function Header() {
  return (
    <div className={style.header}>
      <p className={style.title}>Tylko do odczytu... </p>
    </div>
  );
}
