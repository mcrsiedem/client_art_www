import style from "./ElementTable.module.css";
import Logo_ustawienia from "../../../../assets/settings.svg";
import logoExpand from "../../../../assets/expand.svg";
import iconCopy from "../../../../assets/copy.svg";
import iconTrash from "../../../../assets/trash2.svg";
import {  useState,useContext } from "react";
import { _typ_elementu} from "../api"
import axios from "axios";

import { IP } from "../../../../utils/Host";
import { ModalInsertContext } from "context/ModalInsertContext";
import { reg_int, reg_txt } from "utils/initialvalue";
export default function RowElement({
    row,
    handleChangeCardElementy,
    handleChangeCardFragmenty,
    i,
    listaPapierow,
    setListaGramatur,
    listaGramatur,
    setInfo,
    // isEdit,
    // setIsEdit,
    procesyElementow,
    setProcesyElementow,

    setShowElementyProcesyInsert,

    expand,setExpand,

    handleChangeCardFragmenty_i_Elementy,
    handleChangeCardFragmenty_i_Elementy_IloscStron
  }) {

    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy;
    const setElementy = contextModalInsert.setElementy;

    const fragmenty = contextModalInsert.fragmenty;
    const setFragmenty = contextModalInsert.setFragmenty;

    const [listaDostepnychWykonczen, setListaDostepnychWykonczen] =
      useState(listaGramatur);
    const [listaDostepnychGramatur, setListaDostepnychGrmatur] =
      useState(listaGramatur);
  
      const handleRemoveItem = (indeks,id) => {
        // id = id elementu
        if (elementy.length !== 1) {
          setElementy(elementy.filter((x) => x.indeks !== indeks));
          setFragmenty(fragmenty.filter((x) => x.element_id !== id));
        }
      
        setElementy((prev) =>
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

        console.log("Usun")
      };
      
      function handleAddCard(card) {
        const newElementy = elementy.slice();
      

        axios.post(IP + "elementy", {
          zamowienie_id: 0,
          produkt_id: 0,
          nazwa: 0,
          typ: 0,
          naklad: 0,
          strony: 0,
          kolory: 0,
          format_x: 0,
          format_y: 0,
          papier_id: 0,
          gramatura_id: 0,
          papier_info: 0,
          uwagi: "element temp",
          indeks:0
      }).then((res) => {

      newElementy.push({
          id: Math.max(...newElementy.map((f) => f.id)) + 1,
          zamowienie_id: card.zamowienie_id,
          produkt_id: card.produkt_id,
          naklad: card.naklad,
          indeks: Math.max(...newElementy.map((f) => f.indeks)) + 1,
          typ: card.typ,
          nazwa: card.nazwa,
          ilosc_stron: card.ilosc_stron,
          format_x: card.format_x,
          format_y: card.format_y,
          papier_id: card.papier_id,
          gramatura_id: card.gramatura_id,
          papier_info: card.papier_info,
          uwagi: card.uwagi
        
        });
      
        newElementy.sort((a, b) => a.indeks - b.indeks);
        setElementy(newElementy);


      })


      
  
        // setElementy((prev) =>prev.map((t)=> {return t}));
      
        //-------------------
        const newFragmenty = fragmenty.slice();
       

        newFragmenty.map((x) => {
          if (x.indeks > card.indeks) {
            return {
              ...x,
          
            };
          } else {
            return x;
          }
        });
      
 newFragmenty 
        .filter((f) => f.element_id == card.id )
        .forEach(x => {
          newFragmenty.push({
            id: Math.max(...newFragmenty.map((f) => f.id)) + 1,
            zamowienie_id: card.zamowienie_id,
            produkt_id: card.produkt_id,
            ilosc_stron: card.ilosc_stron,
            naklad: card.naklad,
            typ: card.typ,
            oprawa_id: x.oprawa_id,
            element_id: Math.max(...elementy.map((f) => f.id)) + 1,
            indeks: Math.max(...newFragmenty.map((f) => f.indeks)) + 1,
          });

        });


        newFragmenty.sort((a, b) => a.indeks - b.indeks);
        setFragmenty(newFragmenty);
      }
    return (
      <tr  key={row.id}>
                <div className={style.col_button}>
          <img
            src={logoExpand}
            className={style.icon}
            onClick={() => {
              setExpand(!expand);
            }}
            alt="Procesy"
          />
        </div>
        {/* <td>{row.id}</td> */}
        <td>{row.indeks}</td>
        <Typ  row={row} handleChangeCardElementy={handleChangeCardElementy} handleChangeCardFragmenty_i_Elementy={handleChangeCardFragmenty_i_Elementy}/>
        <Naklad row={row} handleChangeCardElementy={handleChangeCardElementy} />
      
        <Nazwa row={row} handleChangeCardElementy={handleChangeCardElementy} />
      
        <Strony row={row} handleChangeCardElementy={handleChangeCardElementy} handleChangeCardFragmenty_i_Elementy_IloscStron={handleChangeCardFragmenty_i_Elementy_IloscStron}/>
        <NettoX row={row} handleChangeCardElementy={handleChangeCardElementy} />
        <NettoY row={row} handleChangeCardElementy={handleChangeCardElementy} />

        <PapierSelect
          row={row}
          handleChangeCardElementy={handleChangeCardElementy}
          listaGramatur={listaGramatur}
          listaDostepnychWykonczen={listaDostepnychWykonczen}
          setListaDostepnychWykonczen={setListaDostepnychWykonczen}
          listaPapierow={listaPapierow}
          setListaGramatur={setListaGramatur}
          listaDostepnychGramatur={listaDostepnychGramatur}
          setListaDostepnychGrmatur={setListaDostepnychGrmatur}
        />
        <Gramatura
          row={row}
          handleChangeCardElementy={handleChangeCardElementy}
          listaGramatur={listaGramatur}
          listaDostepnychGramatur={listaDostepnychGramatur}
        />
        <PapierInfo
          row={row}
          handleChangeCardElementy={handleChangeCardElementy}
        />



        <Procesy row={row} handleChangeCardElementy={handleChangeCardElementy} setShowElementyProcesyInsert={setShowElementyProcesyInsert} procesyElementow={procesyElementow}/>
        <Uwagi row={row} handleChangeCardElementy={handleChangeCardElementy} />

        <td></td>

        <Usun
          row={row}
          handleChangeCardElementy={handleChangeCardElementy}
          handleRemoveItem={handleRemoveItem}
        />
        <Dodaj
          row={row}
          handleChangeCardElementy={handleChangeCardElementy}
          handleAddCard={handleAddCard}
        />
      </tr>
    );
  }
  
function Procesy({ row, procesyElementow}) {
  const contextModalInsert = useContext(ModalInsertContext);
    return (
      <td className={style.col_button} id="procesy">
      <img
        className={style.expand}
        src={Logo_ustawienia}
        onClick={() => {
          contextModalInsert.setShowElementyProcesyInsert(true);
          contextModalInsert.setSelectedElementROW(row)
          console.log("id: "+row.id)
        }}
        alt="Procesy"
      />
      {procesyElementow
        .filter((frag) => frag.element_id === row.id)
        .map((pr) => pr.proces)}
    </td>
    );
  }
  
function Usun({ row, handleChangeCardElementy,handleRemoveItem }) {
    return (
      <td className={style.col_button}>
        <div >
                        <img
           className={style.expand}
            src={iconTrash}
            onClick={() => {handleRemoveItem(row.indeks, row.id)}}
            alt="Procesy"
          />
        </div>

      </td>
    );
  }
  
  function Dodaj({ row, handleChangeCardElementy ,handleAddCard}) {
    return (
      <td className={style.col_button} >
              <img
           className={style.expand}
            src={iconCopy}
            onClick={() => {handleAddCard(row)}}
            alt="Procesy"
          />
      </td>
    );
  }
  
  function Typ({ row, handleChangeCardElementy,handleChangeCardFragmenty_i_Elementy }) {

    //row - row element
    return (
      <td>
        <select
          className={style.select}
          defaultValue={row.typ}
          onChange={(e) => {

            handleChangeCardFragmenty_i_Elementy({
              ...row,
              typ: e.target.value,
            }
            );

          }}

          


        >
          {}
          {_typ_elementu.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
        </select>
      </td>
    );
  }
  
  function PapierSelect({
    row,
    handleChangeCardElementy,
    listaPapierow,
    setListaGramatur,
    listaGramatur,
    listaDostepnychWykonczen,
    setListaDostepnychWykonczen,
    listaDostepnychGramatur,
    setListaDostepnychGrmatur,
  }) {
    return (
      <td>
        <select
          //  listaPapierow pobierana po otwarciu okienka dodaj zmamowienie ModalInsert
          //  po wybraniu papieru filtruje się lista gramatur i czeka do wybrania z osobnym selecie
          //  jednocześnie aktualizuje się papier_id w odpowiednim row w stanie elementów
          // następnie wybieramy gramaturę, która aktualizuje gramatura_id w odpowiednim row
          className={style.select}
          defaultValue={row.papier_id}
          onChange={(e) => {
            setListaDostepnychGrmatur(
              listaGramatur.filter((wyk) => wyk.papier_id == e.target.value)
            );
            handleChangeCardElementy({
              ...row,
              papier_id: e.target.value,
            });
          }}
        >
          {}
          {listaPapierow.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
        </select>
      </td>
    );
  }
  
  function Gramatura({
    row,
    handleChangeCardElementy,
    listaGramatur,
    listaDostepnychGramatur,
  }) {
    return (
      <td>
        <select
          className={style.select}
          defaultValue={row.gramatura_id}
          onChange={(e) =>
            handleChangeCardElementy({
              ...row,
              gramatura_id: e.target.value,
            })
          }
        >
          <option value="0">wybierz</option>
          {listaDostepnychGramatur
            .sort((a, c) => a.gramatura - c.gramatura)
            .map((option) =>
              row.papier_id !== 7 ? (
                <option key={option.id} value={option.id}>
                  {option.gramatura}{" "}
                  {option.bulk !== 1 ? (
                    <p>
                      {" "}
                      g/m2 vol. {option.bulk} {option.wykonczenie}
                    </p>
                  ) : (
                    <p>g/m2 </p>
                  )}
                </option>
              ) : (
                <option key={option.id} value={option.id}>
                  {/* {option.gramatura} g/m2 vol. {option.bulk}  {option.wykonczenie} */}
                </option>
              )
            )}
        </select>
      </td>
    );
  }
  
  function Naklad({ row, handleChangeCardElementy }) {
    return (
      <td>
        <input
          className={style.col_naklad}
          value={row.naklad}
          onChange={(e) =>
            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
              handleChangeCardElementy({
              ...row,
              naklad: e.target.value,
            })}}
          }
        ></input>
      </td>
    );
  }
  function Nazwa({ row, handleChangeCardElementy }) {
    return (
      <td>
        <input
          value={row.nazwa}
          onChange={(e) =>

 {      if ( e.target.value === '' || reg_txt.test(e.target.value)) {
             handleChangeCardElementy({
              ...row,
              nazwa: e.target.value,
            })}
          }
          }
        ></input>
      </td>
    );
  }
  
  
  
  function Strony({ row, handleChangeCardElementy,handleChangeCardFragmenty_i_Elementy_IloscStron }) {
    return (
      <td>
        <input
          value={row.ilosc_stron}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
              handleChangeCardFragmenty_i_Elementy_IloscStron({
              ...row,
              ilosc_stron: e.target.value,
            }
            )}}

          }
        ></input>
      </td>
    );
  }
  function NettoX({ row, handleChangeCardElementy }) {
    return (
      <td className={style.col_format}>
        <input
          value={row.format_x}
          onChange={(e) => {
            const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

            if (e.target.value === "" || re.test(e.target.value)) {
              handleChangeCardElementy({
                ...row,
                format_x: e.target.value,
              });
            }
          }}
        ></input>
      </td>
    );
  }
  function NettoY({ row, handleChangeCardElementy }) {
    return (
      <td className={style.col_format}>
        <input
          value={row.format_y}
          onChange={(e) => {
            const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

            if (e.target.value === "" || re.test(e.target.value)) {
              handleChangeCardElementy({
                ...row,
                format_y: e.target.value,
              });
            }
          }}
        ></input>
      </td>
    );
  }
  function Kolory({ row, handleChangeCardElementy }) {
    return (
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
    );
  }
  
  function PapierInfo({ row, handleChangeCardElementy }) {
    return (
      <td>
        <input
          value={row.papier_info}
          onChange={(e) =>
            {      if ( e.target.value === '' || reg_txt.test(e.target.value)) {
              handleChangeCardElementy({
              ...row,
              papier_info: e.target.value,
            })
            }}
          }
        ></input>
      </td>
    );
  }
  
  function Uwagi({ row, handleChangeCardElementy }) {
    return (
      <td>
        <input
          value={row.uwagi}
          onChange={(e) =>
            {
              if ( e.target.value === '' || reg_txt.test(e.target.value)) {
              handleChangeCardElementy({
              ...row,
              uwagi: e.target.value,
            })}
          }
          }
        ></input>
      </td>
    );
  }