
import style from '../Zamowienia/ModalInsert.module.css';

function ModalInsert({ openModalInsert, setOpenModalInsert }) {
    return (
        <>
            <div className={style.mod}>
                <div>
                   <button onClick={() => setOpenModalInsert(false)}> X </button> 
                </div>
                <div> me</div>
                {/* <div>id {row.id}</div>
                <div>id + user {row.user}</div> */}
                
            </div>

        </>)

}

export default ModalInsert;