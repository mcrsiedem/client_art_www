import DecodeToken from "pages/Login/DecodeToken";

export function AddBookFromCreator(modalInsertContext,preOrderContext ) {

  const initialProcesy = [
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
    modalInsertContext.setProcesyElementow(
      modalInsertContext.procesyElementow.map((t) => {
        if (t.id == 3) {
          return {
            ...t,
            proces_id: preOrderContext.preOrder.falc_skladka,

          };
        }else return t

      })
    );
  }
  
