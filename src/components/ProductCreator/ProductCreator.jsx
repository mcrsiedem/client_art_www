import style from './ProductCreator.module.css'
import ProductDeatils from './ProductDetails/ProductDeatils'
import ProductSelector from './ProductSelector/ProductSelector'

export default function ProductCreator(){
    return(
        <div className={style.container}>
            <ProductSelector/>
            <ProductDeatils/>
        </div>
    )
}