
import style from './Produkty.module.css'


export default function Produkty({_produkty}){

    return (
      <>
        <div id="Produkty" className={style.produkty}>
          {_produkty.map((prod) => (
            <ProduktCard key={prod.id}></ProduktCard>
          ))}

        </div>
      </>
    );
}


function ProduktCard(){
  return (
    <div className={style.produktCard}>

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
