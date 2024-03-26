
import style from './ProductSelector.module.css'
import ProductTypeCard from '../components/ProductTypeCard'
import { useState } from 'react'
export default function ProductSelector({show,setShow}){

    return(
        <div className={style.container}>
            <ProductTypeCard typ={"gazeta"} show={show} setShow={setShow} />
            <ProductTypeCard typ={"ulotka"} show={show} setShow={setShow} />
            <ProductTypeCard typ={"pudelko"} show={show} setShow={setShow}/>
        </div>
    )
}