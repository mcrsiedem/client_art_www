import style from './ProductCreator.module.css'
import BookMaker from './BookMaker/BookMaker'
import ProductSelector from './ProductSelector/ProductSelector'

export default function ProductCreator({setShowTemplate,setShowParametryZamowienia}){
    return(
        <div className={style.container}>
            <ProductSelector/>
            <BookMaker setShowTemplate={setShowTemplate}
              setShowParametryZamowienia={setShowParametryZamowienia}/>
        </div>
    )
}

