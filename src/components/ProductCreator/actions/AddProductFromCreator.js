

export function AddProductFromCreator(
    preOrder,
    produkty,
    setProdukty,
    elementy,
    setElementy,
    fragmenty,
    setFragmenty,
    oprawa,
    setOprawa,

    naklad,
    binding,
    elements



    
  ) {
    // console.log(preOrder.naklad);
    setProdukty(
      produkty.map((t) => {
        return {
          ...t,
          naklad: preOrder.naklad,
          format_x: preOrder.format_x,
          format_y: preOrder.format_y,
          oprawa: preOrder.oprawa,
          ilosc_stron:
            parseInt(preOrder.strony_srd) + parseInt(preOrder.strony_okl),
        };
      })
    );
  
    setElementy(
      elementy.map((t) => {
        if (t.typ == 1) {
          return {
            ...t,
            naklad: preOrder.naklad,
            ilosc_stron: preOrder.strony_okl,
            format_x: preOrder.format_x,
            format_y: preOrder.format_y,
          };
        }
        if (t.typ == 2) {
          return {
            ...t,
            naklad: preOrder.naklad,
            ilosc_stron: preOrder.strony_srd,
            format_x: preOrder.format_x,
            format_y: preOrder.format_y,
          };
        }
      })
    );
  
    setFragmenty(
      fragmenty.map((t) => {
        return { ...t, naklad: preOrder.naklad };
      })
    );
  
    setOprawa(
      oprawa.map((t) => {
        return {
          ...t,
          naklad: preOrder.naklad,
          oprawa: preOrder.oprawa,
  
          bok_oprawy: preOrder.bok_oprawy,
        };
      })
    );
  }
  