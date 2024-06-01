import context from "react-bootstrap/esm/AccordionContext";
import style from "./LegiTech.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { reg_int } from "utils/initialvalue";
import { useContext } from "react";

import iconTrash from "assets/trash2.svg"

export default function RowLegi({
    row,

  }) {


    
    return (
      <tr  className={style.tr_legi} key={row.id}>

        <td>{row.indeks}</td> 
        <td>{row.rodzaj_elementu}</td> 
        <TypLegi row={row}/>
        <td>{row.naklad}</td> 
        <td>{row.uwagi}</td> 
        <td>{row.element_id}</td> 
        <td>{row.ilosc_stron}</td> 
        <Usun row={row}/>
      </tr>
    );
  }

  const TypLegi = ({row}) =>{
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowLegi = techContext.handleUpdateRowLegi;
    return (
      <td>
        <input
          value={row.typ_legi}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowLegi({
              ...row,
              typ_legi: e.target.value,
            }
            )}}

          }
        ></input>
      </td>
    );
  }

  function Usun({ row }) {
    const techContext = useContext(TechnologyContext)
    const legi = techContext.legi;
    const setLegi = techContext.setLegi;

    const handleRemoveLega = (indeks,id,legi,setLegi) => {
      // id = id elementu
      if (legi.length !== 1) {
        setLegi(legi.filter((x) => x.indeks !== indeks));
        // setFragmenty(fragmenty.filter((x) => x.element_id !== id));
      }
    
      setLegi((prev) =>
        prev.map((t, a) => {
          if (t.indeks > indeks) {
            return {
              ...t,
              indeks: t.indeks--,
            };
          } else {
            return t;
          }
        })
      );

      console.log("Usun lege")
    };

    return (
      <td className={style.col_button}>
        <div>
          <img
            className={style.expand}
            src={iconTrash}
            onClick={() => {
              handleRemoveLega(row.indeks, row.id,legi,setLegi)
              // handleRemoveItem(row.indeks, row.id);
            }}
            alt="Procesy"
          />
        </div>
      </td>
    );
  }
  
  // function Dodaj({ row, handleChangeCardElementy, handleAddCard }) {
  //   return (
  //     <td className={style.col_button}>
  //       <img
  //         className={style.expand}
  //         src={iconCopy}
  //         onClick={() => {
  //           handleAddCard(row);
  //         }}
  //         alt="Procesy"
  //       />
  //     </td>
  //   );
  // }
  

