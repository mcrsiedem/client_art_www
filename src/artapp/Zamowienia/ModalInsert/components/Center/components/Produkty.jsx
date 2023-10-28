
import style from '../Center.module.css'
import { Children } from "react";

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


function Produkt(){
        return(

        <div className={style.con}>

        <label className={style.label} > Tytul
            <input defaultValue="Katalog SDW" type="text" className={style.produkt} />
        </label>
        <label className={style.label} > Rodzaj
            <input defaultValue="Magazyn" type="text" className={style.produkt} />
        </label>


        <label className={style.label} > Oprawa
            <input defaultValue="PUR" type="text" className={style.produkt} />
        </label>
        <label className={style.label} > Format X
            <input defaultValue="210" type="text" className={style.produkt} />
        </label>
        <label className={style.label} > Format Y
            <input defaultValue="297" type="text" className={style.produkt} />
        </label>

        <label className={style.label} > Bok oprawy
            <input defaultValue="d" type="text" className={style.produkt} />
        </label>


    </div>
        );
}