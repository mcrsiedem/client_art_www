import iconTable from "../../../../svg/table.svg";
import iconTableGreen from "../../../../svg/table_green.svg";

import style from "./Header.module.css";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};

function Header({
  setOpenModalInsert,
  // postZamowienie,
  postZamowienieObj,
  idki,
  id,
  isTable,
  setIsTable,
  info,
  setInfo,
  sprawdzPoprawnoscZamowienia,
  check_data_wejscia,
  elementy,
  openModalStany,
  setOpenModalStany
}) {
  return (
    <>
      <div className={style.container}>
        <div className={style.title}>
          Dodaj zamówienie...
        </div>
        <div className={style.buttons}>
          <img
            onClick={() => {
              // setIsTable(!isTable);
              setOpenModalStany(!openModalStany);

              setInfo(
                Math.max(
                  ...elementy.map((obj) => {
                    return obj.id;
                  })
                )
              );
            }}
            className={style.icon}
            src={iconTable}
            alt="table"
          />
          <button
            onClick={() => setOpenModalInsert(false)}
            className={style.btn}
          >
            Anuluj
          </button>
          <button onClick={async () => {
            
              postZamowienieObj();
          }} className={style.btn}>
            Zapisz
          </button>
          <button
            onClick={() => openInNewTab("/Zamowienia")}
            className={style.btn}
          >
            Zapisz jako
          </button>
          <button
            // onClick={() => postZamowienieObj()}
            className={style.btn}
          >
            Sprawdź
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
