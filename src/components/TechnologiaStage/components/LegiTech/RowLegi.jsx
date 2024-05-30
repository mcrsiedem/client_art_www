import style from "./LegiTech.module.css";

export default function RowLegi({
    row,

  }) {


    
    return (
      <tr  className={style.tr_legi} key={row.id}>

        <td>{row.indeks}</td> 
        <td>{row.rodzaj_elementu}</td> 
        <td>{row.typ_legi}</td> 
        <td>{row.naklad}</td> 
        <td>{row.uwagi}</td> 
        <td>{row.element_id}</td> 

      </tr>
    );
  }
  
