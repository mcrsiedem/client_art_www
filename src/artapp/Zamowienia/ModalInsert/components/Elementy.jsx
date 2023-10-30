import style from "./Elementy.module.css";

export default function Elementy({ _elementy }) {
  return (
    <>
      <div className={style.elementy}>
        {_elementy.map((element) => (
          <ElementKafel key={element.id} element={element} ></ElementKafel>
        ))}
      </div>
    </>
  );
}

function ElementKafel({ element }) {
  return (
    <div className={style.elementKafel}>

    <div className={style.header}>
    {element.typ} 
    </div>
    <div className={style.center}>
    <div className={style.col}>
              <label className={style.label}> Typ</label>
              <input className={style.tytul} defaultValue={element.typ}></input>
            </div>
    </div>


    </div>
    
  );
}

function Element({ element }) {
  return (
    <div className={style.element}>


      <div className={style.col}>
              <label className={style.label}> Typ</label>
              <input className={style.tytul} defaultValue={element.typ}></input>
            </div>
            <div className={style.col}>
              <label className={style.label}> Nakład</label>
              <input  defaultValue={element.naklad} type="text" className={style.produkt}/>
            </div>

      <div className={style.col}>
              <label className={style.label}> Wersja</label>
              <input  defaultValue={element.nazwa} type="text" className={style.produkt}/>
            </div>

            <div className={style.col}>
              <label className={style.label}> Strony</label>
              <input  defaultValue={element.ilosc_stron} type="text" className={style.produkt}/>
            </div>
            <div className={style.col}>
              <label className={style.label}> Netto X</label>
              <input  defaultValue={element.format_x} type="text" className={style.produkt}/>
            </div>
            <div className={style.col}>
              <label className={style.label}> Netto Y</label>
              <input  defaultValue={element.format_y}  type="text" className={style.produkt}/>
            </div>
            <div className={style.col}>
              <label className={style.label}> Kolory </label>
              <input  defaultValue="4" type="text" className={style.produkt}/>
            </div>
            <div className={style.col}>
              <label className={style.label}> Kolory </label>
              <input  defaultValue="4" type="text" className={style.produkt}/>
            </div>


    </div>
    
  );
}