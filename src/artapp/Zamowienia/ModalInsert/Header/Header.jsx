import iconTable from "../../../../svg/table.svg"
import iconTableGreen from "../../../../svg/table_green.svg"

import style from './Header.module.css'

const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

 function Header({setOpenModalInsert,postZamowienie,id,isTable,setIsTable,info,sprawdzPoprawnoscZamowienia,check_data_wejscia}){
    return(<>
    <div className={style.container}>
    {/* {check_data_wejscia ? (
         <img
         onClick={() => {
             setIsTable(!isTable);
         }}
         className={style.icon}
         src={iconTable}
         alt="table"
     />
          ) : (
            <img
                    onClick={() => {
                        setIsTable(!isTable);
                    }}
                    className={style.icon}
                    src={iconTableGreen}
                    alt="table"
                />
          )} */}
        <div className={style.title}>Dodaj zamówienie...id: {id} {info}</div>
        <div className={style.buttons}>
                <img
                    onClick={() => {
                        setIsTable(!isTable);
                    }}
                    className={style.icon}
                    src={iconTable}
                    alt="table"
                />
        <button onClick={() => setOpenModalInsert(false)} className={style.btn}>Anuluj</button>
        <button onClick={() => postZamowienie()} className={style.btn}>Zapisz</button>
        <button onClick={() => openInNewTab("/Zamowienia")}className={style.btn}>Zapisz jako</button>
        <button onClick={() => sprawdzPoprawnoscZamowienia()}className={style.btn}>Sprawdź</button>


 
</div>
  

    
    </div>
    </>
    );

}

export default Header;