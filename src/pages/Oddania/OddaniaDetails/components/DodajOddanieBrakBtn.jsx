import React, {useContext, useState, } from "react";
import style from "./DodajOddanieBrakBtn.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import AddRealizacjaOprawa from "./add/AddRealizacjaOddania";
import AddRealizacjaOddania from "./add/AddRealizacjaOddania";
import AddRealizacjaBrakOddania from "./addBrak/AddRealizacjaBrakOddania";

export default function DodajOddanieBrakBtn({ grup }) {
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
              Brak
    </button>
    <AddRealizacjaBrakOddania show={show} setShow={setShow} grup={grup} value={value} setValue={setValue}/>
    </>
  );
}


