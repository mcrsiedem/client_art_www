import style from "./IntroligatorniaTable.module.css";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import { _typ_elementu } from "utils/initialvalue";

export default function IntroligatorniaTable() {

    const techContext = useContext(TechnologyContext);
    const oprawaTech = techContext.oprawaTech;

  return (
    <div className={style.container}>

            {oprawaTech.map(row=>  <OprawaRow row={row} /> )}
  
    </div>
  );
}


const OprawaRow = ({ row }) => {

  // row to jest
  const techContext = useContext(TechnologyContext);
    const legiFragmenty = techContext.legiFragmenty;

    function handleDragStart(id){
      //   e.preventDefault();
  console.log("drag start :", id)
      // setDragLegaId(id)
     }
    function handleDrop(id) {
  
    //   setLegi(
    //     legi.map((t, a) => {
    
    //     if (t.id === dragLegaId) {
    //       return {
    //         ...t,
    //         arkusz_id: id
  
    //       };
    //     } else {
    //       return t;
    //     }
    //   })
    // );
    //   console.log("drop: "+id)
    //   setDropArkuszId(id)
    }
  
    function handleDragOver(e) {
      e.preventDefault();
    }
  return (
    <>
      <div className={style.row1}>
    <RodzajOprawy row={row} />

      <div>{row.naklad}</div>
      </div>
   
          {legiFragmenty.
          filter(f=> f.oprawa_id == row.id).
          map(row=>  <LegaFragmentRow row={row}  draggable  onDragStart={()=>handleDragStart(row.id)}/> )}

</>
            

  );
};


const LegaFragmentRow = ({ row }) => {


  return (
    <tr key={row.id}>
      <td className={style.typ_elementu}>{_typ_elementu.filter(x => x.id == row.typ)[0].nazwa}</td>
     
      <td>{row.indeks}</td>
      <td>{row.oprawa_id}</td>
      <td>{row.naklad}</td>
      <td>idx {row.indeks}</td>
      <td></td>
    </tr>
  );
};





function RodzajOprawy({ row, handleChangeCardOprawa }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const produkty = contextModalInsert.produkty;
  const setProdukty = contextModalInsert.setProdukty;
  const contextApp = useContext(AppContext);

  return (

    <div className={style.col_dane}>
      <label className={style.label}> Oprawa </label>
      <select
        className={style.select}
        defaultValue={row.oprawa}
        onChange={(event) => {
          handleChangeCardOprawa({ ...row, oprawa: event.target.value });

          if (row.indeks == 0) {
            setProdukty(
              produkty.map((p) => {
                if (p.id === row.produkt_id) {
                  return { ...p, oprawa: event.target.value };
                } else {
                  return p;
                }
              })
            );
          }
        }}
      >
        {contextApp.bindingType.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
      </div>
  );}
