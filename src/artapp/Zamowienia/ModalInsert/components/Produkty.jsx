
import style from './Produkty.module.css'


export default function Produkty({_produkty}){

    return (
      <>
        <div id="Produkty" className={style.produkty}>
          {_produkty.map((prod) => (
            <ProduktKafel key={prod.id}></ProduktKafel>
          ))}
        </div>
      </>
    );
}


function ProduktKafel(){
  return (
    <div className={style.produktKafel}>

    <div className={style.header}>
    Gazeta
    </div>
    <div className={style.center}>
          <div className={style.col}>
              <label className={style.label}> Tytuł</label>
              <input placeholder='Tytuł pracy' defaultValue="Katalog SDW" type="text" className={style.produkt}/>
            </div>
            <div className={style.col}>
              <label className={style.label}> Wersja</label>
              <input placeholder='Tytuł pracy' defaultValue="Katalog SDW" type="text" className={style.produkt}/>
            </div>
    </div>


    </div>
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