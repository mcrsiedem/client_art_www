import style from '../History/Hisotry.module.css';

function Modal({ openModal, setOpenModal,id,row }) {
    return (
        <>
            <div className={style.mod}>
                <div>
                   <button onClick={() => setOpenModal(false)}> X </button> 
                </div>
                <div>id {id}</div>
                <div>id + user {row}</div>
                
            </div>

        </>)

}

export default Modal;