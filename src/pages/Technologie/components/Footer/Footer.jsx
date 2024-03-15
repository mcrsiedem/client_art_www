import style from "./Footer.module.css";
export default function Footer(){

    return(
        <footer className={style.footer}>
        {/* <button className={style.myButton} onClick={()=>giveMeJobs('H1')}>H1</button> */}
        <button className={style.myButton}>OK</button>
        <button
          className={style.myButton}
          onClick={() => {
            // dodaj_clikHandler();
          }}
        >
          Dodaj
        </button>
</footer>
    )
}