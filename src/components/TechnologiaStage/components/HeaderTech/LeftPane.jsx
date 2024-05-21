import style from "./Header.module.css";

export default function HeaderLeft({children}){

    return(
        <div className={style.left}>
         {children}   
        </div>
        
        
    )
}