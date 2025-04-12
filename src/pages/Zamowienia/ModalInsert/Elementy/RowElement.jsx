import style from "./ElementTable.module.css";
import Logo_ustawienia from "../../../../assets/settings.svg";
import logoExpand from "assets/expand.svg";
import iconCopy from "../../../../assets/copy.svg";
import iconTrash from "../../../../assets/trash2.svg";
import addIcon2 from "assets/addIcon2.svg"
import {  useState,useContext } from "react";
import { _typ_elementu} from "utils/initialvalue"
import { ModalInsertContext } from "context/ModalInsertContext";
import { reg_int, reg_txt } from "utils/initialvalue";
import { AppContext } from "context/AppContext";
import RowFragment from "./RowFragment";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { ifNoTextSetNull } from "actions/ifNoTextSetNull";
import { getNameOfPapier } from "actions/getNameOfPapier";
import { useHistoria } from "hooks/useHistoria";
import { useStatus } from "hooks/useStatus";
import { getNameOfElement } from "actions/getNameOfElement";
import { ifNoTextSetZero } from "actions/ifNoTextSetZero";
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
        if (elementy.filter((x) => x.delete != true).length != 1) {
          // setElementy(elementy.filter((x) => x.indeks !== indeks));
          // setFragmenty(fragmenty.filter((x) => x.element_id !== id));

          setElementy((prev) =>
            prev.map((t, a) => {
              if (t.id == id) {
                return {
                  ...t,
                  delete: true
                };
              } else {
                return t;
              }
            })
          );

          setFragmenty((prev) =>
            prev.map((t, a) => {
              if (t.element_id == id) {
                return {
                  ...t,
                  delete: true
                };
              } else {
                return t;
              }
            })
          );



                  setElementy((prev) =>
          prev.map((t, a) => {
            if (t.indeks > indeks) {
              return {
                ...t,
                indeks: t.indeks--,
                update: true
              };
            } else {
              return t;
            }
          })
        );


        setProcesyElementow((prev) =>
          prev.map((t, a) => {
            if (t.element_id == id) {
              return {
                ...t,
                delete: true
              };
            } else {
              return t;
            }
          })
        );

        }
      


        console.log("Usun")
      };
      
      function handleAddCard(card) {
        const newElementy = elementy.slice();

        newElementy.push({
          id: Math.max(...newElementy.map((f) => f.id)) + 1,
          zamowienie_id: card.zamowienie_id,
          produkt_id: card.produkt_id,
          naklad: card.naklad,
          indeks: Math.max(...newElementy.filter((x) => x.delete != true).map((f) => f.indeks)) + 1,
          typ: card.typ,
          nazwa: card.nazwa,
          kolory: card.kolory,
          ilosc_stron: card.ilosc_stron,
          format_x: card.format_x,
          format_y: card.format_y,
          papier_id: card.papier_id,
          papier_postac_id: card.papier_postac_id,
          stan: card.stan,
          status: card.status,
          etap: card.etap,
          info: card.info,
          tytul: card.tytul,
          papier_id: card.papier_id,
          gramatura_id: card.gramatura_id,
          papier_info: card.papier_info,
          uwagi: card.uwagi,
          insert:true
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
              wersja: x.wersja,
              info:x.info,
              typ: card.typ,
              oprawa_id: x.oprawa_id,
              element_id: Math.max(...elementy.map((f) => f.id)) + 1,
              indeks: Math.max(...newFragmenty.filter((x) => x.delete != true).map((f) => f.indeks)) + 1,
              insert: true
            });
          });

        newFragmenty.sort((a, b) => a.indeks - b.indeks);
        setFragmenty(newFragmenty);


      }
    return (
      <>
        <div className={style.row3} key={row.id}>
          <Rozwin
            row={row}
            fragmenty={fragmenty}
            showFragmenty={showFragmenty}
            setShowFragmenty={setShowFragmenty}
          />
          <Typ
            row={row}
            handleChangeCardElementy={handleChangeCardElementy}
            handleChangeCardFragmenty_i_Elementy={
              handleChangeCardFragmenty_i_Elementy
            }
          />
          <Naklad
            row={row}
            handleChangeCardElementy={handleChangeCardElementy}
          />
          <Strony
            row={row}
            handleChangeCardElementy={handleChangeCardElementy}
            handleChangeCardFragmenty_i_Elementy_IloscStron={
              handleChangeCardFragmenty_i_Elementy_IloscStron
            }
          />
          <NettoX
            row={row}
            handleChangeCardElementy={handleChangeCardElementy}
          />
          <NettoY
            row={row}
            handleChangeCardElementy={handleChangeCardElementy}
          />
          <Nazwa
            row={row}
            handleChangeCardElementy={handleChangeCardElementy}
          />
          <PapierSelect2
            row={row}
            handleChangeCardElementy={handleChangeCardElementy}
          />
          <PapierPostacElement
            row={row}
            handleChangeCardElementy={handleChangeCardElementy}
            handleChangeCardFragmenty_i_Elementy={
              handleChangeCardFragmenty_i_Elementy
            }
          />

          <Uwagi
            row={row}
            handleChangeCardElementy={handleChangeCardElementy}
          />

          <Procesy
            row={row}
            handleChangeCardElementy={handleChangeCardElementy}
            setShowElementyProcesyInsert={setShowElementyProcesyInsert}
            procesyElementow={procesyElementow}
          />
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
            {fragmenty
              ?.filter((x) => x.element_id == row.id)
              .filter((x) => x.delete != true)
              .map((rowFragment, i) => {
                return <RowFragment key={row.indeks} i={i} row={rowFragment}  rowElement={row}/>;
              })}
          </>
        )}
        <DodajFragment
          row={row}
          fragmenty={fragmenty}
          setFragmenty={setFragmenty}
        />
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
const [setStatus] = useStatus()
    if (fragmenty.filter(x=> x.element_id == row.id).length == 0){
         return (
        <button className={style.btn_dodaj_fragment} 
        onClick={()=>{
          handleAddFirstFragment(row,fragmenty,setFragmenty)
                     // 
                     setStatus(3)
        }}>+</button>
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
              setProcesyElementowTemporary(procesyElementow)
            }}
            alt="Procesy"
          />
       </div>



      <div className={style.procesy_elementy_dol}>
            {procesyElementow
            .filter((frag) => frag.element_id == row.id)
            .sort((a, b) => a.indeks - b.indeks)
            .filter((x) => x.delete != true)
            .map((pr,i) => <p className={style.procesy_list}> {appContext.showMeProcessName( pr.nazwa_id)+" "+pr.typ+" "+pr.rodzaj+" - "}</p> 
            )
            }
      </div>
 
    </div>
    );
  }
  
function Usun({ row, handleChangeCardElementy, handleRemoveItem }) {
  const [setStatus] = useStatus()
  return (
    <div>
      <div>
        <img
          className={style.expand}
          src={iconTrash}
          onClick={() => {
            handleRemoveItem(row.indeks, row.id);
                       // const [setStatus] = useStatus()
                       setStatus(3)
          }}
          alt="Procesy"
        />
      </div>
    </div>
  );
}

function Dodaj({ row, handleAddCard }) {
  const [setStatus] = useStatus()
  return (
    <div >
      <img
        className={style.expand}
        src={iconCopy}
        onClick={() => {
          handleAddCard(row);
                     // 
                     setStatus(3)
        }}
        alt="Procesy"
      />
    </div>
  );
}
  
  function Typ({ row, handleChangeCardElementy,handleChangeCardFragmenty_i_Elementy }) {
    //row - row element
    const [setStatus] = useStatus()
    return (
        <select
          className={style.select}
          value={row.typ}
          onChange={(e) => {
            handleChangeCardFragmenty_i_Elementy({
              ...row,
              typ: e.target.value,
              update: true
            }
            );

 // 
 setStatus(3)

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

  
  function PapierPostacElement({ row, handleChangeCardElementy,handleChangeCardFragmenty_i_Elementy }) {
    //row - row element
const contextApp = useContext(AppContext);
const [setStatus] = useStatus()

    return (
        <select
          className={style.select}
          value={row.papier_postac_id}
          onChange={(e) => {
            handleChangeCardFragmenty_i_Elementy({
              ...row,
              papier_postac_id: e.target.value,
              update: true
            }
            );
             // 
             setStatus(3)
          }}
        >
          {}
          {contextApp.listaPapierowPostac.map((option) => (
            <option key={option.id} value={option.id}>
              {option.postac}
            </option>
          ))}
        </select>
    );
  }

  

  function PapierSelect2({
    row,handleChangeCardElementy
  }) {
    const appcontext = useContext(AppContext);
    const listaPapierow = appcontext.listaPapierow;
    const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
    const modalcontext = useContext(ModalInsertContext);
    const setShowPaperStage = modalcontext.setShowPaperStage;
    const setSelectedElementROW = modalcontext.setSelectedElementROW;
    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
    const historiaZamowienia = modalcontext.historiaZamowienia;
    const setHistoriaZamowienia = modalcontext.setHistoriaZamowienia;
    const daneZamowienia = modalcontext.daneZamowienia;
    const elementy = modalcontext.elementy;
    const [add] = useHistoria()
    const [setStatus] = useStatus()
    return (
     <div className={style.papier_input_container}>
        <select
          className={row.papier_id =="0" ? style.select_papier_brak : style.select_papier }
          value={row.papier_id}
          onChange={(e) => {
            handleChangeCardElementy({
              ...row,
              papier_id: e.target.value,
              update: true
            });

          setStatus(3)
            add(         {
              kategoria: "Papier",
              event: getNameOfElement(row.typ,elementy,_typ_elementu)+" : zmiana papieru z "+ getNameOfPapier(listaPapierowWyszukiwarka,row.papier_id) + " na "+getNameOfPapier(listaPapierowWyszukiwarka,e.target.value),
              zamowienie_id: daneZamowienia.id
            })


            
          }}
        >
          {   <option value = "0"  >
             wybierz papier
            </option>}
       
          {listaPapierowWyszukiwarka.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa} {option.gramatura}  {option.wykonczenie}
            </option>
          ))}
        </select>
<img
         className={style.dodaj_klienta}
          src={addIcon2}
          onClick={() => {
            setShowPaperStage(true)
            setSelectedElementROW(row)
            setListaPapierowWyszukiwarka(listaPapierow)
            // showAddClientStage(true)
          }}
          alt="Procesy"
        />
     </div>

   
    );
  }


  
  function Naklad({ row, handleChangeCardElementy }) {
    const [setStatus] = useStatus()
   const contextModalInsert = useContext(ModalInsertContext);
    const fragmenty = contextModalInsert.fragmenty

      const sprawdzSume = () => {

        let suma_nakladow = fragmenty
          .filter((x) => x.element_id == row.id)
          .map((x) => parseInt(x.naklad))
          .reduce((a, b) => a + b, 0);

        if (suma_nakladow != row.naklad) {
          return style.input_alert;
        }
        return style.input;
      };

      const ilezostalo = () => {

        let suma_nakladow = fragmenty
          .filter((x) => x.element_id == row.id)
          .map((x) => parseInt(x.naklad))
          .reduce((a, b) => a + b, 0);
          if(parseInt(row.naklad)-suma_nakladow == 0){
            return "Suma nakładów OK"
          }else{
             return "Brakuje "+(parseInt(row.naklad)-suma_nakladow)+" szt.";
          }
       
      };

    return (
        <input
          // disabled={row.zamowienie_id >1}
          onDoubleClick={()=>{console.log("db")}}
        
          className={sprawdzSume()}
          title={ilezostalo()}
          value={row.naklad}
          onChange={(e) =>
            {

              if(row.zamowienie_id == 1){
        if (e.target.value === "" || reg_int.test(e.target.value)) {
                handleChangeCardElementy({
                  ...row,
                  naklad: ifNoTextSetNull(e.target.value),
                  update: true,
                });
                setStatus(3);
              }
              }
      
        
        
        }
          }
        ></input>
    
    );
  }
  function Nazwa({ row, handleChangeCardElementy }) {
    const [setStatus] = useStatus()
    return (
     
        <input
          value={row.nazwa}
          className={style.input}
          onChange={(e) =>

 {      if ( e.target.value === '' || reg_txt.test(e.target.value)) {
             handleChangeCardElementy({
              ...row,
              nazwa: e.target.value,
              update: true
            })

           // 
            setStatus(3)

          }
          }
          }
        ></input>

    );
  }
  
  
  
  function Strony({ row, handleChangeCardElementy,handleChangeCardFragmenty_i_Elementy_IloscStron }) {
    const [setStatus] = useStatus()
    return (
 
        <input
          value={row.ilosc_stron}
          className={style.input}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
              handleChangeCardFragmenty_i_Elementy_IloscStron({
              ...row,
              ilosc_stron: ifNoTextSetNull(e.target.value),
              update: true
            }
            )}
                     // 
                     setStatus(3)
          
          }

          }
        ></input>

    );
  }
  function NettoX({ row, handleChangeCardElementy }) {
    const [setStatus] = useStatus()
    return (
   
        <input
        className={style.input}
        defaultValue={row.format_x}
          onChange={(e) => {
            const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

            if (e.target.value === "" || re.test(e.target.value)) {
              handleChangeCardElementy({
                ...row,
                format_x: e.target.value,
                update: true
              });


                         // 
            setStatus(3)
            }
          }}
        ></input>
    
    );
  }
  function NettoY({ row, handleChangeCardElementy }) 
  {const [setStatus] = useStatus()
    return (
  
        <input
        className={style.input}
          defaultValue={row.format_y}
          onChange={(e) => {
            const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

            if (e.target.value === "" || re.test(e.target.value)) {
              handleChangeCardElementy({
                ...row,
                format_y: e.target.value,
                update: true
              });

                         // 
            setStatus(3)
            }
          }}
        ></input>
    
    );
  }


  
  function Uwagi({ row, handleChangeCardElementy }) {
    const [setStatus] = useStatus()
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
              update: true
            })
                     // 
                     setStatus(3)
          
          
          }
          }
          }
        ></input>
 
    );
  }