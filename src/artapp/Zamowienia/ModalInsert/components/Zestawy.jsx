import style from "./Produkty.module.css";

export default function Zestawy({ _zestawy }) {
  return (
    <>
      <div className={style.zestawy}>
        {/* {_zestawy.map((prod) => (
            <Zestaw key={prod.id} typ={prod.typ}></Zestaw>
          ))} */}
        <Zestaw />
      </div>
    </>
  );
}

function Zestaw() {
  return <>zestaw</>;
}
