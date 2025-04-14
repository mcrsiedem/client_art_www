import { useContext, useState } from "react";
import style from "./ProduktyNaklad.module.css";

import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import { useZamowienieZapisz } from "hooks/useZamowienieZapisz";
import { useStatus } from "hooks/useStatus";
import iconCopy from "assets/edit.svg";
import { reg_int } from "utils/initialvalue";
export default function ProduktyNaklad({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  const [setStatus] = useStatus();
  const [showEdit, setShowEdit] = useState(false);

  // if (row.zamowienie_id > 1) {
  //   return (
  //     <div className={style.col_dane}>
  //       <label className={style.label}> Nakład </label>
  //       <div className={style.input_container_img}>
  //         <input
  //           className={style.input_naklad_disabled}
  //           disabled
  //           value={row?.naklad}
  //         ></input>
  //         <img
  //           className={style.show}
  //           src={iconCopy}
  //           onClick={() => {
  //             console.log("s",row);
  //             setShowEdit(true)
  //           }}
  //           alt="Procesy"
  //         />
  //       </div>
  //     <EDIT_PRODUKTY showEdit={showEdit} setShowEdit={setShowEdit}/>

  //     </div>
      
  //   );
  // }


    return (
      <div className={style.col_dane}>
        <label className={style.label}> Nakład </label>
        <input
          className={style.input}
          value={row?.naklad}
          onChange={(e) => {
            if (e.target.value === "" || reg_int.test(e.target.value)) {
              handleUpdateRowProdukty({
                ...row,
                naklad: e.target.value,
                update: true,
              });
              setStatus(3);
            }
          }}
        ></input>
      </div>
    );
  
}



const EDIT_PRODUKTY =({showEdit}) =>{

if(showEdit){
      return (
    <div className={style.grayScaleBackground}>
    <div className={style.window}>
     {/* <Header/> */}
CEnter
    </div>
    </div>
  );
}


}

function Header() {
  return (
    <div className={style.header}>
      <p className={style.title}> Nakład </p>
      {/* <Zamknij setShowAddClientPane={setShowAddClientPane}/> */}
    </div>
  );
}