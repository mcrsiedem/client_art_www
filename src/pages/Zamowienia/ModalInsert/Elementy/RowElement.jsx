import style from "./ElementTable.module.css";
import Logo_ustawienia from "../../../../assets/settings.svg";
// import logoExpand from "../../../../assets/expand.svg";
import logoExpand from "assets/expand.svg";
import iconCopy from "../../../../assets/copy.svg";
import iconTrash from "../../../../assets/trash2.svg";
import {  useState,useContext } from "react";
import { _typ_elementu} from "utils/initialvalue"
import axios from "axios";

import { IP } from "../../../../utils/Host";
import { ModalInsertContext } from "context/ModalInsertContext";
import { reg_int, reg_txt } from "utils/initialvalue";
import { AppContext } from "context/AppContext";
import RowFragment from "./RowFragment";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
export default function RowElement({
    row,
    handleChangeCardElementy,
    setShowElementyProcesyInsert,
    handleChangeCardFragmenty_i_Elementy,
    handleChangeCardFragmenty_i_Elementy_IloscStron
  }) {
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy;
    const setElementy = contextModalInsert.setElementy;
    const fragmenty = contextModalInsert.fragmenty;
    const setFragmenty = contextModalInsert.setFragmenty;
    const procesyElementow = contextModalInsert.procesyElementow;
    const setProcesyElementow = contextModalInsert.setProcesyElementow;
    const [showFragmenty, setShowFragmenty] = useState(false);
  
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
          uwagi: card.uwagi,
        });

        newElementy.sort((a, b) => a.indeks - b.indeks);
        setElementy(newElementy);

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
          .filter((f) => f.element_id == card.id)
          .forEach((x) => {
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

        const newProcesyElementow = procesyElementow.slice();

        procesyElementow
        .filter((f) => f.element_id == card.id)
        .forEach((proces) => {
          newProcesyElementow.push({
            id: Math.max(...newProcesyElementow.map((f) => f.id)) + 1,
            zamowienie_id: proces.zamowienie_id,
            back_ilosc: proces.back_ilosc,
            back_kolor: proces.back_kolor,
            element_id: Math.max(...newElementy.map((f) => f.id)),
            front_ilosc: proces.front_ilosc,
            front_kolor: proces.front_kolor,
            info: proces.info,
            infoproces: proces.infoproces,
            mnoznik: proces.mnoznik,
            narzad: proces.narzad,
            nazwa: proces.nazwa,
            nazwa_id: proces.nazwa_id,
            obszar: proces.obszar,
            predkosc: proces.predkosc,
            proces_id: proces.proces_id,
            procesor_domyslny: proces.procesor_domyslny,
            produkt_id: proces.produkt_id,
            rodzaj: proces.rodzaj,
            typ: proces.typ,
            wykonczenie: proces.wykonczenie,
   
            indeks: Math.max(...newProcesyElementow.map((f) => f.indeks)) + 1,
          });
        });

        setProcesyElementow(newProcesyElementow);


      }
    return (
      <>
      <div className={style.row3} key={row.id}>
        <Rozwin  row={row} fragmenty={fragmenty} showFragmenty={showFragmenty} setShowFragmenty={setShowFragmenty} />
        <Typ  row={row} handleChangeCardElementy={handleChangeCardElementy} handleChangeCardFragmenty_i_Elementy={handleChangeCardFragmenty_i_Elementy}/>
        <Naklad row={row} handleChangeCardElementy={handleChangeCardElementy} />
        <Strony row={row} handleChangeCardElementy={handleChangeCardElementy} handleChangeCardFragmenty_i_Elementy_IloscStron={handleChangeCardFragmenty_i_Elementy_IloscStron}/>
        <NettoX row={row} handleChangeCardElementy={handleChangeCardElementy} />
        <NettoY row={row} handleChangeCardElementy={handleChangeCardElementy} />
        <Nazwa row={row} handleChangeCardElementy={handleChangeCardElementy} />
        <PapierSelect
          row={row}
          handleChangeCardElementy={handleChangeCardElementy}
        />
        <Gramatura
          row={row}
          handleChangeCardElementy={handleChangeCardElementy}
        />
        <Uwagi
          row={row}
          handleChangeCardElementy={handleChangeCardElementy}
        />

        <Procesy row={row} handleChangeCardElementy={handleChangeCardElementy} setShowElementyProcesyInsert={setShowElementyProcesyInsert} procesyElementow={procesyElementow}/>
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
      </div>
      {showFragmenty && (
        <>
          {fragmenty?.filter((x) => x.element_id == row.id)

            .map((row, i) => {
              return <RowFragment key={row.indeks} i={i} row={row} />;
            })}
          
        </>
      )}
      <DodajFragment row={row} fragmenty={fragmenty} setFragmenty={setFragmenty}/>
      </>
    );
  }

  function handleAddFirstFragment(card,fragmenty,setFragmenty) {
    const newFragmenty = fragmenty.slice();
  
    newFragmenty.push({
      id: getMaxID(fragmenty),
      zamowienie_id: card.zamowienie_id,
      ilosc_stron: card.ilosc_stron,
      produkt_id: card.produkt_id,
      typ: card.typ,
      wersja: card.nazwa,
      naklad: card.naklad,
      oprawa_id: card.oprawa_id,
      element_id: card.id,
      indeks: getMaxIndeks(newFragmenty),
    });
  
    newFragmenty.sort((a, b) => a.indeks - b.indeks);
    setFragmenty(newFragmenty);
  }

  function DodajFragment({ row, fragmenty,setFragmenty}) {

    if (fragmenty.filter(x=> x.element_id == row.id).length == 0){
         return (
        <button className={style.btn_dodaj_fragment} 
        onClick={()=>{handleAddFirstFragment(row,fragmenty,setFragmenty)}}>+</button>
     );
    }
 
   }
  function Rozwin({ fragmenty,row, showFragmenty, setShowFragmenty }) {
    if  (fragmenty?.filter((x) => x.element_id == row.id).length !== 0){
    return (
      <div>
        <img
          className={style.expand}
          src={logoExpand}
          onClick={() => {
            setShowFragmenty(!showFragmenty);
          }}
          alt="Procesy"
        />
      </div>
    );}else return <p> </p>
  }
  
function Procesy({ row}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const appContext = useContext(AppContext);

  const procesyElementow =contextModalInsert.procesyElementow;
  const setProcesyElementowTemporary =contextModalInsert.setProcesyElementowTemporary;

    return (
      <div id="procesy" className={style.procesy} >

      <div className={style.procesy_elementy}>
                    <img
            className={style.expand_procesy}
            src={Logo_ustawienia}
            onClick={() => {
              contextModalInsert.setShowElementyProcesyInsert(true);
              contextModalInsert.setSelectedElementROW(row)
              //kopia procesów do procesyElementowTemporary, aby mozna bylo zamknąć bez zapisywania
              setProcesyElementowTemporary(procesyElementow)
            }}
            alt="Procesy"
          />
       </div>



      <div className={style.procesy_elementy}>
            {procesyElementow
            .filter((frag) => frag.element_id == row.id)
            .sort((a, b) => a.indeks - b.indeks)
            .map((pr,i) =>  appContext.showMeProcessName( pr.nazwa_id)+" "
            )
            }
      </div>
 
    </div>
    );
  }
  
function Usun({ row, handleChangeCardElementy, handleRemoveItem }) {
  return (
    <div>
      <div>
        <img
          className={style.expand}
          src={iconTrash}
          onClick={() => {
            handleRemoveItem(row.indeks, row.id);
          }}
          alt="Procesy"
        />
      </div>
    </div>
  );
}

function Dodaj({ row, handleAddCard }) {
  return (
    <div >
      <img
        className={style.expand}
        src={iconCopy}
        onClick={() => {
          handleAddCard(row);
        }}
        alt="Procesy"
      />
    </div>
  );
}
  
  function Typ({ row, handleChangeCardElementy,handleChangeCardFragmenty_i_Elementy }) {

    //row - row element
    return (
     
        <select
          className={style.select}
          value={row.typ}
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
      
    );
  }
  
  function PapierSelect({
    row,handleChangeCardElementy
  }) {
    const appcontext = useContext(AppContext);
    const listaPapierowNazwy = appcontext.listaPapierowNazwy;

    return (
     
        <select
          className={style.select}
          value={row.papier_id}
          onChange={(e) => {
            handleChangeCardElementy({
              ...row,
              papier_id: e.target.value,
            });
          }}
        >
          {}
          {listaPapierowNazwy.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
        </select>
   
    );
  }
  
  function Gramatura({  row, handleChangeCardElementy}) {
    const appcontext = useContext(AppContext);
    const listaPapierow = appcontext.listaPapierow;
    return (
      
        <select
          className={style.select}
          
          value={row.gramatura_id}
          onChange={(e) =>
            handleChangeCardElementy({
              ...row,
              gramatura_id: e.target.value,
            })
          }
        >
          <option value="0">wybierz</option>
          {listaPapierow.filter((x) => x.nazwa_id == row.papier_id)
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
     
    );
  }
  
  function Naklad({ row, handleChangeCardElementy }) {
    return (
   
        <input
          className={style.input}
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
    
    );
  }
  function Nazwa({ row, handleChangeCardElementy }) {
    return (
     
        <input
          value={row.nazwa}
          className={style.input}
          onChange={(e) =>

 {      if ( e.target.value === '' || reg_txt.test(e.target.value)) {
             handleChangeCardElementy({
              ...row,
              nazwa: e.target.value,
            })}
          }
          }
        ></input>

    );
  }
  
  
  
  function Strony({ row, handleChangeCardElementy,handleChangeCardFragmenty_i_Elementy_IloscStron }) {
    return (
 
        <input
          value={row.ilosc_stron}
          className={style.input}
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

    );
  }
  function NettoX({ row, handleChangeCardElementy }) {
    return (
   
        <input
        className={style.input}
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
    
    );
  }
  function NettoY({ row, handleChangeCardElementy }) {
    return (
  
        <input
        className={style.input}
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
   
        <input
        className={style.input}
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
   
    );
  }
  
  function Uwagi({ row, handleChangeCardElementy }) {
    return (
  
        <input
        className={style.input}
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
 
    );
  }