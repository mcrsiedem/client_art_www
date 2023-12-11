// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementTable.module.css";
import { _papiery } from "../../api";
import ElementTableHeader from "./ElementTableHeader";
import { useState } from "react";



export default function ElementTable({elementy,setElementy,handleChangeCardElementy,
  selected_papier,setSelected_papier,fragmenty,setFragmenty,
info,setInfo,listaWykonczen,setListaWykonczen,listaPapierow,listaGramatur,setListaGramatur,isEdit,setIsEdit}) {

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
            <tr>
              <th className={style.col1}>#</th>
              <th className={style.col_typ}>Typ</th>
              <th className={style.col_naklad}>Nakład</th>
              <th className={style.col_wersja}>Wersja</th>
              <th className={style.col_strony}>Strony</th>
              <th className={style.col_format} colspan="2"> Netto </th>
              <th className={style.col_kolory}>Kolory</th>
              <th className={style.col_papier}>Papier</th>
              <th className={style.col_wykonczenie}>matt / gloss</th>
              <th className={style.col_gramatura}>g/m2</th>
              <th className={style.col7}>Lakier</th>
              <th className={style.col7}>OK</th>
            </tr>
          </thead>
          <tbody>
            {elementy.map((row, i) => {
              return (
                <RowElement
                  i={i}
                  row={row}
                  handleChangeCardElementy={handleChangeCardElementy}
                  listaPapierow={listaPapierow}
                  listaGramatur={listaGramatur}
                  setListaGramatur={setListaGramatur}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function RowElement({row,handleChangeCardElementy,i,listaPapierow,setListaGramatur,listaGramatur, setInfo,isEdit,setIsEdit}){

  const [listaDostepnychWykonczen,setListaDostepnychWykonczen] = useState(listaGramatur)
  const [listaDostepnychGramatur,setListaDostepnychGrmatur] = useState(listaGramatur)
  return (
    <tr key={row.id}>

      <td>{i + 1}</td>
      <Typ row={row} />
      <Naklad row={row} handleChangeCardElementy={handleChangeCardElementy} />
      <Nazwa row={row} handleChangeCardElementy={handleChangeCardElementy} />
      <Strony row={row} handleChangeCardElementy={handleChangeCardElementy} />
      <NettoX row={row} handleChangeCardElementy={handleChangeCardElementy} />
      <NettoY row={row} handleChangeCardElementy={handleChangeCardElementy} />
      <Kolory row={row} handleChangeCardElementy={handleChangeCardElementy} />
      <PapierSelect row={row} handleChangeCardElementy={handleChangeCardElementy} listaGramatur={listaGramatur} listaDostepnychWykonczen={listaDostepnychWykonczen} setListaDostepnychWykonczen={setListaDostepnychWykonczen} listaPapierow={listaPapierow} setListaGramatur={setListaGramatur} listaDostepnychGramatur={listaDostepnychGramatur} setListaDostepnychGrmatur={setListaDostepnychGrmatur}    />
      <WykonczenieSelect  row={row} handleChangeCardElementy={handleChangeCardElementy} listaDostepnychWykonczen={listaDostepnychWykonczen} setListaDostepnychWykonczen={setListaDostepnychWykonczen} listaGramatur={listaGramatur}        isEdit={isEdit}
            setIsEdit={setIsEdit}/>
      <Gramatura  row={row} handleChangeCardElementy={handleChangeCardElementy} listaGramatur={listaGramatur} listaDostepnychGramatur={listaDostepnychGramatur}/>
      <td>{row.uszlachetnianie_id}</td>
      <td>
        <button onClick={() => console.log(listaDostepnychWykonczen)}>OK</button>
      </td>
    </tr>
  );
}


function PapierSelect({row,handleChangeCardElementy,listaPapierow,setListaGramatur,listaGramatur,listaDostepnychWykonczen,setListaDostepnychWykonczen, listaDostepnychGramatur,setListaDostepnychGrmatur}){

  return (
    <td>
    <select
      className={style.select}
      defaultValue={row.papier_id}
      onChange=
      {
        (e) =>
              { 

                setListaDostepnychWykonczen(listaGramatur.filter((wyk) => wyk.papier_id ==  e.target.value));
                setListaDostepnychGrmatur(listaGramatur.filter((wyk) => wyk.papier_id ==  e.target.value));
                handleChangeCardElementy({
                  ...row,
                  papier_id: e.target.value,
                   wykonczenie: listaDostepnychWykonczen[0].wykonczenie,
                });


                // handleChangeCardElementy({
                //   ...row,
                //   wykonczenie: listaDostepnychWykonczen[0].wykonczenie,
                // });

              }
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

function WykonczenieSelect({row,handleChangeCardElementy,listaGramatur,listaDostepnychWykonczen,setListaDostepnychWykonczen,isEdit,setIsEdit}){
  return(
    <td>
    <select
      className={style.select}
      // defaultValue={isEdit ? row.wykonczenie : "n/d"}
      defaultValue={row.wykonczenie}
      onChange={(e) =>
        handleChangeCardElementy({
          ...row,
          wykonczenie: e.target.value,
        })
      }
    >
      {listaDostepnychWykonczen

        .map((el)=> el.wykonczenie)
       .filter((currentValue, index, arr) => (
          arr.indexOf(currentValue) === index
        ))
      .map((option) => (
        <option
          key={option.id}
          value={option}
        >
          { option }
        </option>
      ))}
    </select>
  </td>
  )
}
function Naklad({row,handleChangeCardElementy}){
  return(
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
  )
}
function Nazwa({row,handleChangeCardElementy}){
  return(
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
  )
}


function Typ({row}){
  return(
    <td>{row.typ}</td>
  )
}

function Strony({row,handleChangeCardElementy}){
  return(
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
  )
}
function NettoX({row,handleChangeCardElementy}){
  return(
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
  )
}
function NettoY({row,handleChangeCardElementy}){
  return(
      
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
  )
}
function Kolory({row,handleChangeCardElementy}){
  return(
      
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
  )
}
function Gramatura({row,handleChangeCardElementy,listaGramatur, listaDostepnychGramatur}){
  return(
      
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
      {listaDostepnychGramatur.map((option) => (
        <option key={option.id} value={option.id}>
          {option.gramatura} g/m2 vol. {option.bulk}
        </option>
      ))}
    </select>
  </td>
  )
}






// myArray.filter((value, index, array) => array.indexOf(value) === index);