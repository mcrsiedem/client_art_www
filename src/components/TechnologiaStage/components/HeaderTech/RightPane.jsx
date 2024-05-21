import style from "./Header.module.css";
export default function HeaderRight({children}){

    return(
        <div className={style.right}>
        {children}   
       </div>
    )
}