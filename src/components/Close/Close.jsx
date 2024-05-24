import iconx from "assets/x.svg"
export default function Close({setShow}){
   
    return (
        <img
          className={style.zamknij_icon}
          src={iconX}
          onClick={() => {
            setShow(false);
          }}
          alt="Procesy"
        />
      );
}