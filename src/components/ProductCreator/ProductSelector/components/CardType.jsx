import style from './CardType.module.css'
import iconBook from 'assets/book2.svg'
export default function CardType(){
    return(
        <div className={style.container}>

<img
    // onClick={() => {

    // }}
    className={style.icon}
    // src={contextModalInsert.lockDragDrop ? iconUnLock : iconLock}
    src={iconBook}

  />
            <p>Gazeta</p>
     
        </div>
    )
}