import style from "./LegiTech.module.css";

export default function RowLegi({
    row,

  }) {


    
    return (
      <tr  key={row.id}>

        <td>{row.indeks}</td>

      </tr>
    );
  }
  
