
import style from './ProductSelector.module.css'
import ProductTypeCard from '../components/ProductTypeCard'
import { useContext } from 'react'
import { PreOrderContext } from 'context/PreOrderContext'
import { ModalInsertContext } from 'context/ModalInsertContext'
import { initialPreOrder } from 'utils/initialvalue'
export default function ProductSelector({show,setShow}){
    const poc = useContext(PreOrderContext)
    const mic = useContext(ModalInsertContext)
    return(
        <div onClick={()=>resetHandler(poc,mic)} className={style.container}>
            <ProductTypeCard typ={"gazeta"} show={show} setShow={setShow} />
            <ProductTypeCard typ={"ulotka"} show={show} setShow={setShow} />
            <ProductTypeCard typ={"pudelko"} show={show} setShow={setShow}/>
        </div>
    )
}

const resetHandler = (poc, mic) => {
    poc.setPreOrder(initialPreOrder)

}