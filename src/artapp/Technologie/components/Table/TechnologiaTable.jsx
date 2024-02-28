// tableka z technologiami

import style from "./TechnologiaTable.module.css";
export default function TechnologiaTable({dataTechnologie,setStageTEchnologiaVisible,setActiveRowId}){
return(
    <table>
    <thead>
      <tr>
        <th className={style.col_id}>#</th>
        <th className={style.col_nr}>Nr</th>
        <th className={style.col_rok}>Rok</th>
        <th className={style.col_tytul}>tytul</th>
       

      </tr>
    </thead>
    <tbody>
      {dataTechnologie.map((row) => {
        return (
          <tr 
            key={row.id}
            onDoubleClick={(node, event) => {
              setActiveRowId(row.id)
              setStageTEchnologiaVisible(true);
            }}
            onClick={()=> {
                // setRow(row.id)
            // console.log(row.id)
            }}
          >
            <td>{row.id} </td>
            <td>{row.nr} </td>
            <td>{row.rok} </td>
   
            <td>{row.tytul}</td>

          </tr>
        );
      })}
    </tbody>
  </table>
)
}