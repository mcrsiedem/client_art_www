// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementTable.module.css";
import { _papiery } from "../../api";
import ElementTableHeader from "./ElementTableHeader";



export default function ElementTable({elementy,setElementy,handleChangeCardElementy,
  selected_papier,setSelected_papier,fragmenty,setFragmenty,
info,setInfo,listaWykonczenia,listaPapierow,listaGramatur}) {

  return (
    <div className={style.elementCard}>
        
      <ElementTableHeader
        // card={card}
        elementy={elementy}
        setElementy={setElementy}
        fragmenty={fragmenty}
        setFragmenty={setFragmenty}
      />

      <div className={style.main}>
  
<table className={style.table2}>
<thead>
          <tr >
            {/* <th className={style.col1}>Zam.</th>
            <th className={style.col2}>Prod.</th>
            <th className={style.col3}>#</th> */}
            <th className={style.col1}>#</th>
            <th className={style.col2}>Typ</th>
            <th >Nakład</th>
            <th className={style.col_wersja}>Wersja</th>
            <th className={style.col_strony}>Strony</th>
            <th className={style.col_format} colspan="2">Netto</th>
            <th className={style.col_kolory}>Kolory</th>
           
            <th className={style.col7}>Papier</th>
            <th className={style.col_wykonczenie}>matt / gloss</th>
            <th className={style.col_gramatura}>g/m2</th>
            {/* <th className={style.col_gramatura}>Vol.</th> */}
            <th className={style.col7}>Lakier</th>
            <th className={style.col7}>OK</th>
          </tr>

        </thead>
        <tbody>

        {elementy.map((row,i) => {
                                return (
                                  <tr
                                    key={row.id}
                                    // onDoubleClick={(node, event) => {

                                    //     setOpenModal(true);
                                    //     setRow({ id: row.id, user: row.user });
                                    // }}
                                  >
                                    {/* <td>{row.zamowienie_id}</td>
                                            <td>{row.produkt_id}</td>
                                            <td>{row.id}</td> */}
                                    <td>{i + 1}</td>
                                    <td>{row.typ}</td>
                                    <td>
                                      <input
                                        className={style.col_naklad}
                                        defaultValue={row.naklad}
                                        onChange={(e) =>
                                          handleChangeCardElementy({
                                            ...row,
                                            naklad: e.target.value,
                                          })
                                        }
                                      ></input>
                                    </td>
                                    <td>
                                      <input
                                        defaultValue={row.nazwa}
                                        onChange={(e) =>
                                          handleChangeCardElementy({
                                            ...row,
                                            nazwa: e.target.value,
                                          })
                                        }
                                      ></input>
                                    </td>
                                    <td>
                                      <input
                                        defaultValue={row.ilosc_stron}
                                        onChange={(e) =>
                                          handleChangeCardElementy({
                                            ...row,
                                            ilosc_stron: e.target.value,
                                          })
                                        }
                                      ></input>
                                    </td>
                                    <td className={style.col_format}>
                                      <input
                                        defaultValue={row.format_x}
                                        onChange={(e) =>
                                          handleChangeCardElementy({
                                            ...row,
                                            format_x: e.target.value,
                                          })
                                        }
                                      ></input>
                                    </td>
                                    <td className={style.col_format}>
                                      <input
                                        defaultValue={row.format_y}
                                        onChange={(e) =>
                                          handleChangeCardElementy({
                                            ...row,
                                            format_y: e.target.value,
                                          })
                                        }
                                      ></input>
                                    </td>
                                    <td>
                                      <input
                                        defaultValue={row.kolory}
                                        onChange={(e) =>
                                          handleChangeCardElementy({
                                            ...row,
                                            kolory: e.target.value,
                                          })
                                        }
                                      ></input>
                                    </td>
                                    {/* <td><input defaultValue={row.papier_id} onChange={(e)=>handleChangeCardElementy({ ...row, papier_id: e.target.value })}></input></td> */}

                                    <PapierSelect
                                      row={row}
                                      handleChangeCardElementy={handleChangeCardElementy}
                                      listaPapierow={listaPapierow}
                                    />

                                    <WykonczenieSelect
                                      row={row}
                                      handleChangeCardElementy={handleChangeCardElementy}
                                      listaGramatur={listaGramatur}
                                    />

                                    <td>
                                      <select
                                        className={style.select}
                                        defaultValue={row.gramatura}
                                        onChange={(e) =>
                                          handleChangeCardElementy({
                                            ...row,
                                            gramatura: e.target.value,
                                          })
                                        }
                                      >
                                        {listaGramatur.map((option) => (
                                          <option
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.gramatura} g/m2 vol.{" "}
                                            {option.bulk}
                                          </option>
                                        ))}
                                      </select>
                                    </td>

                                    {/* <td><input defaultValue={row.wolumen} onChange={(e)=>handleChangeCardElementy({ ...row, wolumen: e.target.value })}></input></td> */}

                                    <td>{row.uszlachetnianie_id}</td>
                                    <td>
                                      <button onClick={() => setInfo("OK")}>
                                        OK
                                      </button>
                                    </td>
                                  </tr>
                                );
                                })}
    
        </tbody>
</table>

   
      </div>
      {/* <CardCenter
        card={card}
        setElementy={setElementy}
        handleChangeCardElementy={handleChangeCardElementy}
        selected_papier={selected_papier}
        setSelected_papier={setSelected_papier}
      /> */}

    </div>
  );
}


function PapierSelect({row,handleChangeCardElementy,listaPapierow}){

  return (
    <td>
    <select
      className={style.select}
      defaultValue={row.papier_id}
      onChange={(e) =>
        handleChangeCardElementy({
          ...row,
          papier_id: e.target.value,
        })
      }
    >
      {listaPapierow
      // .filter((pap) => pap.element_id === element.id)
      .map((option) => (
        <option
          key={option.id}
          value={option.id}
        >
          {option.nazwa}
        </option>
      ))}
    </select>
  </td>
  )
}

function WykonczenieSelect({row,handleChangeCardElementy,listaGramatur}){
  return(
    <td>
    <select
      className={style.select}
      defaultValue={row.wykonczenie}
      onChange={(e) =>
        handleChangeCardElementy({
          ...row,
          wykonczenie: e.target.value,
        })
      }
    >
      {listaGramatur
       .filter((wyk) => wyk.papier_id === row.papier_id)
        .map((el)=> el.wykonczenie)
       .filter((currentValue, index, arr) => (
          arr.indexOf(currentValue) === index
        ))
      .map((option) => (
        <option
          key={option.id}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  </td>
  )
}
// myArray.filter((value, index, array) => array.indexOf(value) === index);