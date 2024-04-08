

export function AddSheetFromCreator(mic,poc ) {




    //  console.log("mic ", mic.produkty);
    mic.setProdukty(
      mic.produkty.map((t) => {
        return {
          ...t,
          naklad: poc.preOrder.naklad,
          format_x: poc.preOrder.szerokosc,
          format_y: poc.preOrder.wysokosc,
          oprawa: 10,
          ilosc_stron: 2,
          typ:2
        };
      })
    );
  
    // mic.setElementy(
    //   mic.elementy.map((t) => {
 
    //       return {
    //         ...t,
    //         naklad: poc.preOrder.naklad,
    //         ilosc_stron: 2,
    //         format_x: poc.preOrder.szerokosc,
    //         format_y: poc.preOrder.wysokosc,
    //       };
      

    //   })
    // );
    mic.setElementy([     {
       
            id: 1,
            zamowienie_id: 1,
            produkt_id: 1,
            typ: 5,
            nazwa: "",
              ilosc_stron: 2,
            kolory: "",
            format_x: poc.preOrder.szerokosc,
            format_y: poc.preOrder.wysokosc,
            papier_id: 7,
            papier_info: "",
            gramatura_id: 0,
              naklad: poc.preOrder.naklad,
            uwagi: "",
        
            indeks: 1,



      

      }]

    );
  
    mic.setFragmenty([
      {
        id: 1,
        zamowienie_id: 1,
        produkt_id: 1,
        element_id: 1,
        oprawa_id: 1,
        naklad: poc.preOrder.naklad,
        ilosc_stron: 2,
        wersja: " ",
        typ: 5,
        info: " ",
        indeks: 0,

      }
    ]

            

    );
  
    mic.setOprawa(
      mic.oprawa.map((t) => {
        return {
          ...t,
          naklad: poc.preOrder.naklad,
          oprawa: 10,
  
          bok_oprawy: poc.preOrder.wysokosc,
        };
      })
    );
  }
  