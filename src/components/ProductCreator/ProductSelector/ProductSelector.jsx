
import style from './ProductSelector.module.css'
import ProductTypeCard from '../components/ProductTypeCard'
export default function ProductSelector(){
    return(
        <div className={style.container}>
            <ProductTypeCard typ={"gazeta"}/>
            <ProductTypeCard typ={"ulotka"}/>
            <ProductTypeCard typ={"pudelko"}/>
        </div>
    )
}