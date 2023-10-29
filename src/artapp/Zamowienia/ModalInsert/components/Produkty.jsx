
import style from './Produkty.module.css'


export default function Produkty({_produkty}){

    return (
      <>
        <div id="Produkty" className={style.produkty}>
          {_produkty.map((prod) => (
            <Produkt key={prod.id}></Produkt>
          ))}
        </div>
      </>
    );
}


function Produkt(){
        return (
          <div className={style.produkt}>

<div className={style.col}>
              <label className={style.label}> Produkt</label>
              <input  defaultValue="Magazyn" type="input" className={style.produkt}/>
            </div>

            <div className={style.col}>
              <label className={style.label}> Tytul</label>
              <input  defaultValue="Katalog SDW" type="text" className={style.produkt}/>
            </div>

            

            <div className={style.col}>
              <label className={style.label}> Oprawa</label>
              <input  defaultValue="PUR" type="text" className={style.produkt}/>
            </div>

            <div className={style.col}>
              <label className={style.label}> Netto X</label>
              <input  defaultValue="210" type="text" className={style.produkt}/>
            </div>

            <div className={style.col}>
              <label className={style.label}> Netto Y</label>
              <input  defaultValue="297" type="text" className={style.produkt}/>
            </div>

            <div className={style.col}>
              <label className={style.label}> Bok oprawy</label>
              <input  defaultValue="297" type="text" className={style.produkt}/>
            </div>


          </div>
        );
}