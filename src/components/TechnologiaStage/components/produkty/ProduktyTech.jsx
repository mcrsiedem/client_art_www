import style from "./ProduktyTech.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { reg_int, reg_txt } from "utils/initialvalue";
import Logo_ustawienia from "assets/settings.svg";
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import ProduktyTechMenu from "./ProduktyTechMenu";
import { ifNoTextSetNull } from "actions/ifNoTextSetNull";

import { createArkuszeFromElemenets } from "actions/createArkusze/STAREcreateArkuszeFromElements";
import { input1632toElement } from "actions/input1632toElement";
import { useArkusze } from "hooks/useArkusze";

export default function ProduktyTech() {
  const contextTech = useContext(TechnologyContext);
  const elementyTech = contextTech.elementyTech;
  const setElementyTech = contextTech.setElementyTech;
  return (
    <div className={style.container}>
      <div className={style.produkt}>

      <div className={style.produkt_menu_button}>
    {/* <p>Produkt</p> */}
    <p style={{color:"grey" , fontSize:"1.5rem", paddingTop:"10px"}}> Druk</p>
<Generuj/>
  </div>
   
        <ProduktyTable2 />
      </div>
    </div>
  );
}

//--------------------------

function Generuj() {
  const contextTech = useContext(TechnologyContext);
  const arkusze = contextTech.arkusze;
  const elementyTech = contextTech.elementyTech;
  const setElementyTech = contextTech.setElementyTech;


  if(arkusze.length ==0) {  return (


    <div className={style.produkt_menu_button_sub}>



  <div className={style.produkt_menu_button_sub_16}>



        <button className={style.BTN_12_24_16_32} onClick={() => {
              input1632toElement(2,elementyTech,setElementyTech)
            
        }}>2</button>
      </div>

      <div className={style.produkt_menu_button_sub_16}>



        <button className={style.BTN_12_24_16_32} onClick={() => {
              input1632toElement(12,elementyTech,setElementyTech)
            
        }}>12</button>
      </div>

      <div className={style.produkt_menu_button_sub_16}>
        <button className={style.BTN_12_24_16_32} onClick={() => {
              input1632toElement(16,elementyTech,setElementyTech)
            
        }}>16</button>
      </div>

      <div className={style.produkt_menu_button_sub_16}>
        <button className={style.BTN_12_24_16_32} onClick={() => {
              input1632toElement(24,elementyTech,setElementyTech)
            
        }}>24</button>
      </div>

      <div className={style.produkt_menu_button_sub_16}>
        <button className={style.BTN_12_24_16_32} onClick={() => {
              input1632toElement(32,elementyTech,setElementyTech)
            
        }}>32</button>
      </div>


      <MenuProduktyBtn />
    </div>


  );}

}


function ProduktyTable2() {
  const contextTech = useContext(TechnologyContext);
  const produktyTech = contextTech.produktyTech;

  return (
    <div className={style.main2}>
      <div className={style.row1}>
        <Typ row={produktyTech[0]} />
        <Naklad row={produktyTech[0]} />
        <Nadkomplet row={produktyTech[0]} />
        <Strony row={produktyTech[0]} />
        <FormatX row={produktyTech[0]} />
        <FormatY row={produktyTech[0]} />
        <RodzajOprawy row={produktyTech[0]} />
        <OpisPostacPapieru row={produktyTech[0]} />
        <OpisSzerokoscArkusza row={produktyTech[0]} />
        <OpisWysokoscArkusza row={produktyTech[0]} />
        <OpisRodzajLegi row={produktyTech[0]} />
        <OpisIloscLeg row={produktyTech[0]} />
        <Nazwa row={produktyTech[0]} />
        <Uwagi row={produktyTech[0]} />
      </div>
    </div>
  );
}

const MenuProduktyBtn = ({ row, showMenu, setShowMenu }) => {

   const techContext = useContext(TechnologyContext);
  const produktyTech = techContext.produktyTech;

  const { createArkuszeFromElemenets, createUlotki } = useArkusze();
 
      return (
    
    <div className={style.menu_produkty}>
      <img

        className={ style.iconMenuBtn}
        src={Logo_ustawienia2}
        title="Auto wszystkie arkusze + legi"
        onClick={() => {

          if (produktyTech[0].typ == 1) {
            createArkuszeFromElemenets();
          }
          if (produktyTech[0].typ == 2) {
          createUlotki()

          }
 
         
        }}
        alt="x"
      />

    </div>
  );
  

};

function Typ({ row }) {
const contextApp = useContext(AppContext);
const contextTech = useContext(TechnologyContext);  
const updateRowProduktyTech = contextTech.updateRowProduktyTech;


  return (
    <div className={style.col_dane}>
      <label className={style.label}> Typ </label>
      <select
        className={style.select}
        defaultValue={row?.typ}
        onChange={(e) => {
          updateRowProduktyTech({
            ...row,
            typ: e.target.value, update:true
          });
        }}
      >
        {}
        {contextApp.productType.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}

function Nazwa({ row }) {

const contextTech = useContext(TechnologyContext);  
const updateRowProduktyTech = contextTech.updateRowProduktyTech;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Nazwa </label>
      <input
        className={style.input}
        value={row?.nazwa}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            updateRowProduktyTech({
              ...row,
              nazwa: e.target.value, update:true
            });
          }
        }}
      ></input>
    </div>
  );
}

function Naklad({ row }) {

  const contextApp = useContext(AppContext);
  const contextTech = useContext(TechnologyContext);  
  const updateRowProduktyTech = contextTech.updateRowProduktyTech;
  const produkty = contextTech.produkty
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Nakład </label>
      <input
        className={produkty[0]?.naklad == row?.naklad ? style.input :style.inputError} title={"W zamówienie: "+produkty[0]?.naklad } type="text"
        value={row?.naklad}
        onChange={(e) => {
          // const re = /^[0-9]+$/;
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            updateRowProduktyTech({
              ...row,
              naklad: ifNoTextSetNull(e.target.value),update:true
            });
          }
        }}
      ></input>
    </div>
  );
}


function OpisPostacPapieru({ row }) {
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Papier </label>
      <input
      disabled
        className={style.input}
      ></input>
    </div>
  );
}


function OpisSzerokoscArkusza({ row }) {
  return (
    <div className={style.col_dane}>
      <label className={style.label}> ark. szer. </label>
      <input
      disabled
        className={style.input}
      ></input>
    </div>
  );
}

function OpisWysokoscArkusza({ row }) {
  return (
    <div className={style.col_dane}>
      <label className={style.label}> ark. wys. </label>
      <input
      disabled
        className={style.input}
      ></input>
    </div>
  );
}

function OpisRodzajLegi({ row }) {
  return (
    <div className={style.col_dane}>
      <label className={style.label}> lega  </label>
      <input
      disabled
        className={style.input}
      ></input>
    </div>
  );
}


function OpisIloscLeg({ row }) {
  return (
    <div className={style.col_dane}>
      <label className={style.label}> ilosc leg</label>
      <input
      disabled
        className={style.input}
      ></input>
    </div>
  );
}


function Strony({ row }) {
  const contextApp = useContext(AppContext);
  const contextTech = useContext(TechnologyContext);  
  const updateRowProduktyTech = contextTech.updateRowProduktyTech;
  const produkty = contextTech.produkty

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Strony </label>
      <input
      // disabled
                className={produkty[0]?.ilosc_stron == row?.ilosc_stron ?style.input :style.inputError} title={"W zamówienie: "+produkty[0]?.ilosc_stron } type="text"
        value={row?.ilosc_stron}
        onChange={(e) => {
          // const re = /^[0-9]+$/;
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            updateRowProduktyTech({
              ...row,
              ilosc_stron: ifNoTextSetNull(e.target.value),
              update: true
            });
          }
        }}

      ></input>
    </div>
  );
}
function Nadkomplet({ row }) {
  const contextApp = useContext(AppContext);
  const contextTech = useContext(TechnologyContext);  
  const updateRowProduktyTech = contextTech.updateRowProduktyTech;

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Nadkomplet </label>
      <input
      disabled
        className={style.input}
        // value={row?.ilosc_stron}
        // onChange={(e) => {
      
        //   if (e.target.value === "" || reg_int.test(e.target.value)) {
        //     updateRowProduktyTech({
        //       ...row,
        //       ilosc_stron: ifNoTextSetNull(e.target.value),
        //       update: true
        //     });
        //   }
        // }}

      ></input>
    </div>
  );
}

function FormatX({ row }) {
  const contextApp = useContext(AppContext);
  const contextTech = useContext(TechnologyContext);  
  const updateRowProduktyTech = contextTech.updateRowProduktyTech;
  const produkty = contextTech.produkty

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Szer. </label>
      <input
      // disabled
    
        className={produkty[0]?.format_x == row?.format_x ?style.input :style.inputError} title={"W zamówienie: "+produkty[0]?.format_x } type="text"
        
        value={row?.format_x}
        onChange={(e) => {
          const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

          if (e.target.value === "" || re.test(e.target.value)) {
            updateRowProduktyTech({
              ...row,
              format_x: ifNoTextSetNull(e.target.value),
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
}
function FormatY({ row }) {
  const contextApp = useContext(AppContext);
  const contextTech = useContext(TechnologyContext);  
  const updateRowProduktyTech = contextTech.updateRowProduktyTech;
  const produkty = contextTech.produkty

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Wys. </label>
      <input
      // disabled
      className={produkty[0]?.format_y == row?.format_y ?style.input :style.inputError} title={"W zamówienie: "+produkty[0]?.format_y } type="text"

        value={row?.format_y}
        onChange={(e) => {
          const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

          if (e.target.value === "" || re.test(e.target.value)) {
            updateRowProduktyTech({
              ...row,
              format_y: ifNoTextSetNull(e.target.value),
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
}

function RodzajOprawy({ row, handleChangeCardOprawa }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const contextApp = useContext(AppContext);
  const contextTech = useContext(TechnologyContext);  

  const produkty = contextTech.produkty

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Oprawa </label>
      <select
        disabled
        // className={style.select_oprawa}
      className={produkty[0]?.oprawa == row?.oprawa ?style.input :style.inputError} title={"W zamówienie: "+produkty[0]?.oprawa } type="text"

        value={row?.oprawa}

      >
         {contextApp.procesList?.filter(x=>x.nazwa_id==6).map((option) => (
          <option key={option.id} value={option.id}>
            {option.typ} {option.rodzaj} 
          </option>
        ))}
      </select>
    </div>
  );
}

function Uwagi({ row }) {
  const contextTech = useContext(TechnologyContext);  
  const updateRowProduktyTech = contextTech.updateRowProduktyTech;
  return (
    <div className={style.col_dane}>
      <label className={style.label}> Uwagi </label>
      <input
        className={style.input}
        value={row?.uwagi}
        onChange={(e) => {
          const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
          if (e.target.value === "" || re.test(e.target.value)) {
            updateRowProduktyTech({
              ...row,
              uwagi: e.target.value,
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
}

//--------------------









