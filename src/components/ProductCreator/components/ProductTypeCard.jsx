import style from "./ProductTypeCard.module.css";
import iconBook from "assets/book_blue.svg";
import iconUlotka from "assets/ulotka2.svg";
import iconPudelko from "assets/box3.svg";
export default function CardProductType({ typ,show,setShow }) {



    if (typ== "gazeta"){
        return (

            <div className={(show == 'BooKMaker') ? style.containerSelected : style.container}>
              <img
                onClick={() => {
                  setShow('BooKMaker')

                }}
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

          <div className={(show == 'Sheet') ? style.containerSelected : style.container}>
              <img
                onClick={() => {
                  setShow('Sheet')
                }}
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

          <div className={(show == 'Box') ? style.containerSelected : style.container}>
              <img
               onClick={() => {
                setShow('Box')
              }}
              className={style.icon}
                // src={contextModalInsert.lockDragDrop ? iconUnLock : iconLock}
                src={iconPudelko}
              />
              <div className={style.title}>Pudełko</div>
            </div>
          );
    }

}
