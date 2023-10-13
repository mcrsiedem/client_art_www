
import style from '../Zamowienia/ModalInsert.module.css';

function ModalInsert({ openModalInsert, setOpenModalInsert }) {
    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                <button className={style.buttonX} onClick={() => setOpenModalInsert(false)}> X </button> 
                
                </div>

                <div className={style.center}>
                    <input type="text" />
                    <input type="text" />
                    <p>center</p>
                </div>


                <div className={style.footer}>
                <p>footer</p>
                </div>
                
                
                {/* <div>id {row.id}</div>
                <div>id + user {row.user}</div> */}
                
            </div>

        </>)

}

export default ModalInsert;