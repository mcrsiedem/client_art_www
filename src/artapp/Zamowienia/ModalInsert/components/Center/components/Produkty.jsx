import Produkt from "./Produkt";
import style from '../Center.module.css'

export default function Produkty({_produkty}){

    return(<>

<div className={style.row2}>
                <div className={style.produkty}>
                        {_produkty.map(prod => (
                                <Produkt key={prod.id}></Produkt>
                        ))}
                </div>
   
            </div>
    
    </>);
}