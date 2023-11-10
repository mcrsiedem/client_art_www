import style from "./Introligatornia.module.css";
import {  _oprawa } from "./api";

export default function Introligatornia({ zestawy,setZestwy }) {
  
  return (
    <>
      <div className={style.oprawy}>
        {zestawy.map((prod) => (

            <Oprawa key={prod.id} typ={prod.typ} nr={1000}></Oprawa>
          ))}
        {/* <Oprawa nr={1000}/> */}
      
      </div>
    </>
  );
}

function Oprawa({ nr }) {

  const style2={
    display: 'flex',
    
  }

  return (
    <div className={style.oprawa}>

      <div className={style.header}>
        Oprawa {nr}
      </div>
      <div style={style2}>
      <RodzajOprawy/>
        <input type="date"></input>
      </div>
    </div>
  );
}


function RodzajOprawy({zestawy,setZestwy}){
  return(
    <select
    className={style.select}
    valueDefault={zestawy}
    onChange={setZestwy}
  >
    {_oprawa.map((option) => (
      <option key={option.id} value={option.id}>
      {option.nazwa} 
      </option>
    ))}
  </select>
  );
}