import style from '../History/Hisotry.module.css';

function Modal({ openModal, setOpenModal }) {
    return (
        <>
            <div className={style.mod}>
                <button onClick={() => setOpenModal(false)}> X </button>
            </div>

        </>)

}

export default Modal;