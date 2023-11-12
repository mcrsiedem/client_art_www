
import style from './Produkty.module.css'


export default function Produkty({produkty,handleChangeCardProdukty}){

    return (
      <>
        <div id="Produkty" className={style.produkty}>
          {produkty.map((card) => (
            <ProduktCard key={card.id} card={card} handleChangeCardProdukty={handleChangeCardProdukty}></ProduktCard>
          ))}

        </div>
      </>
    );
}   


function ProduktCard({card,handleChangeCardProdukty}){
  return (
    <div className={style.produktCard}>

    <div className={style.header}>
    Gazeta {card.tytul}zamowienie.id {card.zamowienie_id}  
    </div>
    <div className={style.center}>
       <Tytul card={card} handleChangeCardProdukty={handleChangeCardProdukty}/>
       <Wersja card={card}/>
    </div>


    </div>
  );
}

function Tytul({ card,handleChangeCardProdukty }) {
  const tytulHandler =(e)=>{handleChangeCardProdukty({...card, tytul: e.target.value})   }
  return (          <div className={style.col}>
    <label className={style.label}> Tytuł</label>
    <input placeholder='Tytuł pracy' defaultValue={card.tytul} onChange={tytulHandler} type="text" className={style.produkt}/>
  </div>);
}

function Wersja({ card }) {
  return (              <div className={style.col}>
    <label className={style.label}> Wersja</label>
    <input placeholder='Tytuł pracy' defaultValue="Katalog SDW" type="text" className={style.produkt}/>
  </div>);
}