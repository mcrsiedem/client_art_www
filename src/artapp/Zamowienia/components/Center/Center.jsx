

import style from './Center.module.css'

 function Center(){
    return(<>
    <div className={style.container}>
            <div className={style.row1}>
                <label className={style.label} > Firma
                    <select value={selected_firma} onChange={handleChange_firna}>
                        {_firma.map(option => (
                            <option key={option.id} value={option.nazwa}>
                                {option.nazwa}
                            </option>
                        ))}
                    </select>
                </label>
                    <select className={style.klient} value={klient} onChange={handleChange_klient}>
                        {_klient.map(option => (
                            <option key={option.id} value={option.firma}>
                                {option.firma}
                            </option>
                        ))}
                    </select>
                <input className={style.tytul} value="Tytuł" type="text" />

                <input className={style.data} type="date"></input>
                <input className={style.data} type="date"></input>
            </div>

<div className={style.row2}>
    <div className={style.produkty}>
    {_produkty.map(prod => (
      // <input key={prod.id} className={style.tytul} defaultValue={prod.typ}></input>
<Produkt key={prod.id}></Produkt>
    ))}
    </div>
    <div className={style.elementy}>
    {_elementy.map(elem => (
      <input key={elem.id} className={style.tytul} defaultValue={elem.typ}></input>

    ))}
    </div>
    <div className={style.zestawy}>zestawy
    </div>

  </div>

    </div>
    </>
    );

}

export default Center;