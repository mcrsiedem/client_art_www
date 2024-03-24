import ProductDeatils from '../ProductDetails/ProductDeatils'
import style from './ProductSelector.module.css'
export default function ProductSelector(){
    return(
        <div className={style.container}>
            <ProductSelector/>
            <ProductDeatils/>
        </div>
    )
}