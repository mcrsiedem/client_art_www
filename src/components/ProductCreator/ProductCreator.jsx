import style from './ProductCreator.module.css'
import BookMaker from './BookMaker/BookMaker'
import SheetMaker from './SheetMaker/SheetMaker'
import BoxMaker from './BoxMaker/BoxMaker'
import ProductSelector from './ProductSelector/ProductSelector'
import { useContext, useState } from 'react'
import { ModalInsertContext } from 'context/ModalInsertContext'

export default function ProductCreator(){
 const contextModalInsert = useContext(ModalInsertContext);
const showTabs = contextModalInsert.showTabs
const setShowTabs = contextModalInsert.setShowTabs
    const [show, setShow] = useState(null)
    
    if(showTabs.kreator){
            return(
        <div className={style.container}>
            <ProductSelector show={show }setShow={setShow}/>

            {(show == 'BooKMaker') && <BookMaker /> }
            {(show == 'Sheet') && <SheetMaker /> }
            {(show == 'Box') && <BoxMaker /> }

        </div>
    )
    }

}

