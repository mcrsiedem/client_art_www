import style from "./CardType.module.css";
import iconBook from "assets/book2.svg";
import iconUlotka from "assets/ulotka.svg";
import iconPudelko from "assets/box3.svg";
export default function CardType({ typ }) {

    if (typ== "gazeta"){
        return (

            <div className={style.container}>
              <img
                // onClick={() => {
        
                // }}
                className={style.icon}
                // src={contextModalInsert.lockDragDrop ? iconUnLock : iconLock}
                src={iconBook}
              />
              <div className={style.title}>Gazeta</div>
            </div>
          );
    }

    if (typ== "ulotka"){
        return (

            <div className={style.container}>
              <img
                // onClick={() => {
        
                // }}
                className={style.icon}
                // src={contextModalInsert.lockDragDrop ? iconUnLock : iconLock}
                src={iconUlotka}
              />
              <div className={style.title}>Ulotka</div>
            </div>
          );
    }

    if (typ== "pudelko"){
        return (

            <div className={style.container}>
              <img
                // onClick={() => {
        
                // }}
                className={style.icon}
                // src={contextModalInsert.lockDragDrop ? iconUnLock : iconLock}
                src={iconPudelko}
              />
              <div className={style.title}>Pudełko</div>
            </div>
          );
    }

}
