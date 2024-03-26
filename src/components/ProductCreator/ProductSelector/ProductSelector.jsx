
import style from './ProductSelector.module.css'
import ProductTypeCard from '../components/ProductTypeCard'
export default function ProductSelector({setShow}){
    return(
        <div className={style.container}>
            <ProductTypeCard typ={"gazeta"} setShow={setShow}/>
            <ProductTypeCard typ={"ulotka"} setShow={setShow}/>
            <ProductTypeCard typ={"pudelko"} setShow={setShow}/>
        </div>
    )
}