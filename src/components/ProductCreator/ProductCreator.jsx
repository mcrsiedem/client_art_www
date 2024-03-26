import style from './ProductCreator.module.css'
import BookMaker from './BookMaker/BookMaker'
import SheetMaker from './SheetMaker/SheetMaker'
import BoxMaker from './BoxMaker/BoxMaker'
import ProductSelector from './ProductSelector/ProductSelector'
import { useState } from 'react'

export default function ProductCreator({setShowTemplate,setShowParametryZamowienia}){

    const [show, setShow] = useState(null)
    return(
        <div className={style.container}>
            <ProductSelector show={show }setShow={setShow}/>

            {(show == 'BooKMaker') && <BookMaker setShowTemplate={setShowTemplate} setShowParametryZamowienia={setShowParametryZamowienia}/> }
            {(show == 'Sheet') && <SheetMaker setShowTemplate={setShowTemplate} setShowParametryZamowienia={setShowParametryZamowienia}/> }
            {(show == 'Box') && <BoxMaker setShowTemplate={setShowTemplate} setShowParametryZamowienia={setShowParametryZamowienia}/> }

        </div>
    )
}

