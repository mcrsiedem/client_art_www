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
import { getNameOfElementTyp } from "actions/getNameOfElementTyp";
import ELEMENT_DODAJ from "./Row/ELEMENT_DODAJ";
import ELEMENT_PROCESY from "./Row/ELEMENT_PROCESY";
import ElementNaklad from "./Row/ElementNaklad";
export default function RowElement({
    row,
    handleChangeCardElementy,
    setShowElementyProcesyInsert,
    handleChangeCardFragmenty_i_Elementy,
    handleChangeCardFragmenty_i_Elementy_IloscStron
  }) {
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy;
    const oprawa = contextModalInsert.oprawa;
    const setElementy = contextModalInsert.setElementy;
    const fragmenty = contextModalInsert.fragmenty;
    const setFragmenty = contextModalInsert.setFragmenty;
    const daneZamowienia = contextModalInsert.daneZamowienia;
    const procesyElementow = contextModalInsert.procesyElementow;
    const setProcesyElementow = contextModalInsert.setProcesyElementow;
    const [showFragmenty, setShowFragmenty] = useState(false);
    const [add] = useHistoria()
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
      
        add(         {
          kategoria: "Element",
          event: getNameOfElement(row.id,elementy,_typ_elementu)+ " "+row.nazwa+" - skasowano ",
          zamowienie_id: daneZamowienia.id
        })

        console.log("Usun")
      };
      

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
          <ElementNaklad
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

          <ELEMENT_PROCESY row={row}/>

          <Usun
            row={row}
            handleChangeCardElementy={handleChangeCardElementy}
            handleRemoveItem={handleRemoveItem}
          />
          
          <ELEMENT_DODAJ row={row}/>


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

  function handleAddFirstFragment(card,fragmenty,setFragmenty,oprawa) {
    const newFragmenty = fragmenty.slice();
  
    newFragmenty.push({
      id: getMaxID(fragmenty),
      zamowienie_id: card.zamowienie_id,
      ilosc_stron: card.ilosc_stron,
      produkt_id: card.produkt_id,
      typ: card.typ,
      wersja: card.nazwa,
      naklad: card.naklad,
      oprawa_id: oprawa.filter(x => x.delete != true)[0].id,
      element_id: card.id,
      indeks: getMaxIndeks(newFragmenty),
      insert:true
    });
  
    newFragmenty.sort((a, b) => a.indeks - b.indeks);
    setFragmenty(newFragmenty);
  }

  function DodajFragment({ row, fragmenty,setFragmenty}) {
const [setStatus] = useStatus()
const contextModalInsert = useContext(ModalInsertContext);
const oprawa = contextModalInsert.oprawa;

    if (fragmenty.filter(x=> x.element_id == row.id).length == 0){
         return (
        <button className={style.btn_dodaj_fragment} 
        onClick={()=>{
          handleAddFirstFragment(row,fragmenty,setFragmenty,oprawa)
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
          // className={style.expand}
          className={showFragmenty? style.expand:style.expand_bok}
          src={logoExpand}
          onClick={() => {
            setShowFragmenty(!showFragmenty);
          }}
          alt="Procesy"
        />
      </div>
    );}else return <p> </p>
  }
  

function Usun({ row, handleChangeCardElementy, handleRemoveItem }) {
  const [setStatus] = useStatus()
  const [add] = useHistoria()

  return (
    <div>
      <div>
        <img
          className={style.expand}
          src={iconTrash}
          onClick={() => {
            handleRemoveItem(row.indeks, row.id);
                       setStatus(3)
          }}
          alt="Procesy"
        />
      </div>
    </div>
  );
}


  
  function Typ({ row, handleChangeCardElementy,handleChangeCardFragmenty_i_Elementy }) {
    //row - row element
    const [setStatus] = useStatus()
    const [valueIN,setValueIN] = useState(null)
    
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()

    return (
        <select
          className={style.select}
          value={row.typ}
          onFocus={()=>{ setValueIN(row.typ)}}

          onChange={(e) => {
            // console.log("e.target.value"+e.target.value)

                setStatus(3) 
            add(         {
              kategoria: "Typ elementu",
              event: getNameOfElement(row.id,elementy,_typ_elementu)+ " "+row.nazwa+" - zmiana na  "+getNameOfElementTyp(e.target.value,_typ_elementu),
              zamowienie_id: daneZamowienia.id
            })
            handleChangeCardFragmenty_i_Elementy({
              ...row,
              typ: e.target.value,
              update: true
            }
            );
        
 // 


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
              event: getNameOfElement(row.id,elementy,_typ_elementu)+" : zmiana papieru z "+ getNameOfPapier(listaPapierowWyszukiwarka,row.papier_id) + " na "+getNameOfPapier(listaPapierowWyszukiwarka,e.target.value),
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
  




  
  function Nazwa({ row, handleChangeCardElementy }) {
    const [setStatus] = useStatus()
    const modalcontext = useContext(ModalInsertContext);
    const [valueIN,setValueIN] = useState(null)
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()
    const handleChangeCardFragmenty_i_Elementy_nazwa = modalcontext.handleChangeCardFragmenty_i_Elementy_nazwa;
    return (
     
        <input
          value={row.nazwa}
          title={row.nazwa}
          onFocus={()=>{ setValueIN(row.nazwa)}}
          onBlur={(e)=>{
            if(valueIN != e.target.value){
            add(         {
              kategoria: "Nazwa",
              event: getNameOfElement(row.id,elementy,_typ_elementu)+ " "+row.nazwa+" - Nazwa elementu z "+valueIN + " na "+e.target.value,
              zamowienie_id: daneZamowienia.id
            })
            }
          }}
          className={style.input}
          onChange={(e) =>

 {      
  
  // if ( e.target.value === '' || reg_txt.test(e.target.value)) {
  handleChangeCardFragmenty_i_Elementy_nazwa({
              ...row,
              nazwa: e.target.value,
              update: true
            })

           // 
            setStatus(3)

          // }
          }
          }
        ></input>

    );
  }
  
  
  
  function Strony({ row,handleChangeCardFragmenty_i_Elementy_IloscStron }) {
    const [setStatus] = useStatus()
    const [valueIN,setValueIN] = useState(null)
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()


    return (
 
        <input
          value={row.ilosc_stron}
          className={style.input}
          onFocus={()=>{ setValueIN(row.ilosc_stron)}}
          onBlur={(e)=>{
            if(valueIN != e.target.value){
            add(         {
              kategoria: "Ilość stron",
              event: getNameOfElement(row.id,elementy,_typ_elementu)+ " "+row.nazwa+" - zmiana ilości stron z "+valueIN + " na "+e.target.value,
              zamowienie_id: daneZamowienia.id
            })
            }
          }}
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
    const [valueIN,setValueIN] = useState(null)
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()

    return (
   
        <input
        className={style.input}
        value={row.format_x}
        onFocus={()=>{ setValueIN(row.format_x)}}
        onBlur={(e)=>{
          if(valueIN != e.target.value){
          add(         {
            kategoria: "Format",
            event: getNameOfElement(row.id,elementy,_typ_elementu)+ " "+row.nazwa+" - zmiana szerokości z "+valueIN + " na "+e.target.value,
            zamowienie_id: daneZamowienia.id
          })
          }
        }}
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
    const [valueIN,setValueIN] = useState(null)
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()
    return (
  
        <input
        className={style.input}
          value={row.format_y}
          onFocus={()=>{ setValueIN(row.format_y)}}
          onBlur={(e)=>{
            if(valueIN != e.target.value){
            add(         {
              kategoria: "Format",
              event: getNameOfElement(row.id,elementy,_typ_elementu)+ " "+row.nazwa+" - zmiana wysokości z "+valueIN + " na "+e.target.value,
              zamowienie_id: daneZamowienia.id
            })
            }
          }}
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
    const [valueIN,setValueIN] = useState(null)
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()
    return (
  
        <input
        className={style.input}
        title={row.uwagi}
          value={row.uwagi}
          onFocus={()=>{ setValueIN(row.uwagi)}}
          onBlur={(e)=>{
            if(valueIN != e.target.value){
            add(         {
              kategoria: "Uwagi",
              event: getNameOfElement(row.id,elementy,_typ_elementu)+ " "+row.nazwa+" - Uwagi:  "+e.target.value,
              zamowienie_id: daneZamowienia.id
            })
            }
          }}
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