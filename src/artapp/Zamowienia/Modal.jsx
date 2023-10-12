import style from '../History/Hisotry.module.css';

function Modal({ openModal, setOpenModal,row }) {
    return (
        <>
            <div className={style.mod}>
                <div>
                   <button onClick={() => setOpenModal(false)}> X </button> 
                </div>
                <div>id {row.id}</div>
                <div>id + user MMMMM{row.user}</div>
                
            </div>

        </>)

}

export default Modal;