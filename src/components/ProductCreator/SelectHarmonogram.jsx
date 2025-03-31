import style from './ProductCreator.module.css'
import BookMaker from './BookMaker/BookMaker'
import SheetMaker from './SheetMaker/SheetMaker'
import BoxMaker from './BoxMaker/BoxMaker'
import ProductSelector from './ProductSelector/ProductSelector'
import { useState } from 'react'

export default function SelectHarmonogram({showZrodlo}){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
    const [show, setShow] = useState(null)

    if(showZrodlo)  {
            return(
        <div className={style.container}>

            <button >
                Nowe zamowienie
            </button>


        </div>
    )
    }

}

