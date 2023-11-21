
import style from './Produkty.module.css'


export default function Produkty({produkty,handleChangeCardProdukty}){


    return (
      <>
        <div id="Produkty" className={style.produkty}>
          {produkty.map((card) => (
            <ProduktCard key={card.id} card={card} handleChangeCardProdukty={handleChangeCardProdukty}>
              <Tytul card={card} handleChangeCardProdukty={handleChangeCardProdukty}> dd</Tytul>
              <Wersja card={card} />
              <button onClick={()=> alert(card.id)}>
                 Pokaz ID</button>
            </ProduktCard>
          ))}

        </div>
      </>
    );
}   


function ProduktCard({card,handleChangeCardProdukty,children}){
  return (
    <div className={style.produktCard}>

    <div className={style.header}>
    Wlasne id: {card.id} Gazeta {card.tytul}zamowienie.id {card.zamowienie_id}  
    </div>
    <div className={style.center}>
       {children}
    </div>


    </div>
  );
}

function Tytul({ card,handleChangeCardProdukty,children }) {
  const tytulHandler =(e)=>{handleChangeCardProdukty({...card, tytul: e.target.value})   }
  return (          <div className={style.col}>
    <label className={style.label}> Tytuł {children}</label>
    <input placeholder='Tytuł pracy' defaultValue={card.tytul} onChange={tytulHandler} type="text" className={style.produkt}/>
  </div>);
}

function Wersja({ card }) {
  return (              <div className={style.col}>
    <label className={style.label}> Wersja</label>
    <input placeholder='Tytuł pracy' defaultValue="Katalog SDW" type="text" className={style.produkt}/>
  </div>);
}