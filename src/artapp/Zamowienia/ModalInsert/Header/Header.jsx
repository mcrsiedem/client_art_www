

import style from './Header.module.css'

const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

 function Header({setOpenModalInsert,postZamowienie,id}){
    return(<>
    <div className={style.container}>
        <div className={style.title}>Dodaj zamówienie...id: {id}</div>
        <div className={style.buttons}>

        <button onClick={() => setOpenModalInsert(false)} className={style.btn}>Anuluj</button>
        <button onClick={() => postZamowienie()} className={style.btn}>Zapisz</button>
        <button onClick={() => openInNewTab("/Zamowienia")}className={style.btn}>Zapisz jako</button>


 
</div>
  

    
    </div>
    </>
    );

}

export default Header;