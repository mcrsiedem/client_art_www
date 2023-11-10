import { Fragment } from "react";
import style from "./Introligatornia.module.css";
import {  _oprawa } from "./api";

export default function Introligatornia({ zestawy,setZestwy,fragmenty,setFragmenty }) {
  
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



  return (
    <div className={style.oprawaCard}>
      <Header nr={nr} />

      <div className={style.row1}>
        <RodzajOprawy />
        <Naklad />
        <Spedycja />
      </div>
    <FragmentElementu nazwa={"Okladka"}/>
      <input></input>

    </div>
  );
}


function FragmentElementu({nazwa}){
  return(<>
  <div>{nazwa}</div>
  <div>X</div>
  </>)
}
function Header({nr}){
return(    <div className={style.header}>
  Oprawa  {nr}
</div>)
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

function Naklad(){
  return(<input></input>);
}
function Spedycja(){
  return(
  <>
  <input type="date"></input>
  </>
  );
}