
import style from '../Zamowienia/ModalInsert.module.css';

function ModalInsert({ openModalInsert, setOpenModalInsert }) {
    return (
        <>
            <div className={style.container}>



                <div className={style.header}>
          
                </div>

                <div className={style.center}>
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
           
                </div>


                <div className={style.footer}>
                    <button onClick={() => setOpenModalInsert(false)} className={style.btn}>Anluj</button>
                    <button className={style.btn}>Zapisz</button>
                    <button className={style.btn}>Zapisz jako</button>
               
                </div>
                
                
                {/* <div>id {row.id}</div>
                <div>id + user {row.user}</div> */}



                
            </div>

        </>)

}

export default ModalInsert;