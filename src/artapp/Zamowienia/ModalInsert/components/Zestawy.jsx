import style from "./Zestawy.module.css";

export default function Zestawy({ _zestawy }) {
  
  return (
    <>
      <div className={style.zestawy}>
        {/* {_zestawy.map((prod) => (
            <Zestaw key={prod.id} typ={prod.typ}></Zestaw>
          ))} */}
        <Zestaw nr={1}/>
        <Zestaw nr={2}/>
      </div>
    </>
  );
}

function Zestaw({nr}) {
  return(
  <div className={style.zestaw}> 
<div className={style.header}>
Zestaw {nr}
</div>
  </div>
  );
}
