

export function AddBookFromCreator(mic,poc ) {




    //  console.log("mic ", mic.produkty);
    mic.setProdukty(
      mic.produkty.map((t) => {
        return {
          ...t,
          naklad: poc.preOrder.naklad,
          format_x: poc.preOrder.format_x,
          format_y: poc.preOrder.format_y,
          oprawa: poc.preOrder.oprawa,
          ilosc_stron:
            parseInt(poc.preOrder.strony_srd) + parseInt(poc.preOrder.strony_okl),
        };
      })
    );
  
    mic.setElementy(
      mic.elementy.map((t) => {
        if (t.typ == 1) {
          return {
            ...t,
            naklad: poc.preOrder.naklad,
            ilosc_stron: poc.preOrder.strony_okl,
            format_x: poc.preOrder.format_x,
            format_y: poc.preOrder.format_y,
          };
        }
        if (t.typ == 2) {
          return {
            ...t,
            naklad: poc.preOrder.naklad,
            ilosc_stron: poc.preOrder.strony_srd,
            format_x: poc.preOrder.format_x,
            format_y: poc.preOrder.format_y,
          };
        }
      })
    );
  
    mic.setFragmenty(
      mic.fragmenty.map((t) => {
        return { ...t, naklad: poc.preOrder.naklad };
      })
    );
  
    mic.setOprawa(
      mic.oprawa.map((t) => {
        return {
          ...t,
          naklad: poc.preOrder.naklad,
          oprawa: poc.preOrder.oprawa,
  
          bok_oprawy: poc.preOrder.format_y,
        };
      })
    );
  }
  