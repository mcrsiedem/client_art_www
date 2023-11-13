import style from "./Warianty.module.css";

export default function Warianty({ _zestawy }) {
  
  return (
    <>
      <div className={style.zestawy}>
        {/* {_zestawy.map((prod) => (
            <Zestaw key={prod.id} typ={prod.typ}></Zestaw>
          ))} */}
        <Wariant nr={1}/>


      </div>
    </>
  );
}

function Wariant({nr}) {
  return(
  <div className={style.zestaw}> 
<div className={style.header}>
Pakowanie {nr}
</div>
  </div>
  );
}
