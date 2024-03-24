
import style from './ProductSelector.module.css'
import CardType from './components/CardType'
export default function ProductSelector(){
    return(
        <div className={style.container}>
            <CardType typ={"gazeta"}/>
            <CardType typ={"ulotka"}/>
            <CardType typ={"pudelko"}/>
        </div>
    )
}