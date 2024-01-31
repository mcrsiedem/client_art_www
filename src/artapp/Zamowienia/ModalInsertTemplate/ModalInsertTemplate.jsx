import style from "./ModalInsertTemplate.module.css";
// okienko do wydzielania części z oprawy

export default function ModalInsertTemplate({ setOpenModalInsertTemplate }) {
  return (
    <div className={style.container}>
      <Header />
      <Center />
      <Footer setOpenModalInsertTemplate={setOpenModalInsertTemplate} />
    </div>
  );
}

function Header({}) {
  return (
    <div className={style.header}>
      <p className={style.title}>Dodaj produkt... </p>
    </div>
  );
}

function Center({ setOpenModalInsertTemplate }) {
  return <div className={style.center}>

        <div className={style.main}>

              <div  className={style.miniCard}>
                1
              </div>

              <div className={style.miniCard}>
                1
              </div>

        </div>

    </div>;
}

function Footer({ setOpenModalInsertTemplate }) {
  return (
    <div className={style.footer}>
      <button
        className={style.btn}
        onClick={() => {
          setOpenModalInsertTemplate(false);
        }}
      >
        Anuluj
      </button>

      <button className={style.btn}>OK</button>
    </div>
  );
}
