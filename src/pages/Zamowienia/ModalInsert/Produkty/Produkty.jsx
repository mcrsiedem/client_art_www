import style from "./Produkty.module.css";
import { useContext, useState } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import iconHistoriaDark from "assets/iconHistoriaDark.svg";

import { reg_int, reg_txt } from "utils/initialvalue";
import { useStatus } from "hooks/useStatus";
import iconCopy from "assets/edit.svg";
import ProduktyNaklad from "./Naklad/ProduktyNaklad";
import { useHistoria } from "hooks/useHistoria";

export default function Produkty( ) {

  const contextModalInsert = useContext(ModalInsertContext);
  const setShowHistoria= contextModalInsert.setShowHistoria;
  const showHistoria= contextModalInsert.showHistoria;
  return (
      <div className={style.container}>
            <div className={style.produkt}>
         
              <div className={style.produkt_menu_button}>
              <p className={style.row1}>Produkt</p>
              <img
              title="Historia zmian"
              onClick={()=>{setShowHistoria(!showHistoria)}}
          className={style.icon}
          src={iconHistoriaDark}

          alt="React Logo"
        />
              
              </div>
              
         
              <ProduktyTable2   />
            
            </div>
    </div>
  );
}

//--------------------------


function ProduktyTable2() {
  const contextModalInsert = useContext(ModalInsertContext);
  const produkty = contextModalInsert.produkty;
  return (
    <div className={style.main2}>
      <div className={style.row1}>
        <Typ row={produkty[0]} />
        <ProduktyNaklad row={produkty[0]} />
        <Strony row={produkty[0]} />
        <FormatX row={produkty[0]} />
        <FormatY row={produkty[0]} />
        <Nazwa row={produkty[0]} />
        <RodzajOprawy row={produkty[0]} />
        <PostacPapieru row={produkty[0]} />
        <Uwagi row={produkty[0]} />
      </div>
    </div>
  );
}





function Typ({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const contextApp = useContext(AppContext);
const [setStatus] = useStatus()
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  return (
    <div className={style.col_dane}>
       <label className={style.label}> Typ </label>
      <select
        className={style.select}
        value={row?.typ}
        onChange={(e) => {
          handleUpdateRowProdukty({
            ...row,
            typ: e.target.value,
            update: true
          });

           // 
           setStatus(3)
        }}
      >
        {}
        {contextApp.productType?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}

function Nazwa({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  const [setStatus] = useStatus()
  const [add] = useHistoria()
  const [valueIN,setValueIN] = useState(null)
  const daneZamowienia = contextModalInsert.daneZamowienia

  return (
    <div  className={style.col_dane}>
      <label className={style.label}> Nazwa </label>
      <input
        className={style.input}
        value={row?.nazwa}
        onFocus={()=>{ setValueIN(row.nazwa)}}
        onBlur={(e)=>{
          if(valueIN != e.target.value){
                 
          add(         {
            kategoria: "Nazwa",
            event: " Produkt - zmiana nazwy : "+e.target.value ,
            zamowienie_id: daneZamowienia.id
          })
          }
        }}
        onChange={(e) =>
          {
            
            if ( e.target.value === '' || reg_txt.test(e.target.value)) {
            handleUpdateRowProdukty({
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
    </div>
  );
}


function Strony({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
const [setStatus] = useStatus()
      const [add] = useHistoria()
      const [valueIN,setValueIN] = useState(null)
      const daneZamowienia = contextModalInsert.daneZamowienia
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Strony </label>
      <input
      // disabled
        className={style.input}
        value={row?.ilosc_stron}
        onFocus={()=>{ setValueIN(row.ilosc_stron)}}
          onBlur={(e)=>{
            if(valueIN != e.target.value){
                      
            add(         {
              kategoria: "Ilość stron",
              event: " Zmiana  z "+valueIN + " na "+e.target.value+" str." ,
              zamowienie_id: daneZamowienia.id
            })
            }
          }}
        onChange={(e) => {
          // const re = /^[0-9]+$/;
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowProdukty({
              ...row,
              ilosc_stron: e.target.value,
              update: true
            });

             // 
             setStatus(3)
          }



        }}

      ></input>
    </div>
  );
}

function FormatX({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
const [setStatus] = useStatus()
const [add] = useHistoria()
const [valueIN,setValueIN] = useState(null)
const daneZamowienia = contextModalInsert.daneZamowienia
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Szer. </label>
      <input
      // disabled
        className={style.input}
        value={row?.format_x}
        onFocus={()=>{ setValueIN(row.format_x)}}
        onBlur={(e)=>{
          if(valueIN != e.target.value){
                    
          add(         {
            kategoria: "Format",
            event: " Zmiana szerokości  z "+valueIN + " na "+e.target.value+"  mm" ,
            zamowienie_id: daneZamowienia.id
          })
          }
        }}
        onChange={(e) => {
          const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

          if (e.target.value === "" || re.test(e.target.value)) {
            handleUpdateRowProdukty({
              ...row,
              format_x: e.target.value,
              update: true
            });

             // 
             setStatus(3)
          }
        }}
      ></input>
    </div>
  );
}
function FormatY({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
const [setStatus] = useStatus()
const [add] = useHistoria()
const [valueIN,setValueIN] = useState(null)
const daneZamowienia = contextModalInsert.daneZamowienia
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Wys. </label>
      <input
      // disabled
        className={style.input}
        value={row?.format_y}
        onFocus={()=>{ setValueIN(row.format_y)}}
        onBlur={(e)=>{
          if(valueIN != e.target.value){
                    
          add(         {
            kategoria: "Format",
            event: " Zmiana wysokości  z "+valueIN + " na "+e.target.value+"  mm" ,
            zamowienie_id: daneZamowienia.id
          })
          }
        }}
        onChange={(e) => {
          const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

          if (e.target.value === "" || re.test(e.target.value)) {
            handleUpdateRowProdukty({
              ...row,
              format_y: e.target.value,
              update: true
            });

             // 
             setStatus(3)
          }
        }}
      ></input>
    </div>
  );
}



function RodzajOprawy({ row,handleChangeCardOprawa}) {
  const contextModalInsert = useContext(ModalInsertContext);
const produkty = contextModalInsert.produkty;
const setProdukty = contextModalInsert.setProdukty;
const contextApp = useContext(AppContext);

  return (
    <div className={style.col_dane}>
<label className={style.label}> Oprawa </label>
      <select
        disabled
        className={style.select_oprawa}
        value={row?.oprawa}
        onChange={(event) => {
          handleChangeCardOprawa({...row, oprawa: event.target.value,update: true});


          if(row.indeks == 0){
          setProdukty(
            produkty.map((p) => {
              if (p.id === row.produkt_id) {
                return {...p, oprawa:event.target.value,update: true};
              } else {
                return p;
              }
            })
          );
           
          }

        }}
      >
                  {   <option value = "0"  >
             brak oprawy
            </option>}
        {contextApp.procesList?.filter(x=>x.nazwa_id==6).map((option) => (
          <option key={option.id} value={option.id}>
            {option.typ} {option.rodzaj} 
          </option>
        ))}
      </select>
    </div>
  );
}

function PostacPapieru({ row,handleChangeCardOprawa}) {
  //rola arkusz
  const contextModalInsert = useContext(ModalInsertContext);
const produkty = contextModalInsert.produkty;
const setProdukty = contextModalInsert.setProdukty;
const contextApp = useContext(AppContext);

  return (
    <div className={style.col_dane}>
<label className={style.label}> Papier </label>
      <input
        disabled
        className={style.select_oprawa}
      >

      </input>
    </div>
  );
}



function Uwagi({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  const [setStatus] = useStatus()
  const [add] = useHistoria()
  const [valueIN,setValueIN] = useState(null)
  const daneZamowienia = contextModalInsert.daneZamowienia
  return (
    <div  className={style.col_dane}>
      <label className={style.label}> Uwagi </label>
      <input
        className={style.input}
        value={row?.uwagi}
        onFocus={()=>{ setValueIN(row.uwagi)}}
        onBlur={(e)=>{
          if(valueIN != e.target.value){
                 
          add(         {
            kategoria: "Uwagi",
            event: " Produkt - nowe uwagi : "+e.target.value ,
            zamowienie_id: daneZamowienia.id
          })
          }
        }}
        onChange={(e) =>
          { 
            // const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ.,:/-]+$/;
            if ( e.target.value === '' || reg_txt.test(e.target.value)) { 
              handleUpdateRowProdukty({
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
    </div>
  );
}