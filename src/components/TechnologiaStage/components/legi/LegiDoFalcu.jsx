import style from "./LegiDoFalcu.module.css";
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
import RowArkusze from "../elementy/RowArkusze";
import Arkusz from "./Lega";
import Lega from "./Lega";

export default function LegiDoFalcu() {
  const contextTech = useContext(TechnologyContext);
  const elementyTech = contextTech.elementyTech;
  const legi = contextTech.legi;
  const setElementyTech = contextTech.setElementyTech;

    if(legi.filter(x=> x.delete != true).length>0){
  return (
    <div className={style.container}>
      
      <div className={style.produkt}>
                                  {/* <hr></hr> */}

      <div className={style.produkt_menu_button}>
    {/* <p>Produkt</p> */}
    <p style={{color:"grey" , fontSize:"1.5rem", paddingTop:"10px", paddingLeft:"20px"}}> Legi</p>
{/* <Generuj/> */}
  </div>
   
        <LegiTable />
      </div>
    </div>
  );
}
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


function LegiTable() {
  const contextTech = useContext(TechnologyContext);
  const legi = contextTech.legi;



      return (
        <div className={style.container_for_arkusze}>
          
          {legi?.filter((x) => x.typ_elementu !=1 && x.delete != true)
.sort((a, b) => a.nr_legi - b.nr_legi)
            .map((row, i) => {
              return <Lega key={row.id} i={i} row={row} />;
            })}

                      {legi?.filter((x) =>  x.typ_elementu ==1 && x.delete != true)
.sort((a, b) => a.nr_legi - b.nr_legi)
            .map((row, i) => {
              return <Lega key={row.id} i={i} row={row} />;
            })}
             {/* <hr></hr> */}
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



//--------------------









