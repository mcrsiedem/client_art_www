import DecodeToken from "pages/Login/DecodeToken";


export function AddSheetFromCreator(mic,poc ) {



    //  console.log("mic ", mic.produkty);
    mic.setProdukty(
      mic.produkty.map((t) => {
        return {
          ...t,
          // naklad: poc.preOrder.naklad,
          naklad: mic.produkty[0].naklad,
          format_x: poc.preOrder.szerokosc,
          format_y: poc.preOrder.wysokosc,
          oprawa: 0,
          ilosc_stron: 2,
          typ:2,
          opiekun_zamowienia_id: DecodeToken(sessionStorage.getItem("token")).id,
     
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
            typ: 6,
            nazwa: "",
              ilosc_stron: 2,
            kolory: "",
            format_x: poc.preOrder.szerokosc,
            format_y: poc.preOrder.wysokosc,
            papier_id: 0,
            papier_info: "",
            gramatura_id: 0,
              naklad: mic.produkty[0].naklad,
            uwagi: "",
        
            stan:0,
            status:0,
            etap:1,
            info:"",
            tytul:"",
            indeks: 1,
            papier_postac_id:1
     


      

      }]

    );
  
    mic.setFragmenty([
      {
        id: 1,
        zamowienie_id: 1,
        produkt_id: 1,
        element_id: 1,
        oprawa_id: 1,
        naklad: mic.produkty[0].naklad,
        ilosc_stron: 2,
        wersja: "",
        typ: 6,
        info: "",
        indeks: 0,
       
      }
    ]

            

    );
  
    mic.setOprawa(
      mic.oprawa.map((t) => {
        return {
          ...t,
          naklad: mic.produkty[0].naklad,
          oprawa: 0,
  
          bok_oprawy: "",
    
        };
      })
    );


        mic.setProcesyElementow([])










  }
  