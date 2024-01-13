import style from "./Elementy.module.css";

import Card from "./ElementCard/Card";

export default function Elementy({ elementy,setElementy,handleChangeCardElementy,selected_papier,setSelected_papier,fragmenty,setFragmenty }) {



  return (
    <>
      <div className={style.elementy}>
ś
        {
            
        elementy.map(((card) => (
          <Card key={card.id}
            card={card}
            elementy={elementy}
            setElementy={setElementy}
            handleChangeCardElementy={handleChangeCardElementy}
            selected_papier={selected_papier}
            setSelected_papier={setSelected_papier}
            fragmenty={fragmenty}
            setFragmenty={setFragmenty}/>
            
        )))
        
        
        }




      </div>
    </>
  );
}

