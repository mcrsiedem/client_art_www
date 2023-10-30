import style from "./Elementy.module.css";

export default function Elementy({ _elementy }) {
  return (
    <>
      <div className={style.elementy}>
        {_elementy.map((prod) => (
          <Element key={prod.id} typ={prod.typ}></Element>
        ))}
      </div>
    </>
  );
}

function Element({ typ }) {
  return <input className={style.tytul} defaultValue={typ}></input>;
}
