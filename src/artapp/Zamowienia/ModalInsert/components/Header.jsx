

import style from './Header.module.css'

 function Header({setOpenModalInsert}){
    return(<>
    <div className={style.container}>
        <div className={style.title}>Dodaj zamowienie...</div>
        <div className={style.buttons}>

        <button onClick={() => setOpenModalInsert(false)} className={style.btn}>Anuluj</button>
        <button onClick={() => {window.resizeTo(200,200)}} className={style.btn}>Zapisz</button>
        <button className={style.btn}>Zapisz jako</button>


 
</div>
  

    
    </div>
    </>
    );

}

export default Header;