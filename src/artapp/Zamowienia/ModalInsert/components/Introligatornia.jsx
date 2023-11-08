import style from "./Introligatornia.module.css";

export default function Introligatornia({ _zestawy }) {
  
  return (
    <>
      <div className={style.zestawy}>
        {/* {_zestawy.map((prod) => (
            <Zestaw key={prod.id} typ={prod.typ}></Zestaw>
          ))} */}
        <Oprawa nr={1}/>
        <Oprawa nr={2}/>
      </div>
    </>
  );
}

function Oprawa({nr}) {
  return(
  <div className={style.zestaw}> 
<div className={style.header}>
Oprawa {nr}
</div>
  </div>
  );
}
