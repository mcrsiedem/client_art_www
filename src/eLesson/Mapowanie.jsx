

{elementy.map((card) => ( {...card, index: index++}
    )).map(((card) => (
     <ElementCard key={card.id} index={index} card={card} elementy={elementy} setElementy={setElementy}></ElementCard>
   )))}

// mapowanie z tablicy  tablicy
// const _elementy = [   [{id: 1},{id: 2}],[  {id: 1},{id: 2}] ];

   elementy.map((tabl)=>(tabl.map((card)=>(<ElementCard key={card.id}
    card={card}
    elementy={elementy}
    setElementy={setElementy}
    handleChangeCardElementy={handleChangeCardElementy}
    selected_papier={selected_papier}
    setSelected_papier={setSelected_papier}/>))))
    import { Children } from 'react';


 //-------------------------   
export default function RowList({ children }) {
  return (
    <div className="RowList">
      {Children.map(children, child =>
        <div className="Row">
          {child}
        </div>
      )}
    </div>
  );
}
//-------------------------   
