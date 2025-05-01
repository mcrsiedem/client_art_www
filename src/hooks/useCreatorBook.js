import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { PreOrderContext } from "context/PreOrderContext";
import { AppContext } from "context/AppContext";

export function useCreatorBook(status_id){
const modalInsertContext = useContext(ModalInsertContext);
const preOrderContext = useContext(PreOrderContext);
const appContext = useContext(AppContext);
const procesList = appContext.procesList;

function createBook() {

    modalInsertContext.setProdukty(
      modalInsertContext.produkty.map((t) => {
        return {
          ...t,
          naklad: preOrderContext.preOrder.naklad,
          format_x: preOrderContext.preOrder.szerokosc,
          format_y: preOrderContext.preOrder.wysokosc,
          oprawa: preOrderContext.preOrder.oprawa,
          opiekun_zamowienia_id: DecodeToken(sessionStorage.getItem("token")).id,
          ilosc_stron:
            parseInt(preOrderContext.preOrder.strony_srd) + parseInt(preOrderContext.preOrder.strony_okl),
        };
      })
    );
  
    modalInsertContext.setElementy(
      modalInsertContext.elementy.map((t) => {
        if (t.typ == 1) {
          return {
            ...t,
            naklad: preOrderContext.preOrder.naklad,
            ilosc_stron: preOrderContext.preOrder.strony_okl,
            format_x: preOrderContext.preOrder.szerokosc,
            format_y: preOrderContext.preOrder.wysokosc,
          };
        }
        if (t.typ == 2) {
          return {
            ...t,
            naklad: preOrderContext.preOrder.naklad,
            ilosc_stron: preOrderContext.preOrder.strony_srd,
            format_x: preOrderContext.preOrder.szerokosc,
            format_y: preOrderContext.preOrder.wysokosc,
          };
        }
      })
    );
  
    modalInsertContext.setFragmenty(
      modalInsertContext.fragmenty.map((t) => {
        if (t.typ == 1) {
          return {
            ...t,
            naklad: preOrderContext.preOrder.naklad,
            ilosc_stron: preOrderContext.preOrder.strony_okl,
            format_x: preOrderContext.preOrder.szerokosc,
            format_y: preOrderContext.preOrder.wysokosc,
          };
        }
        if (t.typ == 2) {
          return {
            ...t,
            naklad: preOrderContext.preOrder.naklad,
            ilosc_stron: preOrderContext.preOrder.strony_srd,
            format_x: preOrderContext.preOrder.szerokosc,
            format_y: preOrderContext.preOrder.wysokosc,
          };
        }
      })
    );
  
    modalInsertContext.setOprawa(
      modalInsertContext.oprawa.map((t) => {
        return {
          ...t,
          naklad: preOrderContext.preOrder.naklad,
          oprawa: preOrderContext.preOrder.oprawa,
  
          bok_oprawy: preOrderContext.preOrder.wysokosc,
        };
      })
    );


    // dodaje do środków falcowanie takie jak zostało wybrane w kreatorze
    // modalInsertContext.setProcesyElementow(
    //   modalInsertContext.procesyElementow.map((t) => {
    //     if (t.id == 3) {
    //       return {
    //         ...t,
    //         proces_id: preOrderContext.preOrder.falc_skladka,

    //       };
    //     }else return t

    //   })
    // );

    modalInsertContext.setProcesyElementow(
      modalInsertContext.procesyElementow.map((t) => {
        if (t.id != 3) {
          let proc = procesList.filter(x=> x.id == t.proces_id).map(x=> {return x})
          return {
            ...t,
            ...proc[0],
            id: t.id
          };
        } 

        // w falcowanie nadpisujemy domyślne 16stki w initialvalue tym co wybrane jest w preorderze
        if (t.id == 3) {
          let proc = procesList.filter(x=> x.id == preOrderContext.preOrder.falc_skladka).map(x=>{return x})
          return {
            ...t,
            ...proc[0],
            proces_id: preOrderContext.preOrder.falc_skladka,
            id: t.id

          };
        } 
        
        // return t

      })
    );



const initialProcesyBook = [
  {
    id: 1,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 1,
    proces_id: 1,
    nazwa_id: 1,
    front_ilosc: "4",
    back_ilosc: "4",
    front_kolor: "CMYK",
    back_kolor: "CMYK",
    ilosc_uzytkow: 1,
    info: "",
    indeks: 0,
  },
  {
    id: 2,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 2,
    proces_id: 1,
    nazwa_id: 1,
    front_ilosc: "4",
    back_ilosc: "4",
    front_kolor: "CMYK",
    back_kolor: "CMYK",
    ilosc_uzytkow: 1,
    info: "",
    indeks: 1,
  },
  {
    id: 3,
    zamowienie_id: 1,
    produkt_id: 1,
    element_id: 2,
    proces_id: 29,
    nazwa_id: 3,
    front_ilosc: "",
    back_ilosc: "",
    front_kolor: "",
    back_kolor: "",
    ilosc_uzytkow: 1,
    info: "",
    indeks: 2,
  },
];
  }
  return [createBook];



}

// const [add] = useHistoria()

