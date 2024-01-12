
import style from './ProduktyCardContainer.module.css'
import Card from './Card';


export default function ProduktyCardContainer({produkty,handleChangeCardProdukty}){


    return (
      <>
        <div id="Produkty" className={style.produkty}>
          {produkty.map((card) => (
            <Card key={card.id} card={card} handleChangeCardProdukty={handleChangeCardProdukty}>
              {/* <Tytul card={card} handleChangeCardProdukty={handleChangeCardProdukty}> dd</Tytul>
              <Wersja card={card} /> */}
          
            </Card>
          ))}

        </div>
      </>
    );
}   


// function Card({card,handleChangeCardProdukty,children}){
//   return (
//     <div className={style.produktCard}>

//     <div className={style.header}>
//     Wlasne id: {card.id} Gazeta {card.tytul}zamowienie.id {card.zamowienie_id}  
//     </div>
//     <div className={style.center}>
//        {children}
//     </div>


//     </div>
//   );
// }

// function Tytul({ card,handleChangeCardProdukty,children }) {
//   const tytulHandler =(e)=>{handleChangeCardProdukty({...card, tytul: e.target.value})   }
//   return (          <div className={style.col}>
//     <label className={style.label}> Tytuł {children}</label>
//     <input placeholder='Tytuł pracy' defaultValue={card.tytul} onChange={tytulHandler} type="text" className={style.produkt}/>
//   </div>);
// }

// function Wersja({ card }) {
//   return (              <div className={style.col}>
//     <label className={style.label}> Wersja</label>
//     <input placeholder='Tytuł pracy' defaultValue="Katalog SDW" type="text" className={style.produkt}/>
//   </div>);
// }