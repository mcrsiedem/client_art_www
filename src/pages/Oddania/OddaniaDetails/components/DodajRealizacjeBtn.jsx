import React, {useContext, useState, } from "react";
import style from "./DodajRealizacjeBtn.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import AddRealizacjaOprawa from "./add/AddRealizacjaOprawa";

export default function DodajRealizacjeBtn({ grup }) {
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
    <AddRealizacjaOprawa show={show} setShow={setShow} grup={grup} value={value} setValue={setValue}/>
    </>
  );
}


