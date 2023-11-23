import iconCopy from "../../../../../svg/copy.svg";
import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementCard.module.css"
import {  _papiery } from "../../api";
import ElementFooter from "./Footer/ElementFooter";
import CardCenter from "./Center/ElementCenter";
export default function ElementCard({ card,elementy,setElementy,handleChangeCardElementy,selected_papier,setSelected_papier,fragmenty,setFragmenty}) {

  
    return (
      <div className={style.elementCard}>
        <CardHeader
          card={card}
          elementy={elementy}
          setElementy={setElementy} 
          fragmenty={fragmenty}
          setFragmenty={setFragmenty}/>
        <CardCenter
          card={card}
          setElementy={setElementy}
          handleChangeCardElementy={handleChangeCardElementy}
          selected_papier={selected_papier}
          setSelected_papier={setSelected_papier} />
        <ElementFooter
          fragmenty={fragmenty}
          setFragmenty={setFragmenty}
          card={card} />
      </div>
    );
  }
  
  

  

  
  
  
  
  
  function CardHeader({ card, elementy, setElementy, fragmenty, setFragmenty }) {

    const handleRemoveItem = index => {
       if (elementy.length !== 1) {
      setElementy(elementy.filter(x => x.index !== index))
    }
   
      
      setElementy((prev) =>
      prev.map((t, a) => {
        if (t.index > index) {
          return {
            ...t,
            index: t.index--
            
          };
        } else {
          return t;
        }
      })
    );
  
  
  
    }
  
    function handleAddCard(card) {
      const newElementy = elementy.slice();
  
      newElementy.map((x) => {
        if (x.index > card.index) {
          return {
            ...x,
       //     index: x.index++,
          };
        } else {
          return x;
        }
      });
  
      newElementy.push({
       id:  Math.max(...elementy.map(f=>f.id))+1,
        zamowienie_id: card.zamowienie_id,
        produkt_id: card.produkt_id,
        naklad: card.naklad,
        index:  Math.max(...newElementy.map(f=>f.index))+1,
     
      });
  
      newElementy.sort((a, b) => a.index - b.index);
setElementy(newElementy);
      // setElementy((prev) =>prev.map((t)=> {return t}));

//-------------------
const newFragmenty = fragmenty.slice();
  
newFragmenty.map((x) => {
  if (x.index > card.index) {
    return {
      ...x,
 //     index: x.index++,
    };
  } else {
    return x;
  }
});

//let nextId = Math.max(...fragmenty.map(f=>f.id));

newFragmenty.push({

  id: Math.max(...fragmenty.map(f=>f.id))+1,
  zamowienie_id: card.zamowienie_id,
  produkt_id: card.produkt_id,
  naklad: card.naklad,
  element_id:  Math.max(...elementy.map(f=>f.id))+1,
  index:  Math.max(...newFragmenty.map(f=>f.index))+1,


});

newFragmenty.sort((a, b) => a.index - b.index);
setFragmenty(newFragmenty);




// setElementy((prev) =>
// prev.map((t, a) => {
//   if (t.index === a && t.index === element.index) {
//     return {
//       ...t,
//       id: element_id,
//       zamowienie_id: zamowienie_id,
//       produkt_id: produkt_id,
//     };
//   } else {
//     return t;
//   }
// })
// );





    }
  
    return (
      <div className={style.header}>
        <div className={style.typ}>
          <img onClick={() => { handleRemoveItem(card.index) }} className={style.icon} src={iconTrash} alt="delete" />
        </div>
  
        <div className={style.typ}> # {card.id} {card.typ} {card.naklad} szt.  Prod{card.produkt_id} </div>
        <div className={style.typ}>
          <img onClick={() =>  handleAddCard(card)} className={style.icon} src={iconCopy} alt="add" />
        </div>
      </div>
    )
  }