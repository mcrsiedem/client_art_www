import style from "./ElementTable.module.css";
import Logo_ustawienia from "assets/settings.svg";
import logoExpand from "../../../../assets/expand.svg";
import iconCopy from "../../../../assets/copy.svg";
import iconTrash from "../../../../assets/trash2.svg";
import { useState, useContext } from "react";
import { _typ_elementu } from "utils/initialvalue";
import axios from "axios";

import { IP } from "../../../../utils/Host";
import { ModalInsertContext } from "context/ModalInsertContext";
import { reg_int, reg_txt } from "utils/initialvalue";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { addArkusze } from "actions/addArkusze";
import { createLegi } from "actions/createLegi";
import { createArkusze } from "actions/createArkusze";
import { createGrupaWykonan } from "actions/createGrupaWykonan";
import { createArkuszeFromElemenets } from "actions/createArkuszeFromElements";
import RowArkusze from "../ArkuszeTech/components/RowArkusze";

export default function RowTechElement({
  row,
  handleChangeCardElementy,
  // listaPapierow,
  // setListaGramatur,
  procesyElementow,
  setShowElementyProcesyInsert,
  // handleChangeCardFragmenty_i_Elementy,
  // handleChangeCardFragmenty_i_Elementy_IloscStron,
}) {
  const appcontext = useContext(AppContext);
  const techContext = useContext(TechnologyContext);
  const listaGramatur = appcontext.listaGramatur;
  
  const elementy = techContext.elementy;
  const setElementy = techContext.setElementy;
  const fragmenty = techContext.fragmenty;
  const setFragmenty = techContext.setFragmenty;

  // const [listaDostepnychWykonczen, setListaDostepnychWykonczen] =
  //   useState(listaGramatur);
  // const [listaDostepnychGramatur, setListaDostepnychGrmatur] =
  //   useState(listaGramatur);



  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;
  const legiFragmenty = techContext.legiFragmenty;
  const setLegiFragmenty = techContext.setLegiFragmenty;
  const procesy = techContext.procesyElementow;
  const grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const oprawaTech = techContext.oprawaTech;
  const setOprawaTech = techContext.setOprawaTech;
  const fragmentyTech = techContext.fragmentyTech;
  const setFragmentyTech = techContext.setFragmentyTech;
  const setElementyTech = techContext.setElementyTech;
  const handleChangeCardFragmenty_i_Elementy_Tech = techContext.handleChangeCardFragmenty_i_Elementy_Tech;

  const elementyTech = techContext.elementyTech;
  const [showLegi, setShowLegi] = useState(false);
  const [listaGramaturSelect, setListaGramaturSelect] = useState(listaGramatur.filter(x => x.papier_id == row.papier_id));

  const handleRemoveItem = (indeks, id) => {
    // id = id elementu
    if (elementyTech.length !== 1) {
      setElementyTech(elementyTech.filter((x) => x.indeks !== indeks));
      setFragmentyTech(fragmentyTech.filter((x) => x.element_id !== id));
    }

    setElementyTech((prev) =>
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

    console.log("Usun");
  };


  return (
    <>
           <div className={style.row3} key={row.id}>
        {/* <div className={style.col_button}>
          <img
            src={Logo_ustawienia}
            className={style.expand}
            onClick={() => {
              // createLegi(row,legi,setLegi);
              createArkuszeFromElemenets(
                arkusze,
                setArkusze,
                legi,
                setLegi,
                legiFragmenty,
                setLegiFragmenty,
                oprawaTech,
                setOprawaTech,
                fragmentyTech,
                setFragmentyTech,
                elementyTech,
                row, procesy, grupaWykonan, setGrupaWykonan,wykonania, setWykonania
              );
              // createArkusze(row,arkusze,setArkusze,legi, setLegi,legiFragmenty,setLegiFragmenty,oprawaTech,setOprawaTech,fragmentyTech,setFragmentyTech)
              // createGrupaWykonan(row, procesy, grupaWykonan, setGrupaWykonan, legi, arkusze,wykonania, setWykonania);
              // console.log("fragmenty tech: ", fragmentyTech)
            }}
            alt="Procesy"
          />
        </div> */}
        {/* <td>{row.id}</td> */}
        {/* <td>{row.indeks}</td> */}
        <Typ
          row={row}
          handleChangeCardFragmenty_i_Elementy_Tech={handleChangeCardFragmenty_i_Elementy_Tech }
        />
        <Naklad row={row} />
      
        <Strony row={row} />
        <NettoX row={row} />
        <NettoY row={row} />
        <Nazwa row={row} />
        <PapierSelect
          row={row}
          handleChangeCardFragmenty_i_Elementy_Tech={handleChangeCardFragmenty_i_Elementy_Tech}
          listaGramatur={listaGramatur}
          listaGramaturSelect={listaGramaturSelect}
          setListaGramaturSelect={setListaGramaturSelect}

        />
        <Gramatura
          row={row}
          handleChangeCardFragmenty_i_Elementy_Tech={handleChangeCardFragmenty_i_Elementy_Tech}
          listaGramaturSelect={listaGramaturSelect}

        />
           <Uwagi row={row} />
        {/* <PapierInfo
          row={row}
          handleChangeCardElementy={handleChangeCardElementy}
        /> */}

        <Procesy
          row={row}
          handleChangeCardElementy={handleChangeCardElementy}
          setShowElementyProcesyInsert={setShowElementyProcesyInsert}
          procesyElementow={procesyElementow}
        />
        <ArkuszSzerokosc row={row} />
        <ArkuszWysokosc row={row} />
        <Lega row={row} />
        <IloscLeg row={row} />
     

        {/* <td></td> */}

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
      <>
              {arkusze
              .filter(x => x.element_id == row.id)

            .map((row, i) => {
              return <RowArkusze key={row.indeks} i={i} row={row} showLegi={showLegi} />;
            })}
      </>
    </>
  );

  function handleAddCard(rowTechElement) {
    const newElementyTech = elementyTech.slice();
    
    newElementyTech.push({
      id: Math.max(...newElementyTech.map((f) => f.id)) + 1,
      zamowienie_id: rowTechElement.zamowienie_id,
      produkt_id: rowTechElement.produkt_id,
      naklad: rowTechElement.naklad,
      indeks: Math.max(...newElementyTech.map((f) => f.indeks)) + 1,
      typ: rowTechElement.typ,
      nazwa: rowTechElement.nazwa,
      ilosc_stron: rowTechElement.ilosc_stron,
      format_x: rowTechElement.format_x,
      format_y: rowTechElement.format_y,
      papier_id: rowTechElement.papier_id,
      gramatura_id: rowTechElement.gramatura_id,
      papier_info: rowTechElement.papier_info,
      uwagi: rowTechElement.uwagi,
      lega: rowTechElement.lega,
      ilosc_leg: rowTechElement.ilosc_leg,
    });

    newElementyTech.sort((a, b) => a.indeks - b.indeks);
    setElementyTech(newElementyTech);

  }

  function handleAddCard2(card) {

    //do skasowania
    const newElementy = elementy.slice();

    axios
      .post(IP + "elementy", {
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
        indeks: 0,
      })
      .then((res) => {
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
      });

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
  }
}

function Procesy({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const appContext = useContext(AppContext);
  const techontext = useContext(TechnologyContext);



  const procesyElementow = techontext.procesyElementow;
  const setProcesyElementowTemporary =  contextModalInsert.setProcesyElementowTemporary;


  const procesyElementowTech = techontext.procesyElementowTech;
  const setProcesyElementowTechTemporary =  techontext.setProcesyElementowTechTemporary;

  return (
    <div id="procesy" className={style.procesy} >
      <img
        className={style.expand}
        src={Logo_ustawienia}
        onClick={() => {
          
          techontext.setShowElementyTechProcesyInsert(true);
          techontext.setSelectedElementTechROW(row);
          //kopia procesów do procesyElementowTemporary, aby mozna bylo zamknąć bez zapisywania
          setProcesyElementowTechTemporary(procesyElementowTech);
          // console.log("typ: ",row)
        }}
        alt="Procesy"
      />
      {procesyElementowTech
        .filter((frag) => frag.element_id == row.id)
        .sort((a, b) => a.indeks - b.indeks)
        .map((pr, i) => appContext.showMeProcessName(pr.nazwa_id) + " ")}
      {/* .map((pr) => appContext.showMeProcessName( pr.nazwa_id)+" ")} */}

      {/* row.map((rank, i, row) => {
  if (i + 1 === row.length) {
    // Last one.
  } else {
    // Not last one.
  }
}) */}
    </div>
  );
}

function Usun({ row, handleChangeCardElementy, handleRemoveItem }) {
  return (

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

  );
}

function Dodaj({ row, handleChangeCardElementy, handleAddCard }) {
  return (
    <div>
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

function Typ({
  row,
  handleChangeCardFragmenty_i_Elementy_Tech,
}) {
  //row - row element
  return (
  
      <select
        className={style.select}
        defaultValue={row.typ}
        onChange={(e) => {
          handleChangeCardFragmenty_i_Elementy_Tech({
            ...row,
            typ: e.target.value,
          });
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
  row,
  handleChangeCardFragmenty_i_Elementy_Tech,listaGramatur,listaGramaturSelect,setListaGramaturSelect
}) {
  const appcontext = useContext(AppContext);
  const listaPapierow = appcontext.listaPapierow;

  // const listaGramaturSelect = appcontext.listaGramaturSelect;
  // const setListaGramaturSelect = appcontext.setListaGramaturSelect;

    // listaPapierów = wszystkie papiery
  // listaGramatur = wszystkie gramatury
  // listaGramaturSelect = tylko gramatury pasujące do wybranego papieru
  return (

      <select
        //  listaPapierow pobierana po otwarciu okienka dodaj zmamowienie ModalInsert
        //  po wybraniu papieru filtruje się lista gramatur i czeka do wybrania z osobnym selecie
        //  jednocześnie aktualizuje się papier_id w odpowiednim row w stanie elementów
        // następnie wybieramy gramaturę, która aktualizuje gramatura_id w odpowiednim row
        className={style.select}
        defaultValue={row.papier_id}
        onChange={(e) => {
          setListaGramaturSelect(

             listaGramatur.filter((wyk) => wyk.papier_id == e.target.value)

          );
          handleChangeCardFragmenty_i_Elementy_Tech({
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
 
  );
}

function Gramatura({
  row,
  handleChangeCardFragmenty_i_Elementy_Tech,listaGramaturSelect

}) {
  const appcontext = useContext(AppContext);
  const listaPapierow = appcontext.listaPapierow;
  const listaGramatur = appcontext.listaGramatur;
  // const listaGramaturSelect = appcontext.listaGramaturSelect;
  const setListaGramaturSelect = appcontext.setListaGramaturSelect;

  // listaPapierów = wszystkie papiery
  // listaGramatur = wszystkie gramatury
  // listaGramaturSelect = tylko gramatury pasujące do wybranego papieru
  return (

      <select
        className={style.select}
        defaultValue={row.gramatura_id}
        onChange={(e) =>
          handleChangeCardFragmenty_i_Elementy_Tech({
            ...row,
            gramatura_id: e.target.value,
          })
        }
      >
        <option value="0">wybierz</option>
        {listaGramaturSelect
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
                {option.gramatura} g/m2 vol. {option.bulk} {option.wykonczenie}
              </option>
            )
        )}
      </select>

  );
}

function Naklad({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (
 
      <input
        className={style.input}
        value={row.naklad}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowElementyTech({
              ...row,
              naklad: e.target.value,
            });
          }
        }}
      ></input>

  );
}
function Nazwa({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (

      <input
       className={style.input}
        value={row.nazwa}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowElementyTech({
              ...row,
              nazwa: e.target.value,
            });
          }
        }}
      ></input>

  );
}

function Strony({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;

  return (

      <input
         className={style.input}
        value={row.ilosc_stron}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowElementyTech({
              ...row,
              ilosc_stron: e.target.value,
            });
          }
        }}
      ></input>

  );
}
function NettoX({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (

      <input
      className={style.input}
        value={row.format_x}
        onChange={(e) => {
          const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

          if (e.target.value === "" || re.test(e.target.value)) {
            handleUpdateRowElementyTech({
              ...row,
              format_x: e.target.value,
            });
          }
        }}
      ></input>

  );
}
function NettoY({ row, handleChangeCardElementy }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (
 
      <input
         className={style.input}
        value={row.format_y}
        onChange={(e) => {
          const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

          if (e.target.value === "" || re.test(e.target.value)) {
            handleUpdateRowElementyTech({
              ...row,
              format_y: e.target.value,
            });
          }
        }}
      ></input>

  );
}

function Lega({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;

  return (
 
      <input
        className={style.input}
        placeholder="..."
        value={row.lega}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowElementyTech({
              ...row,
              lega: e.target.value,
            });
          }
        }}
      ></input>

  );
}
function IloscLeg({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;

  return (

      <input
        className={style.input}
        value={row.ilosc_leg}
        placeholder="..."
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowElementyTech({
              ...row,
              ilosc_leg: e.target.value,
            });
          }
        }}
      ></input>

  );
}
function ArkuszSzerokosc({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (

      <input
        value={row.arkusz_szerokosc}
        className={style.input}
        placeholder="..."
        onChange={(e) => {
          const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

          if (e.target.value === "" || re.test(e.target.value)) {
            handleUpdateRowElementyTech({
              ...row,
              arkusz_szerokosc: e.target.value,
            });
          }
        }}
      ></input>
  
  );
}

function ArkuszWysokosc({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (

      <input
        value={row.arkusz_wysokosc}
        className={style.input}
        placeholder="..."
        onChange={(e) => {
          const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

          if (e.target.value === "" || re.test(e.target.value)) {
            handleUpdateRowElementyTech({
              ...row,
              arkusz_wysokosc: e.target.value,
            });
          }
        }}
      ></input>
  
  );
}

function PapierInfo({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (
    <td>
      <input
        value={row.papier_info}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowElementyTech({
              ...row,
              papier_info: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}

function Uwagi({ row }) {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowElementyTech = techContext.handleUpdateRowElementyTech;
  return (

      <input
      className={style.input}
        value={row.uwagi}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowElementyTech({
              ...row,
              uwagi: e.target.value,
            });
          }
        }}
      ></input>

  );
}
