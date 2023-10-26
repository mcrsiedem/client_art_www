import style from './Footer.module.css'

 function Footer({ openModalInsert, setOpenModalInsert }){
    return(<>
    <div className={style.container}>

    <button onClick={() => setOpenModalInsert(false)} className={style.btn}>Anluj</button>
            <button onClick={() => {window.resizeTo(200,200)}} className={style.btn}>Zapisz</button>
            <button className={style.btn}>Zapisz jako</button>


     
    </div>
    </>
    );

}

export default Footer;