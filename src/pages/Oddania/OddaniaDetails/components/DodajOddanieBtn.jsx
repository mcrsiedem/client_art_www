import React, {useContext, useState, } from "react";
import style from "./DodajOddanieBtn.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import AddRealizacjaOprawa from "./add/AddRealizacjaOddania";
import AddRealizacjaOddania from "./add/AddRealizacjaOddania";

export default function DodajOddanieBtn({ grup }) {
  const techContext = useContext(TechnologyContext);
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const [show, setShow] = useState(false);
  const [value, setValue] = useState();

    const wykonaniaOprawy = techContext.wykonaniaOprawy;

  return (
    <>
    <button
              className={style.btn_zamknij}
              onClick={() => {
                setValue([])
                setShow(true)
              }}
            >
              Dodaj oddanie
    </button>
    <AddRealizacjaOddania show={show} setShow={setShow} grup={grup} value={value} setValue={setValue}/>
    </>
  );
}


